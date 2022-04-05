import db from "../models/index";
import emailService from '../services/emailService';

// Send bill
let sendBill = (data, file) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(data.status === 'S4'){
                let bill = await db.Bill.create({
                    billCode: 'B' + Math.floor(Math.random() * 10000),
                    userId: data.userId,
                    username: data.username,
                    address: data.address,
                    phone: data.phone,
                    email: data.email,
                    code: data.code,
                    name: data.name,
                    qty: data.qty,
                    sale: data.sale,
                    total: data.total,
                    status: data.status,
                    payment: data.payment,
                    datePayment: data.datePayment,
                });

                // send mail-verify order
                await emailService.sendBill({
                    receiveEmail: data.email,
                    customer: data.username,
                    payment: data.payment,
                    billCode: bill.billCode,
                    product: data.name,
                    qty: data.qty,

                    orderValue: data.OrderValueEmail,
                    total: data.totalEmail,
                    datePayment: data.datePaymentEmail,
                });

                resolve({
                    errCode: 0,
                    errMsg: 'ok',
                    bill
                });

                // update status order
                let order = await db.Order.update({
                    bill: '1',
                    status: 'S4',
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
                    date: data.datePayment,
                    link: 'https://mail.google.com/mail/u/0/#inbox'
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