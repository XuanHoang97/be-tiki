import db from "../models/index";
const { cloudinary } = require('../ultils/cloudinary');
const {format, zonedTimeToUtc} = require('date-fns-tz');

//today's date
const today =new Date();
const timeZone = 'Asia/Ho_Chi_Minh';
const timeInZone = zonedTimeToUtc(today, timeZone);
const currentDate = today.valueOf() + 7 * 60 * 60

// Send bill
let sendBill = (data, file) => {
    return new Promise(async (resolve, reject) => {
        try {
            // if(file){
            //     const result = await cloudinary.uploader.upload(file.path);
            //     data.image = result.secure_url;
            //     data.cloudinary_id = result.public_id;
            // }

            if(data.status === 'S4'){
                let bill = await db.Bill.create({
                    billCode: 'B' + Math.floor(Math.random() * 10000),
                    userId: data.userId,
                    code: data.code,
                    username: data.username,
                    name: data.name,
                    qty: data.qty,
                    total: data.total,
                    status: data.status,
                    payment: data.payment,
                    datePayment: currentDate,
                });

                resolve({
                    errCode: 0,
                    errMsg: 'ok',
                    bill
                });

                // add notification
            }else{
                resolve({
                    errCode: 1,
                    errMsg: 'Đơn hàng chưa hoàn thành'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}   

module.exports = {
    sendBill
}