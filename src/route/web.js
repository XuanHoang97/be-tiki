import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import productController from '../controllers/productController';
import newController from '../controllers/newController';

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
    
    //search code
    router.get('/api/search', userController.handleSearchUser);
    
    //API Product
    router.get('/api/allcode', userController.getAllCode);
    router.get('/api/get-all-products', productController.GetAllProducts);
    router.post('/api/create-new-product', productController.CreateNewProduct);
    router.get('/api/get-all-category', productController.GetAllCategory);
    router.put('/api/edit-product', productController.EditProduct);
    router.delete('/api/delete-product', productController.DeleteProduct);

    router.post('/api/create-new-category', productController.CreateNewCategory);
    router.get('/api/get-all-product-by-category', productController.GetAllProductByCategory)


    //API news and event
    router.get('/api/get-all-news', newController.GetAllNews);
    router.post('/api/create-news', newController.CreateNews);
    router.put('/api/edit-news', newController.EditNews);
    router.delete('/api/delete-news', newController.DeleteNews);

    return app.use('/', router);
}

module.exports = initWebRouter;
