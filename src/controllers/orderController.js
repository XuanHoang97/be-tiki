import orderService from '../services/orderService';

const orderController = {
    //get all cart
    getAllCart : async(req, res) => {
        try{
            let {id} = req.query;
            let cart = await orderService.getAllCart(id)
            return res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                cart
            })
        }catch(e){
            console.log(e);
            if (!id) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                    cart: []
                })
            }
        }
    },

    //add to cart
    addToCart : async(req, res) => {
        try {
            let response = await orderService.addToCart(req.body);
            return res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                response
            });
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    }
}

module.exports = orderController
