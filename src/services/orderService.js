import db from "../models/index";
import _, { includes } from 'lodash';
import emailService from '../services/emailService';
import {v4 as uuidv4} from 'uuid';
import { raw } from "body-parser";
const {format, zonedTimeToUtc} = require('date-fns-tz');
import { Op } from "sequelize";


//today's date
const today =new Date();

//verify email
let buildUrlEmail = (productId, token) => {
    let result = `http://localhost:3000/verify-order?token=${token}&productId=${productId}`;
    return result;
}

//order: if have authentication
//add to cart
let addToCart = (data, productId, qty, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!productId || !qty || !userId){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }else{
                let user = await db.User.findOne({
                    where: {
                        id: userId
                    },
                });

                if(user){
                    let product = await db.Product.findOne({
                        where: {
                            id: productId
                        },
                    });

                    if(product){
                        let cart = await db.Cart.findOne({
                            where: {
                                userId: userId,
                                productId: productId,
                            },
                        });

                        // if cart is exist
                        if(cart){
                            let result = await db.Cart.update({
                                qty: cart.qty + parseInt(qty),
                            },{
                                where: {
                                    userId: userId,
                                    productId: productId
                                }
                            });
                            resolve(result);
                        }else{
                            let result = await db.Cart.create({
                                userId: userId,
                                productId: productId,
                                qty: qty,
                                name: product.name,
                                image: product.image,
                                sale: product.sale,
                            });
                            resolve(result);
                        }
                    }else{
                        resolve({
                            errCode: 1,
                            errMessage: 'Product not exist'
                        })
                    }
                }else{
                    resolve({
                        errCode: 1,
                        errMessage: 'User not exist'
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};

//get cart by userId
let getCart = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!userId){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }else{
                let carts = await db.Cart.findAll({
                    where: {
                        userId: userId
                    }
                });
                resolve(carts);
            }
        } catch (error) {
            reject(error);
        }
    });
};

//delete item cart by userId
let deleteItemCart = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!productId){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }else{
                let result = await db.Cart.destroy({
                    where: {
                        id: productId,
                    }
                });
                resolve(result);
            }
        } catch (error) {
            reject(error);
        }
    });
};

// update array in cart
let updateItemCart = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let carts = data.arrCart;
            if(carts && carts.length > 0){
                carts.map((item, index) => {
                    return item;
                });
            }
            await db.Cart.bulkCreate(carts, {
                updateOnDuplicate: ['qty']
            });
            resolve({
                errCode: 0,
                errMessage: 'update cart success',
                carts
            });
        } catch (error) {
            reject(error);
        }   
    });
};

// checkout order
let checkout = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.arrOrder){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }else{ 
                let order = data.arrOrder;
                if(order && order.length > 0){
                    let token = uuidv4();
                    order = order.map((item) => {                
                        item.code = 'OD' + Math.floor(Math.random() * 10000);
                        item.status = 'S1';
                        item.action = 'Chưa đánh giá';
                        item.date = data.date;
                        item.dateDelivery = data.dateDelivery;
                        item.timeTrack = data.timeTrack;
                        item.username = data.username;
                        item.address = data.address;
                        item.phone = data.phone;
                        item.email = data.email;
                        item.delivery = data.delivery;
                        item.payment = data.payment;
                        item.token = token;
                        return item;
                    });
                }

                // get all existing data
                let existing = await db.Order.findAll({
                    where: { 
                        userId: order[0].userId
                    },
                    raw: true
                })

                //compare arr transmission data
                let toCreate = _.differenceWith(order, existing, (a, b) => {
                    return a.code === b.code
                });


                //create data
                if (toCreate && toCreate.length > 0) {
                    await db.Order.bulkCreate(toCreate)

                    // delete cart
                    await db.Cart.destroy({
                        where: {
                            userId: order[0].userId
                        }
                    });

                    // add notify
                    let notification = await db.Notify.create({
                        userId: order[0].userId,
                        title: 'Đơn hàng mới',
                        content: 'Bạn có đơn hàng mới',
                        status: 'N1',
                        type: 'ORDER',
                        link: process.env.MY_ORDER,
                        date: data.date,
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUvgTq9HrMypyxQNO5Kr1JGQZ-7aLzo9yUfA&usqp=CAU',
                    });
                }
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                })
            }
        } catch (error) {
            reject(error);
        }
    });
};

// my order
let filterMyOrder = (status, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!status && !userId){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }else{
                let orders = '';
                if (status === 'S0' && userId) {
                    orders = await db.Order.findAll({
                        where: {
                            userId: userId,
                        },

                        nest: true,
                        include :{
                            model: db.Rating,
                            as: 'ratingOrder',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                        }
                    })
                }
                else{
                    orders = await db.Order.findAll({
                        where: {
                            status: status,
                            userId: userId,
                        },
                        attributes: {
                            exclude: ['userId', 'token']
                        },
                        nest: true,
                        include :{
                            model: db.Rating,
                            as: 'ratingOrder',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                        }

                    });
                }
                resolve(orders);
            }
        } catch (error) {
            reject(error);
        }
    });
};

// Option: Order without login
//create order
let createOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.arrOrder){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }else{ 
                let order = data.arrOrder;
                if(order && order.length > 0){
                    let token = uuidv4();
                    order = order.map((item) => {                
                        item.code = 'OD' + Math.floor(Math.random() * 10000);
                        item.userId = 0;
                        item.status = 'S1';
                        item.action = 'Chưa đánh giá';
                        item.total = data.total;
                        item.date = new Date();
                        item.address = data.address;
                        item.username = data.username;
                        item.phone = data.phone;
                        item.email = data.email;
                        item.note = data.note;
                        item.delivery = data.delivery;
                        item.payment = data.payment;
                        item.token = token;
                        return item;
                    });

                    // send mail-verify order
                    // await emailService.sendSimpleEmail({
                    //     receiveEmail: data.email,
                    //     customerName: data.username,

                    //     orderCode: order[0].code,
                    //     productName: order[0].name,
                    //     qty: order[0].qty,
                    //     date: order[0].date,

                    //     total: data.total,
                    //     address: data.address,
                    //     phone: data.phone,
                    //     note: data.note,
                    //     delivery: data.delivery,
                    //     payment: data.payment,
                    //     redirectLink: buildUrlEmail(order[0].productId, token)
                    // });
                }


                // get all existing data
                let existing = await db.Order.findAll({
                    attributes: {
                        exclude: ['id', 'userId']
                    },
                    raw: true
                })

                //compare arr transmission data
                let toCreate = _.differenceWith(order, existing, (a, b) => {
                    return a.code === b.code
                });

                //create data
                if (toCreate && toCreate.length > 0) {
                    await db.Order.bulkCreate(toCreate)
                }
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                })
            }

        } catch (error) {
            reject(error);
        }
    });
};

//get all order
let getOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orders = '';
            if (id === 'ALL') {
                orders = await db.Order.findAll()
            } 
            if(id && id !== 'ALL') {
                orders = await db.Order.findOne({
                    where: { id: id },
                });

            }
            resolve(orders);
        } catch (error) {
            reject(error);
        }
    });
};

//verify order from email
let verifyOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.token || !data.productId){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }else{
                let order = await db.Order.findOne({
                    where: {
                        token: data.token,
                        // productId: data.productId,
                        status: 'S1'
                    },
                    raw: false  //return obj sequelize-use function save()
                });

                if(order){
                    order.status = 'S2';
                    await order.save();

                    resolve({
                        errCode: 0,
                        errMessage: 'update order success',
                    })
                }else{
                    resolve({
                        errCode: 2,
                        errMessage: 'order has been active or does not exist',
                    })
                }
            }
        }
        catch (error) {
            reject(error);
        }
    });
};

// Filter order by status
let filterOrder = (status, dateOrder) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orders = '';
            if (status === 'S0') {
                orders = await db.Order.findAll({
                })
            } 
            if(status && status !== 'S0') {
                orders = await db.Order.findAll({
                    where: { status: status }
                });
            }

            // filter order by dateOrder: today, this week, this month
            if(dateOrder && dateOrder !== 'ALL'){
                let date = new Date();
                const timeZone = 'Asia/Ho_Chi_Minh';
                const timeInZone = zonedTimeToUtc(date, timeZone);

                // get range time today from 00:00:00 to 23:59:59
                let today = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
                let todayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

                // convert today to timestamp 
                let todayTimestamp = today.getTime();
                let todayEndTimestamp = todayEnd.getTime();


                console.log('today: ', today, todayTimestamp, todayEnd, todayEndTimestamp);
                console.log('today2: ', timeZone, timeInZone);

               
            }




            resolve(orders);
        } catch (error) {
            reject(error);
        }
    });
};

// update order
let updateOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.id){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }else{
                let order = await db.Order.findOne({
                    where: { id: data.id },
                    raw: false  
                });

                if(order){
                    order.status = data.status;
                    order.action = 'Chưa đánh giá';
                    order.timeTrack = data.timeTrack;
                    await order.save(
                        {
                            fields: ['status', 'timeTrack']
                        }
                    );

                    // add notification
                    let orderStatus = '';
                    if(data.status === 'S2'){
                        orderStatus = 'đã được xác nhận';
                    }
                    if(data.status === 'S3'){
                        orderStatus = 'đang được vận chuyển';
                    }
                    if(data.status === 'S4'){
                        orderStatus = 'đã được giao tới bạn, vui lòng kiểm tra';
                    }
                    let notification = await db.Notify.create({
                        userId: order.userId,
                        title: 'Đơn hàng #' + order.code,
                        content: 'Đơn hàng #' + '\xa0' + order.code + '\xa0' + orderStatus,
                        status: 'N1',
                        image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUvgTq9HrMypyxQNO5Kr1JGQZ-7aLzo9yUfA&usqp=CAU',
                        type: 'ORDER',
                        date: data.timeTrack,
                        link: process.env.MY_ORDER
                    });
                    
                    console.log('notification: ', notification, orderStatus)
                    resolve({
                        errCode: 0,
                        errMessage: 'update order success',
                    })
                }else{
                    resolve({
                        errCode: 2,
                        errMessage: 'order has been active or does not exist',
                    })
                }
            }
        }
        catch (error) {
            reject(error);
        }
    });
};


// get order today
let getOrderTodays = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const date = new Date();
            const currentDate = date.toLocaleString();
            // get range time today
            const today = new Date(date.getFullYear(), date.getMonth(), date.getDate() +1, -7, 0, 0);
            const todayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate() +1, 16, 59, 59);

            // convert today to timestamp
            const todayTimestamp = today.getTime();
            const todayEndTimestamp = todayEnd.getTime();

            console.log('order today: ', date );
            console.log('order today 2: ', currentDate, today, todayEnd );

            let orders = await db.Order.findAll({
                where: {
                    date: {
                        [Op.between]: [todayTimestamp, todayEndTimestamp]
                    }
                }
            });

            resolve(orders);
        } catch (error) {
            reject(error);
        }
    });
};

// revenue today
let revenueToday = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let date = new Date();

            // get range time today
            let today = new Date(date.getFullYear(), date.getMonth(), date.getDate() +1, -7, 0, 0);
            let todayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate() +1, 16, 59, 59);

            // convert today to timestamp
            let todayTimestamp = today.getTime();
            let todayEndTimestamp = todayEnd.getTime();

            console.log('revenue today: ', today, todayEnd);

            let orders = await db.Order.findAll({
                where: {
                    timeTrack: {
                        [Op.between]: [todayTimestamp, todayEndTimestamp]
                    },

                    status: {
                        [Op.in]: ['S4']
                    }
                }
            });

            let total = 0;
            orders.forEach(order => {
                total += order.sale * order.qty
            });

            resolve(total);
        } catch (error) {
            reject(error);
        }
    });
};

// new customer month
let customerMonth = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let date = new Date();

            // get range time month from 1st day of month to last day of month
            let month = new Date(date.getFullYear(), date.getMonth()-5, 0, -7, 0, 0);
            let monthEnd = new Date(date.getFullYear(), date.getMonth() +1, 0, 16, 59, 59);

            // convert month to timestamp
            let monthTimestamp = month.getTime();
            let monthEndTimestamp = monthEnd.getTime();

            console.log('month: ', month, monthEnd);

            let users = await db.User.findAll({
                where: {
                    joinDate: {
                        [Op.between]: [monthTimestamp, monthEndTimestamp]
                    }
                }
            });

            resolve(users.length);
        } catch (error) {
            reject(error);
        }
    });
};



module.exports = {
    // order with login 
    addToCart,
    getCart,
    deleteItemCart,
    updateItemCart,
    checkout,
    filterMyOrder,

    // order without login
    createOrder,
    getOrder,
    verifyOrder,
    filterOrder,
    updateOrder,
    getOrderTodays,
    revenueToday,
    customerMonth,
}
