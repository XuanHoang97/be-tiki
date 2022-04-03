import orderService from '../services/orderService';
import db from "../models/index";

const orderController = {
    // Order with login
    //add to cart
    addToCart : async(req, res) => {
        try {
            let {data, productId, qty, userId} = req.body;
            let result = await orderService.addToCart(data, productId, qty, userId);
            res.status(200).json({
                errCode: 0,
                errMessage: 'Add to cart success',
                result
            });
        } catch (error) {
            res.status(500).json({
                errMessage: 'Add to cart fail',
                error: error
            });
        }
    },

    //get cart by userId
    getCart : async(req, res) => {
        try {
            let {userId} = req.query;
            let result = await orderService.getCart(userId);
            res.status(200).json({
                errCode: 0,
                errMessage: 'Get cart success',
                result
            });
        } catch (error) {
            res.status(500).json({
                errMessage: 'Get cart fail',
                error: error
            });
        }
    },

    //delete item cart by userId
    deleteItemCart : async(req, res) => {   
        try {
            let {id} = req.body;
            let result = await orderService.deleteItemCart(id);
            res.status(200).json({
                errCode: 0,
                errMessage: 'Delete item cart success',
                result
            });
        } catch (error) {
            res.status(500).json({
                errMessage: 'Delete item cart fail',
                error: error
            });
        }
    },

    // update item cart by userId
    updateItemCart : async(req, res) => {
        try {
            // let {id, qty} = req.body;
            let result = await orderService.updateItemCart(req.body);
            res.status(200).json({
                errCode: 0,
                errMessage: 'Update item cart success',
                result
            });
        } catch (error) {
            res.status(500).json({
                errMessage: 'Update item cart fail',
                error: error
            });
        }
    },

    // checkout order
    checkout : async(req, res) => {
        try {
            let result = await orderService.checkout(req.body);
            res.status(200).json({
                errCode: 0,
                errMessage: 'Checkout success',
                result
            });
        } catch (error) {
            res.status(500).json({
                errMessage: 'Checkout fail',
                error: error
            });
        }
    },

    // get order by userId
    filterMyOrder: async(req, res) => {
        try {
            let {status, userId} = req.query;
            let result = await orderService.filterMyOrder(status, userId);
            res.status(200).json({
                errCode: 0,
                errMessage: 'Filter my order success',
                length: result.length,
                result
            });
        } catch (error) {
            res.status(500).json({
                errMessage: 'Filter my order fail',
                error: error
            });
        }
    },

    // ---------------------------------------------------------------------------------------------------------------------
    // Order with not login

    //create order
    createOrder : async(req, res) => {
        try{
            let result = await orderService.createOrder(req.body);
            res.status(200).json({
                errCode: 0,
                errMessage: 'Create order success',
                result
            });
        }catch(e){
            console.log(e);
            return res.status(500).json({
                errCode: 1,
                errMessage: 'Create order fail',
                error: e
            })
        }
    },

    //get all order
    getOrder : async(req, res) => {
        try{
            let result = await orderService.getOrder(req.query.id);
            res.status(200).json({
                errCode: 0,
                errMessage: 'Get all order success',
                result
            });
        }catch(e){
            console.log(e);
            if (!id) {
                return res.status(500).json({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                    result: []
                })
            }
        }
    },

    //verify order from email
    verifyOrder : async(req, res) => {
        try{
            let result = await orderService.verifyOrder(req.body);
            res.status(200).json({
                errCode: 0,
                errMessage: 'Verify order success',
                result
            });
        }catch(e){
            console.log(e);
            return res.status(500).json({
                errCode: 1,
                errMessage: 'Verify order fail',
                error: e
            })
        }
    },

    // Filter order by status
    filterOrder : async(req, res) => {
        try{
            let {status, dateOrder} = req.query;
            let result = await orderService.filterOrder(status, dateOrder);
            res.status(200).json({
                errCode: 0,
                errMessage: 'Filter order success',
                length: result.length,
                result
            });
        }catch(e){
            console.log(e);
            return res.status(500).json({
                errCode: 1,
                errMessage: 'Filter order fail',
                length: 0,
                error: e
            })
        }
    },

    // update order
    updateOrder : async(req, res) => {
        try{
            let result = await orderService.updateOrder(req.body);
            res.status(200).json({
                errCode: 0,
                errMessage: 'Update order success',
                result
            });
        }catch(e){
            console.log(e);
            return res.status(500).json({
                errCode: 1,
                errMessage: 'Update order fail',
                error: e
            })
        }
    },

    // get order todays
    getOrderTodays : async(req, res) => {
        try{
            let result = await orderService.getOrderTodays();
            res.status(200).json({
                errCode: 0,
                errMessage: 'Get order todays success',
                length: result.length,
                result
            });
        }catch(e){
            console.log(e);
            return res.status(500).json({
                errCode: 1,
                errMessage: 'Get order todays fail',
                error: e
            })
        }
    },

    // revenue today
    getRevenueToday : async(req, res) => {
        try{
            let result = await orderService.revenueToday();
            res.status(200).json({
                errCode: 0,
                errMessage: 'Get revenue today success',
                result
            });
        }catch(e){
            console.log(e);
            return res.status(500).json({
                errCode: 1,
                errMessage: 'Get revenue today fail',
                error: e
            })
        }
    },

    // new customer month
    getCustomerMonth : async(req, res) => {
        try{
            let result = await orderService.customerMonth();
            res.status(200).json({
                errCode: 0,
                errMessage: 'Get customer month success',
                result
            });
        }catch(e){
            console.log(e);
            return res.status(500).json({
                errCode: 1,
                errMessage: 'Get customer month fail',
                error: e
            })
        }
    },

}

module.exports = orderController
