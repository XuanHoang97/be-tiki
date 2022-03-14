import userService from '../services/userService';

const userController = {
    handleLogin: async (req, res) => {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(500).json({
                errCode: 1,
                message: 'Missing input parameter'
            })
        }

        let userData = await userService.handleUserLogin(email, password);

        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            user: userData.user ? userData.user : {}
        })
    },

    getAllUsers: async (req, res) => {
        let id = req.query.id //All, id
        let users = await userService.getAllUsers(id)
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameter',
                users: []
            })
        }
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            users
        })
    },
    createUser: async (req, res) => {
        try{
            let message = await userService.createNewUser(req.body, req.file);
            return res.status(200).json(message)
        }catch(e){
            return res.status(500).json({
                errCode: 1,
                errMessage: e
            })
        }
    },
    deleteUser: async (req, res) => {
        if (!req.body.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameter'
            })
        }

        let message = await userService.deleteUser(req.body.id);
        return res.status(200).json(message)
    },
    editUser: async (req, res) => {
        try {
            let message = await userService.updateUserData(req.body, req.file)
            return res.status(200).json(message)
        } catch (e) {
            console.log('err', e)
        }
    },
    getAllCode: async (req, res) => {
        try {
            let data = await userService.getAllCodeService(req.query.type);
            return res.status(200).json(data);
        } catch (e) {
            console.log('get all code error: ', e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    },

    // get point user
    getPointUser: async (req, res) => {
        try {
            let {userId} = req.query;
            let data = await userService.getPointUser(userId);
            return res.status(200).json(data);
        } catch (e) {
            console.log('get point user error: ', e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    },
}

module.exports = userController