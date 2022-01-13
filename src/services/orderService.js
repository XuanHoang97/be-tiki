import db from "../models/index";
const { cloudinary } = require('../ultils/cloudinary');

//get all cart
let getAllCart = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cart = '';
            if (id === 'ALL') {
                cart = await db.Cart.findAll({
                    // include: [
                    //     {
                    //         model: db.Product,
                    //         as: 'cartData',
                    //         attributes: ['name', 'image', 'price', 'sale', 'number', 'warranty'],
                    //     }
                    // ],
                    // raw: false,        
                    // nest: true
                });
            } 
            if(id && id !== 'ALL') {
                cart = await db.Cart.findOne({
                    where: { id: id }
                });
            }
            resolve(cart);
        } catch (error) {
            reject(error);
        }
    });
};

//add to cart
let addToCart = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listCart = await db.Cart.create({                
                qty: data.qty,
                productId: data.productId,
                userId: data.userId,
            });
            resolve(listCart);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getAllCart,
    addToCart
}