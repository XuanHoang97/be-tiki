import db from "../models/index";
const { cloudinary } = require('../ultils/cloudinary');

//order not login
//add to cart
let addToCart = (data, productId, qty) => {
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






module.exports = {
    getCart,
    addToCart,
    deleteItemCart,
}
