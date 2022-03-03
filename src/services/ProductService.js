import db from "../models/index";
import { Op } from "sequelize";
import { raw } from "body-parser";
import req from "express/lib/request";
const { cloudinary } = require('../ultils/cloudinary');
import _ from 'lodash';


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
let createProduct = (data,file) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(file) {
                const result = await cloudinary.uploader.upload(file.path);
                data.image = result.url;
                data.cloudinary_id = result.public_id;
            }

            let newProduct = await db.Product.create({
                ...data
            });
            resolve(newProduct);
        } catch (e) {
            reject(e);
        }
    })
}

//edit product
let editProduct = (data, file) => {
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
            }

            if(file) {
                const result = await cloudinary.uploader.upload(file.path);
                data.image = result.url;
                data.cloudinary_id = result.public_id;
            }
            
            product.name = data.name;
            product.price = data.price;
            product.sale = data.sale;
            product.number = data.number;
            product.warranty = data.warranty;
            product.category_id = data.category_id;
            product.supplier_id = data.supplier_id;
            product.image = data.image;
            product.cloudinary_id = data.cloudinary_id;

            await product.save({
                ...data
            });
            resolve({
                errCode: 0,
                message: 'The product is updated'
            })
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

//similar product
let getSimilarProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Product.findOne({
                where: { id: id },
                raw: false
            });
            let category_id = product.category_id;
            let products = await db.Product.findAll({
                where: {
                    category_id: category_id,
                    id: {
                        [Op.ne]: id
                    },
                }
            });
            resolve(products);
        } catch (e) {
            reject(e);
        }
    });
}


//save detail info of product
let saveDetailInfoProduct = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let detailProduct = await db.Markdown.create({                
                characterHTML: data.characterHTML,
                characterMarkdown: data.characterMarkdown,
                accessoryHTML: data.accessoryHTML,
                accessoryMarkdown: data.accessoryMarkdown,
                specificationHTML: data.specificationHTML,
                specificationMarkdown: data.specificationMarkdown,
                descriptionHTML: data.descriptionHTML,
                descriptionMarkdown: data.descriptionMarkdown,
                option: data.option,
                productId: data.productId,
                categoryId: data.categoryId,
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

//edit info product
let editDetailInfoProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let detailProduct = await db.Markdown.findOne({
                where: { id: data.id }
            });
            if(!detailProduct) {
                resolve({
                    errCode: 1,
                    errMessage: 'The detail product is not exist'
                })
            }
            detailProduct.characterHTML = data.characterHTML;
            detailProduct.characterMarkdown = data.characterMarkdown;
            detailProduct.accessoryHTML = data.accessoryHTML;
            detailProduct.accessoryMarkdown = data.accessoryMarkdown;
            detailProduct.specificationHTML = data.specificationHTML;
            detailProduct.specificationMarkdown = data.specificationMarkdown;
            detailProduct.descriptionHTML = data.descriptionHTML;
            detailProduct.descriptionMarkdown = data.descriptionMarkdown;
            detailProduct.productId = data.productId;
            detailProduct.categoryId = data.categoryId;
            await detailProduct.save();
            resolve({
                errCode: 0,
                errMessage: 'The detail product is updated',
                detailProduct
            })
        } catch (e) {
            reject(e);
        }
    })
}

//save option product
let saveOptionProduct = (data, multipleFile) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.arrOptionProduct) {
                resolve({
                    errCode: 1,
                    errMessage: 'The option product is not exist'
                })
            }else{
                //save data option product
                let optionProduct = data.arrOptionProduct;
                if(optionProduct && optionProduct.length > 0) {
                    optionProduct = optionProduct.map(item => {
                        return item ;
                    })
                }

                console.log('check data send: ', data);
                
                // get all existing data
                let existing = await db.DetailProduct.findAll({
                    where: {categoryId: data.categoryId, productId: data.productId },
                    attributes: ['productId', 'categoryId', 'option'],
                    raw: true
                })

                //compare arr transmission data
                let toCreate = _.differenceWith(optionProduct, existing, (a, b) => {
                    return a.option === b.option
                });

                //create data
                if (toCreate && toCreate.length > 0) {
                    await db.DetailProduct.bulkCreate(toCreate)
                }    
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}


//get detail product
let getDetailProduct = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }else {
                let detailProduct = await db.Product.findOne({
                    where: { id: inputId },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: {
                                exclude: ['productId', 'categoryId']
                            }
                        },
                        {
                            model: db.Category,
                            as: 'categoryData',
                            attributes: ['name']
                        },
                        {
                            model: db.New,
                            as: 'newData',
                            attributes: ['name', 'image', 'date', 'author_id']
                        },
                    ],
                    raw: false,             //convert Object not sequelize obj
                    nest: true
                });

                resolve({
                    errCode: 0,
                    detailProduct
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

// filter product by price between min and max
let filterProduct = (priceFrom, priceTo) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll({
                where: {
                    price: {
                        [Op.between]: [priceFrom, priceTo]
                    }
                },
                raw: true
            });
            if(products.length > 0) {
                resolve(products)
            }else{
                resolve({
                    errCode: 1,
                    errMessage: 'Không tìm thấy sản phẩm nào'
                })
            }
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
                    where: { id: id },
                    include: [
                        {
                            model: db.Product,
                            as: 'categoryData',
                            attributes: ['name', 'price', 'sale', 'warranty', 'number'],
                        }
                    ],
                });
            }

            resolve(categories);
        } catch (e) {
            reject(e);
        }
    });
};


//create category
let createCategory = (data, file) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(file) {
                const result = await cloudinary.uploader.upload(file.path);
                data.image = result.url;
                data.cloudinary_id = result.public_id;
            }
            let newCategory = await db.Category.create({
                ...data
            });
            resolve({newCategory});

        } catch (e) {
            reject(e);
        }
    });
};

//edit category
let editCategory = (data, file) => {
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
            }
            
            if(file) {
                const result = await cloudinary.uploader.upload(file.path);
                data.image = result.url;
                data.cloudinary_id = result.public_id;
            }

            category.name = data.name;
            category.keyMap = data.keyMap;
            category.type = data.type;
            category.value = data.value;
            category.image = data.image;
            category.cloudinary_id = data.cloudinary_id;

            await category.save({
                ...data
            });
            resolve({
                errCode: 0,
                message: 'The category is updated'
            })
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

//get all product in category
let getDetailCategory = (category_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let detailCategory = await db.Category.findOne({
                where: { id: category_id },
                include: [
                    {
                        model: db.Product,
                        as: 'categoryData',
                        attributes: ['id', 'name', 'image', 'price', 'sale'],
                    }
                ],
                raw: false,
                nest: true
            });
            resolve(detailCategory);
        } catch (e) {
            reject(e);
        }
    });
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
    createProduct,
    
    getAllCategory,
    createCategory,
    editCategory,
    deleteCategory,
    getDetailCategory,

    editProduct,
    deleteProduct,
    getSimilarProduct,
    saveDetailInfoProduct,
    editDetailInfoProduct,
    saveOptionProduct,

    getArticleProduct,
    getDetailProduct,
    filterProduct,

}