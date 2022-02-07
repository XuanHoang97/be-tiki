import db from "../models/index";
const { cloudinary } = require('../ultils/cloudinary');
import _ from 'lodash';
import emailService from '../services/emailService';
import {v4 as uuidv4} from 'uuid';
// import { status } from "express/lib/response";

//verify email
let buildUrlEmail = (productId, token) => {
    let result = `http://localhost:3000/verify-order?token=${token}&productId=${productId}`;
    return result;
}


//order: if login user
//add to cart
// let addToCart = (data, productId, qty, userId) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             if(productId){
//                 let product = await db.Product.findOne({
//                     where: {
//                         id: productId
//                     }
//                 });            

//                 if(product){
//                     let cart = await db.Cart.findOne({
//                         where: {
//                             productId: productId,
//                         }
//                     });
                 
//                     //if cart exist
//                     if(cart){
//                         let result = await db.Cart.update({
//                             number: cart.number + 1,
//                             qty: cart.qty + qty,
//                         }, {
//                             where: {
//                                 productId: productId,
//                             }
//                         });
//                         resolve(result);
//                     }else{
//                         let result = await db.Cart.create({
//                             userId: userId,
//                             productId: productId,
//                             Name: product.name,
//                             Image: product.image,
//                             Price: product.price,
//                             saleOff: product.sale,
//                             qty: qty,   
//                         });
                        
//                         resolve(result);
//                     }
//                 }else{
//                     reject('Product not found');
//                 }
//             }

//         }catch (error) {
//             reject(error);
//         }
//     });
// };

//get all cart
// let getCart = (id) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let carts = '';
//             if (id === 'ALL') {
//                 carts = await db.Cart.findAll()
//             } 
//             if(id && id !== 'ALL') {
//                 carts = await db.Cart.findOne({
//                     where: { id: id }
//                 });
//             }
//             resolve(carts);
//         } catch (error) {
//             reject(error);
//         }
//     });
// };

//delete item cart
// let deleteItemCart = (productId) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let foundItemProduct = await db.Cart.findOne({
//                 where: { id: productId }
//             })

//             if (!foundItemProduct) {
//                 resolve({
//                     errCode: 2,
//                     errMessage: `The cart isn't exist`
//                 })
//             }else{
//                 await db.Cart.destroy({
//                     where: { id: productId }
//                 });
//                 resolve({
//                     errCode: 0,
//                     errMessage: `The item cart is deleted`,
//                 })
//             }
//         } catch (e) {
//             reject(e);
//         }
//     });
// };


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
                let order = [...data.arrOrder];
                // save array data to database 
                if(order && order.length > 0){
                    let token = uuidv4();
                    order = order.map((item) => {                
                        item.code = 'OD' + Math.floor(Math.random() * 10000);
                        item.status = 'S1';
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

                    console.log('data order:' , order);

                    // send mail-verify order
                    await emailService.sendSimpleEmail({
                        receiveEmail: data.email,
                        customerName: data.username,

                        orderCode: order[0].code,
                        productName: order[0].name,
                        qty: order[0].qty,
                        date: order[0].date,

                        total: data.total,
                        address: data.address,
                        phone: data.phone,
                        note: data.note,
                        delivery: data.delivery,
                        payment: data.payment,
                        redirectLink: buildUrlEmail(order[0].productId, token)
                    });
                }


                // get all existing data
                let existing = await db.Order.findAll({
                    // where: { userId: data.userId},
                    attributes: {
                        exclude: ['id', 'userId']
                    },
                    raw: true
                })

                //compare arr transmission data
                let toCreate = _.differenceWith(order, existing, (a, b) => {
                    // return a.code === b.code && +a.userId === +b.userId;
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
                    where: { id: id }
                });
            }
            resolve(orders);
        } catch (error) {
            reject(error);
        }
    });
};

//verify order
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
let filterOrder = (status) => {
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
                    raw: false  //return obj sequelize-use function save()
                });

                if(order){
                    order.status = data.status;
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





module.exports = {
    // getCart,
    // addToCart,
    // deleteItemCart,

    createOrder,
    getOrder,
    verifyOrder,
    filterOrder,
    updateOrder,
}
