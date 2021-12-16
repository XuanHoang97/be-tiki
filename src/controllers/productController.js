import productService from '../services/ProductService';

const productController = {
    // get all products
    GetAllProducts : async(req, res) => {
        try{
            let {id} = req.query;
            let products = await productService.getAllProducts(id)
            return res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                products
            })
        }catch(e){
            console.log(e);
            if (!id) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                    products: []
                })
            }
        }

    },

    // create product
    CreateNewProduct : async(req, res) => {
        try{
            let product = await productService.createNewProduct(req.body);
            return res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                product: product
            })
        }catch(e){
            console.log(e);
        }
    },

    //get all category
    GetAllCategory: async(req, res) => {
        try{
            let {id} = req.query;
            let category = await productService.getAllCategory(id);
            return res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                category
            })
        }catch(e){
            console.log(e);
            if (!id) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                    category: []
                })
            }
        }
    },

    //create category
    CreateNewCategory: async(req, res) => {
        try{
            let category = await productService.createNewCategory(req.body);
            return res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                category: category
            })
        }catch(e){
            console.log(e);
        }
    },

    //get all product by category
    GetAllProductByCategory: async(req, res) => {
        try{
            let {id} = req.query;
            let product = await productService.getAllProductByCategory(id);
            return res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                product
            })
        }catch(e){
            console.log(e);
            if (!id) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                    product: []
                })
            }
        }
    },
}

module.exports = productController
