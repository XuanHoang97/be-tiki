import orderService from '../services/orderService';

const orderController = {
    //add to cart
    addToCart : async(req, res) => {
        try {
            let {data, productId} = req.body;
            let result = await orderService.addToCart(data, productId);
            res.status(200).json({
                errCode: 0,
                errMessage: 'Add to cart success',
                result
            });
        } catch (error) {
            res.status(500).json({
                message: 'Add to cart fail',
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
        try {
            let {productId} = req.body;
            let result = await orderService.deleteItemCart(productId);
            res.status(200).json({
                errCode: 0,
                errMessage: 'Delete item cart success',
                result
            });
        } catch (error) {
            res.status(500).json({
                message: 'Delete item cart fail',
                error: error
            });
        }
    }

}

module.exports = orderController
