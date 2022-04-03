import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import productController from '../controllers/productController';
import newController from '../controllers/newController';
import searchController from '../controllers/searchController';
import slideController from '../controllers/slideController';
import orderController from '../controllers/orderController';
import paginationController from '../controllers/paginationController';
import notifyController from '../controllers/notifyController';
import uploadFileController from '../controllers/uploadFileController';
import discountController from '../controllers/discountController';
import billController from '../controllers/billController';
const upload = require('../ultils/multer');

//authentication
import { getUser, updateUser, changePassword, Register, Login, Logout } from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";

let router = express.Router();

let initWebRouter = (app) => {
    // Auth
    router.get('/user', verifyToken, getUser);  
    router.put('/update-user',verifyToken, upload.single('image'), updateUser);  
    router.put('/change-password',verifyToken,  changePassword);
    router.post('/auth/register', Register);
    router.post('/auth/login', Login);
    router.get('/auth/token', refreshToken);
    router.delete('/auth/logout', Logout);

    // Order with login
    router.post('/add-item-to-cart',verifyToken, orderController.addToCart);
    router.get('/cart',verifyToken, orderController.getCart);
    router.delete('/delete-item-cart',verifyToken, orderController.deleteItemCart);
    router.put('/update-item-cart',verifyToken, orderController.updateItemCart);
    router.post('/checkout',verifyToken, orderController.checkout);
    router.get('/filterMyOrder',verifyToken, orderController.filterMyOrder);

    // Notify
    router.get('/notify',verifyToken, notifyController.getNotify);
    router.put('/update-notify',verifyToken, notifyController.updateNotify);
    router.put('/mark-all-as-read', verifyToken, notifyController.markAllAsRead);

    router.post('/rating',verifyToken, productController.rating);
    router.get('/point-user', verifyToken, userController.getPointUser);


    // get all rating
    router.get('/get-rating', productController.getAllRating);

    // discount-admin
    router.post('/add-discount', discountController.addDiscount);
    router.get('/get-discount', discountController.getDiscount);

    // user add discount
    router.post('/save-discount', verifyToken, discountController.addDiscountUser);
    router.get('/get-discount-user', verifyToken, discountController.getDiscountUser);

    // pagination
    router.get('/news/:page', paginationController.getAllNews);

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
    router.post('/create-new-user',upload.single('image'), userController.createUser);
    router.put('/edit-user',upload.single('image'), userController.editUser);
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

    router.post('/save-option-product', productController.postOptionProduct);  

    // upload image
    router.post('/uploadImage',upload.array('pictures'), uploadFileController.uploadFile);

    // filter product
    router.get('/filter-product', productController.filterProduct);

    // order
    router.post('/create-order', orderController.createOrder);
    router.get('/orders', orderController.getOrder);
    router.post('/verify-order', orderController.verifyOrder);  // verify order -send email
    router.get('/filter-order', orderController.filterOrder);
    router.put('/update-order', orderController.updateOrder);

    // get order todays
    router.get('/get-order-today', orderController.getOrderTodays);

    // revenue today
    router.get('/get-revenue-today', orderController.getRevenueToday);

    // customer month
    router.get('/new-customer-month', orderController.getCustomerMonth);

    // send bill
    router.post('/send-bill', billController.sendBill);
    router.get('/get-bill', billController.getBill);

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
