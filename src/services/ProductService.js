import db from "../models/index";
import { Op } from "sequelize";

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
                description: data.description,
                category_id: data.category_id,
                supplier_id: data.supplier_id,
                slug: data.slug,
                avatar: data.avatar,
                status: data.status,

            });
            resolve(newProduct);
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


module.exports = {
    getAllProducts,
    createNewProduct,
    getAllCategory,
    createNewCategory
}