import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import productController from '../controllers/productController';
import newController from '../controllers/newController';
import searchController from '../controllers/searchController';
import slideController from '../controllers/slideController';
const upload = require('../ultils/multer');

let router = express.Router();

let initWebRouter = (app) => {
    //CRUD
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    //Login & CRUD User
    router.post('/login', userController.handleLogin);
    router.get('/get-all-users', userController.handleGetAllUsers);
    router.post('/create-new-user', userController.handleCreateNewUser);
    router.put('/edit-user', userController.handleEditUser);
    router.delete('/delete-user', userController.handleDeleteUser);
    router.get('/detail-user', userController.getDetailUser);
    
    //search
    router.get('/search', searchController.handleSearch);
    
    //Product
    router.get('/allcode', userController.getAllCode);
    router.get('/get-all-products', productController.GetAllProducts);
    router.post('/create-new-product', productController.CreateNewProduct);
    router.put('/edit-product', productController.EditProduct);
    router.delete('/delete-product', productController.DeleteProduct);
    router.get('/similar-product', productController.getSimilarProduct);
    router.get('/get-detail-product', productController.getDetailProduct);
    // router.get('/get-product-by-category', productController.getProductByCategory);


    //article product
    router.get('/get-some-product', productController.getSomeProduct);
    router.get('/get-article-product', productController.getArticleProduct);
    router.post('/save-info-product', productController.postInfoProduct);
    router.put('/edit-info-product', productController.editInfoProduct);


    //category
    router.get('/get-all-category', productController.GetAllCategory);
    router.post('/create-new-category', productController.CreateNewCategory);
    router.put('/edit-category', productController.EditCategory);
    router.delete('/delete-category', productController.DeleteCategory);


    //news and event
    router.get('/get-all-news', newController.GetAllNews);
    router.post('/create-news', newController.CreateNews);
    router.put('/edit-news', newController.EditNews);
    router.delete('/delete-news', newController.DeleteNews);

    //multimedia 
    router.get('/get-all-slide', slideController.GetAllSlide);
    router.post('/create-slide',upload.single('image'), slideController.CreateSlide);
    router.put('/edit-slide',upload.single('image'), slideController.EditSlide);
    router.delete('/delete-slide',upload.single('image'), slideController.DeleteSlide);

    router.get('/get-all-specialCategory', slideController.GetAllSpecialCategory);
    router.post('/create-specialCategory', slideController.CreateSpecialCategory);
    router.put('/edit-specialCategory', slideController.EditSpecialCategory);
    router.delete('/delete-specialCategory', slideController.DeleteSpecialCategory);


    return app.use('/', router);
}

module.exports = initWebRouter;
