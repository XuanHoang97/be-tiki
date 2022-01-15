import db from "../models/index";
const { cloudinary } = require('../ultils/cloudinary');

//order not login
//add to cart
let addToCart = (data, productId) => {
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
                        }, {
                            where: {
                                productId: productId,
                            }
                        });
                        resolve(result);
                    }else{
                        let result = await db.Cart.create({
                            productId: productId,
                            qty: 1,
                            productName: product.name,
                            productImage: product.image,
                            productPrice: product.price,

                        });
                        
                        resolve(result);
                    }
                    console.log('data product : ', product);
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
            let result = await db.Cart.destroy({
                where: {
                    productId: productId,
                }
            });
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
};



module.exports = {
    getCart,
    addToCart,
    deleteItemCart,
}