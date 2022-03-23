import db from "../models/index";
const { cloudinary } = require('../ultils/cloudinary');
const {format, zonedTimeToUtc} = require('date-fns-tz');

//today's date
const today =new Date();
const timeZone = 'Asia/Ho_Chi_Minh';
const timeInZone = zonedTimeToUtc(today, timeZone);
const currentDate = today.valueOf() + 7 * 60 * 60;

console.log(currentDate)

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
                    address: data.address,
                    phone: data.phone,
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

                // update status order
                let order = await db.Order.update({
                    status: 'S4',
                    bill: '1'
                }, {
                    where: {
                        code: data.code
                    }
                });

                // add notification
                let notify = await db.Notify.create({
                    userId: data.userId,
                    title: 'Hoá đơn mua hàng',
                    content: 'Cảm ơn bạn đã mua hàng tại Tiki, vui lòng kiểm tra lại thông tin hoá đơn đã được gửi đến email của bạn',
                    status: 'N1',
                    image : 'https://en.pimg.jp/073/147/759/1/73147759.jpg',
                    type: 'ORDER',
                    date: currentDate,
                })

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

// get bill
let getBill = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bills = '';
            if (id === 'ALL') {
                bills = await db.Bill.findAll({
                })
            } 
            if(id && id !== 'ALL') {
                bills = await db.Bill.findOne({
                    where: { id: id }
                });
            }
            resolve(bills);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    sendBill,
    getBill
}