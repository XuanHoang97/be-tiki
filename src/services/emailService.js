require('dotenv').config();
import nodemailer from 'nodemailer';

// send verify email
let sendSimpleEmail = async(dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"XuanHoang 👻" <xuanhoang997@gmail.com>',
        to: dataSend.receiveEmail,
        subject: "Thông tin đặt hàng",
        html: getBodyHTMLEmail(dataSend),
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    result = `
    <div style="background: teal; padding: 30px 0">
        <div style="background: white; width: 700px; margin: 0 auto; padding: 10px 30px;">
            <div style="margin: 10px 0 0 0">
                <div style="color: green; font-weight: 600; font-size: 18px; text-align: center">XÁC NHẬN ĐƠN ĐẶT HÀNG</div>
            </div>
            <div style=" margin: 10px 0 0 0;">Xin chào <b
                    style="color: green; font-size : 25px">${dataSend.customerName}! </b>
            </div>
            <div>Bạn nhận được email này vì đã đặt hàng online trên Tiki.vn</div>
            <div>Thông tin đăt hàng:</div>
            <div>Mã đơn hàng :<b>${dataSend.orderCode}</b></div>
            <div>Tên sản phẩm:<b>${dataSend.productName}</b></div>
            <div>Số lượng: <b>${dataSend.qty}</b></div>
            <div>Tổng tiền: <b>${dataSend.total}</b></div>
            <div>Ngày đặt: <b>${dataSend.date}</b></div>
            <div>Địa chỉ: <b>${dataSend.address}</b></div>
            <div>Số điện thoại: <b>${dataSend.phone}</b></div>
            <div>Ghi chú: <b>${dataSend.note}</b></div>
            <div>Hình thức vận chuyển: <b>${dataSend.delivery}</b></div>
            <div>Hình thức thanh toán: <b>${dataSend.payment}</b></div>
            <div>Nếu thông tin trên là chính xác, vui lòng xác nhận đơn hàng.</div>
            <div style="background: green; border: 0px; padding: 10px 20px; width: 130px; margin: 15px auto;">
                <a href=${dataSend.redirectLink} style="color: white; text-decoration: none" target="_blank">
                    Xác nhận đơn hàng</a>
            </div>
            </p>
        </div>
    </div>
    `
    return result;
}

//send attachment
// let sendAttachment = async(dataSend) => {
//     return new Promise(async(resolve, reject) => {
//         try {

//             // create reusable transporter object using the default SMTP transport
//             let transporter = nodemailer.createTransport({
//                 host: "smtp.gmail.com",
//                 port: 587,
//                 secure: false, // true for 465, false for other ports
//                 auth: {
//                     user: process.env.EMAIL_APP, // generated ethereal user
//                     pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
//                 },
//             });

//             // send mail with defined transport object
//             let info = await transporter.sendMail({
//                 from: '"XuanHoang 👻" <xuanhoang997@gmail.com>', // sender address
//                 to: dataSend.email, // list of receivers
//                 subject: "Kết quả đặt lịch khám bệnh", // Subject line
//                 html: getBodyHTMLEmailRemedy(dataSend),
//                 attachments: [{ // encoded string as an attachment
//                     filename: `remedy-${dataSend.patientId}- ${new Date().getTime()}.png`,
//                     content: dataSend.imgBase64.split("base64, ")[1],
//                     encoding: 'base64',
//                 }, ]
//             });
//             resolve(true)

//         } catch (e) {
//             reject(e);
//         }
//     })
// }

// let getBodyHTMLEmailRemedy = (dataSend) => {
//     let result = ''
//     if (dataSend.language === 'vi') {
//         result = `
//         <h3>Xin chào ${dataSend.patientName}! </h3>
//         <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Bookingcare thành công</p>
//         <p>Thông tin đơn thuốc/hoá đơn được gửI trong file đính kèm</p>
 
//         <div>Xin chân thành cảm ơn</div>
//     `
//     }

//     return result;
// }


module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    // sendAttachment: sendAttachment
}