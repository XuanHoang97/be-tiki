import db from "../models/index";

// get notify by user
let getNotify = (userId, status) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!userId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing params"
                });
            }else{
                let notify = '';
                if (userId === 'ALL') {
                    notify = await db.Notify.findAll()
                }
                if(userId && userId !== 'ALL') {
                    notify = await db.Notify.findAll({
                        where: {
                            userId: userId,
                        },
                        attributes:{
                            exclude: ['cloudinary_id', 'createdAt', 'updatedAt']
                        }
                    });
                }
                if(status) {
                    notify = await db.Notify.findAll({
                        where: {
                            userId: userId,
                            status: status,
                        },
                        attributes:{
                            exclude: ['cloudinary_id', 'createdAt', 'updatedAt']
                        }
                    });
                }
                resolve({
                    errCode: 0,
                    errMessage: "Success",
                    notify
                });
            }
        }catch (error) {
            reject(error);
        }
    })
}

// update notify
let updateNotify = (id, status) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!id) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing params"
                });
            }else{
                let notify = await db.Notify.update({
                    status: status
                }, {
                    where: {
                        id: id
                    }
                });
                resolve({
                    errCode: 0,
                    errMessage: "Success",
                    notify
                });
            }
        }catch (error) {
            reject(error);
        }
    })
}

// mark all as read
let markAllAsRead = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!userId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing params"
                });
            }else{
                let notify = await db.Notify.update({
                    status: 'OS2'
                }, {
                    where: {
                        userId: userId
                    }
                });
                resolve({
                    errCode: 0,
                    errMessage: "Success",
                    notify
                });
            }
        }catch (error) {
            reject(error);
        }
    })
}



module.exports = {
    getNotify,
    updateNotify
}