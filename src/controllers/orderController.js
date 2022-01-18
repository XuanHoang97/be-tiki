import orderService from '../services/orderService';

const orderController = {
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

    //get all cart not login
    getCart : async(req, res) => {
        try{
            let result = await orderService.getCart(req.query.id);
            res.status(200).json({
                errCode: 0,
                errMessage: 'Get all cart success',
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

    //delete item cart
    deleteItemCart : async(req, res) => {
        try{
            if (!req.body.id) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
    
            let cart = await orderService.deleteItemCart(req.body.id);
            return res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                cart: cart
            })
        }catch(e){
            console.log(e);
        }
    },

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

  


}

module.exports = orderController
