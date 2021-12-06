import userService from '../services/userService';

let handleLogin = async(req, res) => {
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
}



module.exports = {
    handleLogin: handleLogin,
}