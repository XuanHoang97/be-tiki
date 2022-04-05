import db from "../models/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authService from '../services/authService';

const date = new Date();
const joinDate = date.valueOf() + 7 * 60 * 60;

// Get user after login
export const getUser = async(req, res) => {
    try {
        const {id} = req
        const users = await db.User.findOne({
            where: {id},
            attributes: {
                exclude: ["password","refresh_token"]
            }
        });
        return res.json(users);
    } catch (error) {
        console.log(error);
    }
}

//edit user
export const updateUser = async(req, res) => {
    try {
        const result = await authService.updateUser(req.body, req.file);
        if (!result) {
            return res.status(400).json('User does not exist');
        }
        return res.status(200).json(result);
    } catch (error) {
        console.log('error', error);
    }
}


// Register
export const Register = async(req, res) => {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    //check email exist
    const isExist = await db.User.findOne({
        where: { email }
    });
    if (isExist) {
        return res.json({
            errCode: 1,
            status: 201,
            errMessage: "Your email is already exist, please try another email"
        });
    }else{
        try {
            const user = await db.User.create({
                username,
                email,
                password: hashPassword,
                joinDate: joinDate,
                roleId: 'Người dùng',
                positionId: 'User'
            });
            
            res.json({
                errCode: 0,
                status: 200,
                errMessage: "Register success",
            });
        } 
        catch (error) {
            console.log(error);
        }
    }
}


 // Login
export const Login = async(req, res) => {
    try {
        const user = await db.User.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({
            errCode: 1,
            status: 400,
            errMessage: "Wrong password"
        });
        const id = user[0].id;
        const username = user[0].username;
        const email = user[0].email;
        const accessToken = jwt.sign({id, username, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        const refreshToken = jwt.sign({id, username, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '7d' 
        });
        await db.User.update({refresh_token: refreshToken},{
            where:{
                id: id
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        
        return res.json({
            errCode: 0,
            status:200,
            errMessage: "Login success",
            accessToken,
        });
    } catch (error) {
        res.status(404).json({
            errCode: 2,
            status: 404,
            errMessage: "Email not found"
        });
    }
}

// Logout
export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await db.User.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await db.User.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

// change password
export const changePassword = async(req, res) => {
    try{
        let result = await authService.changePassword(req.body);
        return res.status(200).json({
            errCode: 0,
            status: 200,
            result
        });
    }catch(error){
        console.log(error);
    }
}