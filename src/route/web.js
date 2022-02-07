import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import productController from '../controllers/productController';
import newController from '../controllers/newController';
import searchController from '../controllers/searchController';
import slideController from '../controllers/slideController';
import orderController from '../controllers/orderController';
import paginationController from '../controllers/paginationController';
const upload = require('../ultils/multer');
import db from "../models/index";


//authentication
import { getUsers, Register, Login, Logout } from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";

let router = express.Router();

let initWebRouter = (app) => {
    // Auth
    // router.get('/users', verifyToken, getUsers);  
    router.post('/auth/register', Register);
    router.post('/auth/login', Login);
    router.get('/auth/token', refreshToken);
    router.delete('/auth/logout', Logout);

    // pagination
    router.get('/get-all-news/:page', paginationController.getAllNews);



    //auth admin
    router.post('/login', userController.handleLogin);

    //CRUD server side
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    // CRUD User
    router.get('/get-all-users', userController.getAllUsers);
    router.post('/create-new-user', userController.createUser);
    router.put('/edit-user', userController.editUser);
    router.delete('/delete-user', userController.deleteUser);
    
    // Search
    router.get('/search', searchController.handleSearch);
    
    //Product
    router.get('/allcode', userController.getAllCode);
    router.get('/get-all-products', productController.GetAllProducts);
    router.post('/create-new-product',upload.single('image'), productController.createProduct);
    router.put('/edit-product',upload.single('image'), productController.EditProduct);
    router.delete('/delete-product', productController.DeleteProduct);
    router.get('/similar-product', productController.getSimilarProduct);
    router.get('/get-detail-product', productController.getDetailProduct);

    // Article product
    router.get('/get-article-product', productController.getArticleProduct);
    router.post('/save-info-product', productController.postInfoProduct);
    router.put('/edit-info-product', productController.editInfoProduct);

    router.post('/save-option-product',upload.array('multi-image', 3), productController.postOptionProduct);  

    // Order
    router.post('/add-item-to-cart', orderController.addToCart);
    router.get('/cart', orderController.getCart);
    router.delete('/delete-item-cart', orderController.deleteItemCart);

    router.post('/create-order', orderController.createOrder);
    router.get('/get-order', orderController.getOrder);
    router.post('/verify-order', orderController.verifyOrder);

    router.get('/filter-order', orderController.filterOrder);
    router.put('/update-order', orderController.updateOrder);

    // Notification order
    

    // Category
    router.get('/get-all-category', productController.GetAllCategory);
    router.post('/create-new-category',upload.single('image'), productController.createCategory);
    router.put('/edit-category',upload.single('image'), productController.EditCategory);
    router.delete('/delete-category', productController.DeleteCategory);
    router.get('/get-detail-category', productController.getDetailCategory);


    // News and event
    router.get('/get-all-news', newController.GetAllNews);
    router.post('/create-news',upload.single('image'), newController.CreateNews);
    router.put('/edit-news',upload.single('image'), newController.EditNews);
    router.delete('/delete-news', newController.DeleteNews);

    // Multimedia 
    router.get('/get-all-slide', slideController.GetAllSlide);
    router.post('/create-slide',upload.single('image'), slideController.CreateSlide);
    router.put('/edit-slide',upload.single('image'), slideController.EditSlide);
    router.delete('/delete-slide',upload.single('image'), slideController.DeleteSlide);

    router.get('/get-all-specialCategory', slideController.GetAllSpecialCategory);
    router.post('/create-specialCategory',upload.single('image'), slideController.CreateSpecialCategory);
    router.put('/edit-specialCategory',upload.single('image'), slideController.EditSpecialCategory);
    router.delete('/delete-specialCategory',upload.single('image'), slideController.DeleteSpecialCategory);




    return app.use('/', router);
}
module.exports = initWebRouter;
