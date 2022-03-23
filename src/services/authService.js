import db from "../models/index";
const { cloudinary } = require('../ultils/cloudinary');
import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);

//update Users
let updateUser = (data, file) => {
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
                raw: false,
                attributes: {
                    exclude: ["password","refresh_token"]
                }
            })

            if (user) {
                if(file) {
                    const result = await cloudinary.uploader.upload(file.path);
                    data.image = result.url;
                    data.cloudinary_id = result.public_id;
                }
                user.email = data.email;
                user.username = data.username;
                user.age = data.age;
                user.address = data.address;
                user.address2 = data.address2;
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
                    errMessage: 'The user is updated',
                    user,
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

// change password
let changePassword = (data) => {
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
            })

            if (user) {
                // check old password
                const checkPassword = await bcrypt.compareSync(data.oldPassword, user.password);
                if (!checkPassword) {
                    resolve({
                        errCode: 1,
                        errMessage: 'Sai mật khẩu'
                    })
                } else {
                    // hash new password
                    const newPassword = await bcrypt.hashSync(data.newPassword, salt);

                    // confirm new password
                    const confirmPassword = await bcrypt.compareSync(data.confirmPassword, newPassword);
                    if (!confirmPassword) {
                        resolve({
                            errCode: 2,
                            errMessage: 'Mật khẩu không trùng khớp'
                        })
                    } else {
                        user.password = newPassword;
                        await db.User.update({
                            password: newPassword
                        }, {
                            where: { id: data.id }
                        })
                        resolve({
                            errCode: 0,
                            errMessage: 'Đổi mật khẩu thành công'
                        })
                    }
                }
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

module.exports = {
    updateUser,
    changePassword
}