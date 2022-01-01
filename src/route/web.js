import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import productController from '../controllers/productController';
import newController from '../controllers/newController';
import searchController from '../controllers/searchController';

let router = express.Router();

let initWebRouter = (app) => {
    //CRUD with NodeJS
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    //API Login & CRUD user With Redux
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/detail-user', userController.getDetailUser);
    
    //search
    router.get('/api/search', searchController.handleSearch);
    
    //API Product
    router.get('/api/allcode', userController.getAllCode);
    router.get('/api/get-all-products', productController.GetAllProducts);
    router.post('/api/create-new-product', productController.CreateNewProduct);
    router.put('/api/edit-product', productController.EditProduct);
    router.delete('/api/delete-product', productController.DeleteProduct);
    router.get('/api/similar-product', productController.getSimilarProduct);

    //article product
    router.get('/api/get-some-product', productController.getSomeProduct);
    router.post('/api/save-info-product', productController.postInfoProduct);
    router.get('/api/get-article-product', productController.getArticleProduct);
    router.get('/api/get-detail-product', productController.getDetailProduct);
    router.put('/api/edit-info-product', productController.editInfoProduct);


    //api category
    router.get('/api/get-all-category', productController.GetAllCategory);
    router.post('/api/create-new-category', productController.CreateNewCategory);
    router.put('/api/edit-category', productController.EditCategory);
    router.delete('/api/delete-category', productController.DeleteCategory);


    //API news and event
    router.get('/api/get-all-news', newController.GetAllNews);
    router.post('/api/create-news', newController.CreateNews);
    router.put('/api/edit-news', newController.EditNews);
    router.delete('/api/delete-news', newController.DeleteNews);

    return app.use('/', router);
}

module.exports = initWebRouter;
