import userService from '../services/userService';

const userController = {
    handleLogin: async (req, res) => {
        // lay gia tri tu phia client truyen len 
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
    //search user
    handleSearchUser: async (req, res) => {
        const { keyword } = req.query;
        try {
            let users = await userService.searchUser(keyword);
            return res.status(200).json({
                errCode: 0,
                message: 'Success',
                users
            })
        } catch (err) {
            return res.status(500).json({
                errCode: 1,
                message: 'Server error',
                err
            })
        }
    },
    handleGetAllUsers: async (req, res) => {
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
    handleCreateNewUser: async (req, res) => {
        let message = await userService.createNewUser(req.body);
        return res.status(200).json(message)
    },
    handleDeleteUser: async (req, res) => {
        if (!req.body.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameter'
            })
        }

        let message = await userService.deleteUser(req.body.id);
        return res.status(200).json(message)
    },
    handleEditUser: async (req, res) => {
        try {
            let message = await userService.updateUserData(req.body)
            return res.status(200).json(message)
        } catch (e) {
            console.log('loi', e)
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
    getDetailUser: async (req, res) => {
        try {
            let data = await userService.getDetailUserService(req.query.id);
            return res.status(200).json(data);
        } catch (e) {
            console.log('get detail user error: ', e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    }
}



module.exports = userController