import db from "../models/index";
const { cloudinary } = require('../ultils/cloudinary');
import _ from 'lodash';

//order not login
//add to cart
let addToCart = (data, productId, qty, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(productId){
                let product = await db.Product.findOne({
                    where: {
                        id: productId
                    }
                });            

                if(product){
                    let cart = await db.Cart.findOne({
                        where: {
                            productId: productId,
                        }
                    });
                 
                    //if cart exist
                    if(cart){
                        let result = await db.Cart.update({
                            number: cart.number + 1,
                            qty: cart.qty + qty,
                        }, {
                            where: {
                                productId: productId,
                            }
                        });
                        resolve(result);
                    }else{
                        let result = await db.Cart.create({
                            userId: userId,
                            productId: productId,
                            Name: product.name,
                            Image: product.image,
                            Price: product.price,
                            saleOff: product.sale,
                            qty: qty,   
                        });
                        
                        resolve(result);
                    }
                }else{
                    reject('Product not found');
                }
            }

        }catch (error) {
            reject(error);
        }
    });
};

//get all cart not login
let getCart = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let carts = '';
            if (id === 'ALL') {
                carts = await db.Cart.findAll()
            } 
            if(id && id !== 'ALL') {
                carts = await db.Cart.findOne({
                    where: { id: id }
                });
            }
            resolve(carts);
        } catch (error) {
            reject(error);
        }
    });
};

//delete item cart
let deleteItemCart = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let foundItemProduct = await db.Cart.findOne({
                where: { id: productId }
            })

            if (!foundItemProduct) {
                resolve({
                    errCode: 2,
                    errMessage: `The cart isn't exist`
                })
            }else{
                await db.Cart.destroy({
                    where: { id: productId }
                });
                resolve({
                    errCode: 0,
                    errMessage: `The item cart is deleted`,
                })
            }
        } catch (e) {
            reject(e);
        }
    });
};


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
                // save array data to database 
                if(order && order.length > 0){
                    order = order.map(item => {
                        item.orderCode = 'OD' + Math.floor(Math.random() * 1000);
                        item.status = 'Chờ xác nhận';
                        item.total = data.total;
                        item.date = new Date();
                        item.address = data.address;
                        item.username = data.username;
                        item.phone = data.phone;
                        item.email = data.email;
                        item.note = data.note;
                        item.delivery = data.delivery;
                        item.payment = data.payment;
                        return item;
                    });
                }

                // get all existing data
                let existing = await db.Order.findAll({
                    where: { userId: data.userId},
                    attributes: ['orderCode', 'userId', 'productId', 'Name', 'Price', 'qty', 'total', 'date', 'status', 'username', 'email', 'phone', 'address', 'note', 'delivery', 'payment', 'token'],
                    raw: true
                })

                //compare arr transmission data
                let toCreate = _.differenceWith(order, existing, (a, b) => {
                    return a.productId === b.productId && +a.userId === +b.userId;
                });


                //create data
                if (toCreate && toCreate.length > 0) {
                    await db.Order.bulkCreate(toCreate)

                    //destroy cart
                    await db.Cart.destroy({
                        where: { userId: data.userId }
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




module.exports = {
    getCart,
    addToCart,
    deleteItemCart,

    createOrder,
    getOrder,
}
