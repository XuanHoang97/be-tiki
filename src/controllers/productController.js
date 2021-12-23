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

    //edit product
    EditProduct : async(req, res) => {
        try{
            let product = await productService.editProduct(req.body);
            return res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                product: product
            })
        }catch(e){
            console.log(e);
        }
    },

    //delete product
    DeleteProduct : async(req, res) => {
        try{
            if (!req.body.id) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
    
            let product = await productService.deleteProduct(req.body.id);
            return res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                product: product
            })
        }catch(e){
            console.log(e);
        }

    },

    // post info product
    postInfoProduct: async(req, res) => {
        try {
            let response = await productService.saveDetailInfoProduct(req.body);
            return res.status(200).json(response);
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },

    //get some product in category
    getSomeProduct : async(req, res) => {
        try {
            let someProduct = await productService.getSomeProduct();
            return res.status(200).json(someProduct)
    
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },

    //get article product
    getArticleProduct : async(req, res) => {
        try{
            let {id} = req.query;
            let articles = await productService.getArticleProduct(id)
            return res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                articles
            })
        }catch(e){
            console.log(e);
            if (!id) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                    articles: []
                })
            }
        }
    },

    //get detail product
    getDetailProduct : async(req, res) => {
        try {
            let info = await productService.getDetailProduct(req.query.id);
            return res.status(200).json(info);
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
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
                category
            })
        }catch(e){
            console.log(e);
        }
    },

    //edit category
    EditCategory: async(req, res) => {
        try{
            let category = await productService.editCategory(req.body);
            return res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                category
            })
        }
        catch(e){
            console.log(e);
        }
    },

    //delete category
    DeleteCategory: async(req, res) => {
        try{
            if (!req.body.id) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
    
            let category = await productService.deleteCategory(req.body.id);
            return res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                category
            })
        }catch(e){
            console.log(e);
        }
    },

}

module.exports = productController
