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
                    errMessage: `The product isn't exist`
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

//save detail info of product
let saveDetailInfoProduct = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let detailProduct = await db.Markdown.create({
                contentHTML: data.contentHTML,
                contentMarkdown: data.contentMarkdown,
                description: data.description,
                character: data.character,
                productId: data.productId,
                // categoryId: data.categoryId,
            });
            resolve({
                errCode: 0,
                errMessage: 'The detail product is updated',
                detailProduct
            });
        } catch (e) {
            reject(e);
        }
    })
};



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
                image: data.image,
                name: data.name,
                keyMap: data.keyMap,
                type: data.type,
                value: data.value,
                statusId: data.status,
                categoryId: data.categoryId,
            });
            resolve(newCategory);
        } catch (e) {
            reject(e);
        }
    });
};

//edit category
let editCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let category = await db.Category.findOne({
                where: { id: data.id },
                raw: false
            });
            if(!category) {
                resolve ({
                    errCode: 1,
                    errMessage: 'Product not found'
                })
            }else{
                category.image = data.image;
                category.name = data.name;
                category.keyMap = data.keyMap;
                category.type = data.type;
                category.value = data.value;
                category.statusId = data.statusId;
                category.categoryId = data.categoryId;
                await category.save();
                resolve({
                    errCode: 0,
                    message: 'The category is updated'
                })
            }
        } catch (e) {
            reject(e);
        }
    });
};

//delete category
let deleteCategory = (categoryid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let foundCategory = await db.Category.findOne({
                where: { id: categoryid }
            })

            if (!foundCategory) {
                resolve({
                    errCode: 2,
                    errMessage: `The category isn't exist`
                })
            }else{
                await db.Category.destroy({
                    where: { id: categoryid }
                });
                resolve({
                    errCode: 0,
                    message: `The category is deleted`,
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}


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

//get some product by category
let getSomeProduct = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let someProduct = await db.Product.findAll({
                where: { category_id: 'C2' },
                attributes: {
                    exclude: ['image']
                },
            })

            resolve({
                errCode: 0,
                data: someProduct
            })
        } catch (e) {
            reject(e);
        }
    })
}

//get all article product
let getArticleProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let article = '';
            if(id === 'ALL') {
                article = await db.Markdown.findAll({
                });
            }
            if(id && id !== 'ALL') {
                article = await db.Markdown.findOne({
                    where: { productId: id }
                });
            }
            resolve(article);
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
    editCategory,
    deleteCategory,
    getAllProductByCategory,
    editProduct,
    deleteProduct,
    saveDetailInfoProduct,
    getSomeProduct,
    getArticleProduct,
}