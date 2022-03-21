import billService from '../services/billService';

const billController = {
    // send bill
    sendBill: async (req, res) => {
        try {
            const result = await billService.sendBill(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // get bill
    getBill: async (req, res) => {
        try {
            const result = await billService.getBill(req.query.id);
            res.status(200).json({
                errCode: 0,
                errMsg: 'ok',
                result
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = billController