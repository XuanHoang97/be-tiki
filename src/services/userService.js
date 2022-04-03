import db from "../models/index";
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
const { cloudinary } = require('../ultils/cloudinary');

//hash password
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e)
        }
    })
}

//Login
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if (isExist) {
                // user already exist
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'roleId', 'password', 'username'],
                    where: { email: email },
                    raw: true,
                });

                if (user) {
                    // compare password
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';

                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`
                }


            } else {
                // return error
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist in your system.Plz try other Email`
            }
            resolve(userData)

        } catch (e) {
            reject(e);
        }
    })
}

//check email login
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
            })
            user ? resolve(true) : resolve(false)
        } catch (e) {
            reject(e);
        }
    })
}

// getAllUSers
let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    },

                    include : [{
                        model: db.Point,
                        as : 'userData',
                        attributes: ['id', 'point', 'userId'],
                    }],
                            
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

//Create USers
let createNewUser = (data, file) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email is exist ???
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in used, Plz try another email'
                })
            } else{
                if(file) {
                    const result = await cloudinary.uploader.upload(file.path);
                    data.image = result.url;
                    data.cloudinary_id = result.public_id;
                }
                let newUser = await db.User.create({
                    ...data
                });
                resolve(newUser);
            } 
            
        } catch (e) {
            reject(e);
        }
    })
}

//delete Users
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let foundUser = await db.User.findOne({
            where: { id: userId }
        })

        if (!foundUser) {
            resolve({
                errCode: 2,
                errMessage: `The user isn't exist`
            })
        }

        await db.User.destroy({
            where: { id: userId }
        });

        resolve({
            errCode: 0,
            message: `The user is deleted`
        })

    })
}

//update Users
let updateUserData = (data, file) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }

            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })

            if (user) {
                if(file) {
                    const result = await cloudinary.uploader.upload(file.path);
                    data.image = result.url;
                    data.cloudinary_id = result.public_id;
                }
                user.email = data.email;
                user.username = data.username;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                user.image = data.image;
                user.cloudinary_id = data.cloudinary_id;

                await user.save({
                    ...data
                });
                resolve({
                    errCode: 0,
                    message: 'The user is updated'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User's not found`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

//getAllCode
let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }
        } catch (e) {
            reject(e);
        }
    })
}

// get point user
let getPointUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password', 'refresh_token', 'cloudinary_id']
                },

                include: [{
                        model: db.Point,
                        as: 'userData',
                        attributes: ['id', 'point', 'userId'],
                    },
                    {
                        model: db.History,
                        as: 'historyData',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    }
                ],
            })
            resolve(user);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin,
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUserData,
    getAllCodeService,
    getPointUser
}