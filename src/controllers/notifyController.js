import notifyService from '../services/notifyService';
import db from "../models/index";

const notifyController = {
    // get notify by user
    getNotify: async (req, res) => {
        try {
            let {userId, status, type}  = req.query;
            let result = await notifyService.getNotify(userId, status, type);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // update notify
    updateNotify: async (req, res) => {
        try {
            let result = await notifyService.updateNotify(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // mark all as read
    markAllAsRead: async (req, res) => {
        try {
            let result = await notifyService.markAllAsRead(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    }

}
module.exports = notifyController