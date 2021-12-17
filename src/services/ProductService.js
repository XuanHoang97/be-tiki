import db from "../models/index";
import { Op } from "sequelize";
import { raw } from "body-parser";

// getAllProducts
let getAllProducts = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = '';
            if (id === 'ALL') {
                products = await db.Product.findAll({
                })
            } 
            if(id && id !== 'ALL') {
                products = await db.Product.findOne({
                    where: { id: id }
                });
            }
            resolve(products);
        } catch (error) {
            reject(error);
        }
    });
};

//createProduct
let createNewProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newProduct = await db.Product.create({
                name: data.name,
                price: data.price,
                sale: data.sale,
                warranty: data.warranty,
                number: data.number,
                category_id: data.category_id,
                supplier_id: data.supplier_id,
                image: data.image,
                status: data.status,

            });
            resolve(newProduct);
        } catch (e) {
            reject(e);
        }
    })
}

//edit product
let editProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // if(!data.id) {
            //     resolve ({
            //         errCode: 1,
            //         errMessage: 'Missing required parameter'
            //     })
            // }

            // let product = await db.Product.findOne({
            //     where: { id: data.id },
            //     raw: false
            // });

            // if(!product) {
            //     product.name = data.name;
            //     product.price = data.price;
            //     product.sale = data.sale;
            //     product.warranty = data.warranty;
            //     product.number = data.number;
            //     product.category_id = data.category_id;
            //     product.supplier_id = data.supplier_id;
            //     product.status = data.status;
            //     if(data.image) {
            //         product.image = data.image;
            //     }
            //     await product.save();
            //     resolve({
            //         errCode: 0,
            //         message: 'The product is updated'
            //     })
            // }else {
            //     resolve({
            //         errCode: 1,
            //         errMessage: `Product's not found`
            //     })
            // }  
            
            let product = await db.Product.findOne({
                where: { id: data.id },
                raw: false
            });

            if(!product) {
                resolve ({
                    errCode: 1,
                    errMessage: 'Product not found'
                })
            }else {
                product.name = data.name;
                product.price = data.price;
                product.sale = data.sale;
                product.warranty = data.warranty;
                product.number = data.number;
                product.category_id = data.category_id;
                product.supplier_id = data.supplier_id;
                product.status = data.status;
                if(data.image) {
                    product.image = data.image;
                }
                await product.save();
                resolve({
                    errCode: 0,
                    message: 'The product is updated'
                })
            }
        } catch (e) {   
            reject(e);
        }
    });
};

//delete product
let deleteProduct = (productid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let foundProduct = await db.Product.findOne({
                where: { id: productid }
            })
    
            if (!foundProduct) {
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't exist`
                })
            }
    
            await db.Product.destroy({
                where: { id: productid }
            });
    
            resolve({
                errCode: 0,
                message: `The product is deleted`,
            })
        } catch (e) {
            reject(e);
        }
    })
}




//get all category
let getAllCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let categories = '';
            if(id === 'ALL') {
                categories = await db.Category.findAll({
                });
            }
            if(id && id !== 'ALL') {
                categories = await db.Category.findOne({
                    where: { id: id }
                });
            }
            resolve(categories);
        } catch (e) {
            reject(e);
        }
    });
};

//create category
let createNewCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newCategory = await db.Category.create({
                icon: data.icon,
                name: data.name,
                active: data.active,
                total_product: data.total_product,
                author_id: data.author_id,
            });
            resolve(newCategory);
        } catch (e) {
            reject(e);
        }
    });
};

//get all product by category
let getAllProductByCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = '';
            if(id === 'ALL') {
                products = await db.Product.findAll({
                });
            }
            if(id && id !== 'ALL') {
                products = await db.Product.findAll({
                    where: { category_id: id }
                });
            }
            resolve(products);
        } catch (e) {
            reject(e);
        }
    });
};



module.exports = {
    getAllProducts,
    createNewProduct,
    getAllCategory,
    createNewCategory,
    getAllProductByCategory,
    editProduct,
    deleteProduct
}