import discountService from '../services/discountService';

const discountController = {
    // add discount
    addDiscount: async (req, res) => {
        try {
            let discount = await discountService.addDiscount(req.body);
            res.status(200).json({
                errCode: 0,
                errMessage: 'ok',
                discount
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // get discount
    getDiscount: async (req, res) => {
        try{
            let {id} = req.query;
            let discount = await discountService.getDiscount(id)
            return res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                discount
            })
        }catch(e){
            if (!id) {
                return res.status(500).json({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                })
            }
            console.log(e);
        }
    },

}
module.exports = discountController

