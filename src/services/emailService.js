require('dotenv').config();
import nodemailer from 'nodemailer';

// send verify email
// let sendSimpleEmail = async(dataSend) => {
//     let transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false,
//         auth: {
//             user: process.env.EMAIL_APP, 
//             pass: process.env.EMAIL_APP_PASSWORD,
//         },
//     });

//     let info = await transporter.sendMail({
//         from: '"XuanHoang 👻" <xuanhoang997@gmail.com>',
//         to: dataSend.receiveEmail,
//         subject: "Thông tin đặt hàng",
//         html: getBodyHTMLEmail(dataSend),
//     });
// }

// let getBodyHTMLEmail = (dataSend) => {
//     let result = ''
//     result = `
//     <div style="background: teal; padding: 30px 0">
//         <div style="background: white; width: 700px; margin: 0 auto; padding: 10px 30px;">
//             <div style="margin: 10px 0 0 0">
//                 <div style="color: green; font-weight: 600; font-size: 18px; text-align: center">XÁC NHẬN ĐƠN ĐẶT HÀNG</div>
//             </div>
//             <div style=" margin: 10px 0 0 0;">Xin chào <b
//                     style="color: green; font-size : 25px">${dataSend.customerName}! </b>
//             </div>
//             <div>Bạn nhận được email này vì đã đặt hàng online trên Tiki.vn</div>
//             <div>Thông tin đăt hàng:</div>
//             <div>Mã đơn hàng :<b>${dataSend.orderCode}</b></div>
//             <div>Tên sản phẩm:<b>${dataSend.productName}</b></div>
//             <div>Số lượng: <b>${dataSend.qty}</b></div>
//             <div>Tổng tiền: <b>${dataSend.total}</b></div>
//             <div>Ngày đặt: <b>${dataSend.date}</b></div>
//             <div>Địa chỉ: <b>${dataSend.address}</b></div>
//             <div>Số điện thoại: <b>${dataSend.phone}</b></div>
//             <div>Ghi chú: <b>${dataSend.note}</b></div>
//             <div>Hình thức vận chuyển: <b>${dataSend.delivery}</b></div>
//             <div>Hình thức thanh toán: <b>${dataSend.payment}</b></div>
//             <div>Nếu thông tin trên là chính xác, vui lòng xác nhận đơn hàng.</div>
//             <div style="background: green; border: 0px; padding: 10px 20px; width: 130px; margin: 15px auto;">
//                 <a href=${dataSend.redirectLink} style="color: white; text-decoration: none" target="_blank">
//                     Xác nhận đơn hàng</a>
//             </div>
//             </p>
//         </div>
//     </div>
//     `
//     return result;
// }

// send bill
let sendBill = async(dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP, 
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: '"XuanHoang 👻" <xuanhoang997@gmail.com>',
        to: dataSend.receiveEmail,
        subject: "Hoá đơn mua hàng",
        html: getBodyHTMLBill(dataSend),
    });
}


let getBodyHTMLBill = (dataSend) => {
    let result = ''
    result = `
    <div style="margin:0;padding:0;width:100%;background-color:#f3f3f3">
    <span style="display:none;font-size:0;max-height:0;width:0;line-height:0"></span>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tbody>
            <tr>
                <td align="center" style="min-width:512px;background-color:#f3f3f3">
                    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr>
                                <td>
                                    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                                        <tbody>
                                            <tr>
                                                <td align="center">
                                                    <table align="center" width="512" border="0" cellspacing="0"
                                                        cellpadding="0">
                                                        <tbody>
                                                            <tr>
                                                                <td align="center"
                                                                    style="padding-top:10px;padding-bottom:15px">
                                                                    <table width="95%" border="0" align="center"
                                                                        cellpadding="0" cellspacing="0">
                                                                        <tbody>
                                                                            <tr>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td align="center" style="background-color:white">
                                                                    <table width="100%" border="0" align="center"
                                                                        cellpadding="0" cellspacing="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td
                                                                                    style="border-top:3px solid #3b78ff;border-radius:4px 4px 0 0">
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td align="center"
                                                                    style="background-color:#fdfdfe;padding-top:15px;padding-bottom:15px">
                                                                    <table width="90%" border="0" align="center"
                                                                        cellpadding="0" cellspacing="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="left" width="46">
                                                                                    <a href="#"
                                                                                        data-saferedirecturl="https://www.google.com/url?q=https://www.momo.vn/&amp;source=gmail&amp;ust=1649122484744000&amp;usg=AOvVaw35OwdqYG5fdMbfBjnWEvwv"><img
                                                                                            src="https://vcdn.tikicdn.com/ts/seller/ee/fa/a0/98f3f134f85cff2c6972c31777629aa0.png"
                                                                                            width="35" height="35"
                                                                                            style="display:block;border:0;font-size:20px;font-weight:bold;font-family:sans-serif">
                                                                                    </a>
                                                                                </td>

                                                                                <td align="left">
                                                                                    <div
                                                                                        style="display:block;border:0;font-size:16px;font-weight:bold;font-family:sans-serif;color:#222222">
                                                                                        Tiki Ecommerce
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td align="center" style="background-color:#f5f5f6">
                                                                    <table width="100%" border="0" align="center"
                                                                        cellpadding="0" cellspacing="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td
                                                                                    style="border-top:1px solid #f5f5f6">
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center"
                                                                    style="background-color:white;padding-top:15px;padding-bottom:0">
                                                                    <table width="90%" border="0" align="center"
                                                                        cellpadding="0" cellspacing="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>
                                                                                    <h1
                                                                                        style="font-size:22px;line-height:28px;letter-spacing:-.20px;margin:10px 0 16px 0;font-family:Helvetica Neue,Arial,sans-serif;color:#3b78ff;text-align:left">
                                                                                        Hóa đơn mua hàng Tiki
                                                                                    </h1>
                                                                                </td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td>
                                                                                    <p
                                                                                        style="margin:0 0 15px 0;font-size:14px;font-family:Helvetica Neue,Arial,sans-serif;color:#3c4043;text-align:left;line-height:24px">
                                                                                        Chào <b> ${dataSend.customer} </b>,<br>
                                                                                        Cảm ơn bạn đã mua hàng của
                                                                                        Tikishop
                                                                                    </p>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td align="center"
                                                                    style="background-color:white;padding-top:15px;padding-bottom:10px">
                                                                    <table width="90%" border="0" align="center"
                                                                        cellpadding="0" cellspacing="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td
                                                                                    style="font-size:16px;font-family:Helvetica Neue,Arial,sans-serif;color:#969696;text-align:center">
                                                                                    Khoản thanh toán
                                                                                </td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td
                                                                                    style="padding-top:5px;font-size:28px;font-family:Helvetica Neue,Arial,sans-serif;color:#3c4043;text-align:center;line-height:1.2em;font-weight:500">
                                                                                    ${dataSend.total}
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td align="center"
                                                                    style="background-color:white;padding-top:10px;padding-bottom:10px">
                                                                    <table width="90%" border="0" align="center"
                                                                        cellpadding="0" cellspacing="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td
                                                                                    style="font-size:13px;font-family:Helvetica Neue,Arial,sans-serif;color:#969696;text-align:left;font-weight:bold;padding-bottom:5px">
                                                                                    THÔNG TIN HÓA ĐƠN
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style="text-align:left" width="70%">
                                                                                    <span
                                                                                        style="color:#8f8e94;font-size:13px"></span>
                                                                                </td>
                                                                                <td style="text-align:left"><span
                                                                                        style="color:#4d4d4d;font-size:13px"></span>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style="text-align:left" width="70%">
                                                                                    <span
                                                                                        style="color:#8f8e94;font-size:13px">
                                                                                        Khách hàng</span>
                                                                                </td>
                                                                                <td style="text-align:left"><span
                                                                                        style="color:#4d4d4d;font-size:13px">
                                                                                        <b>${dataSend.customer}</b></span>
                                                                                </td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td align="center"
                                                                                    style="background-color:white">
                                                                                    <table width="100%" border="0"
                                                                                        align="center" cellpadding="0"
                                                                                        cellspacing="0">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td
                                                                                                    style="border-top:1px solid #ececec">
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td align="center"
                                                                    style="background-color:white;padding-top:0;padding-bottom:20px">
                                                                    <table width="90%" border="0" align="center"
                                                                        cellpadding="0" cellspacing="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style="padding-top:5px;padding-bottom:10px;font-size:14px;font-family:Helvetica Neue,Arial,sans-serif;color:#3c4043;text-align:left;line-height:1.55em;vertical-align:top"
                                                                                    width="70%">
                                                                                    <div
                                                                                        style="color:#737373;margin:0px;font-size:12px;line-height:24px;font-weight:normal">
                                                                                        Dịch vụ</div>

                                                                                    <div
                                                                                        style="color:#3c4043;display:block;font-family:sans-serif;font-size:14px;font-weight:bold;line-height:24px;margin:0px;padding:0px;text-align:left;text-decoration:none;padding-right:5px">
                                                                                        Mua hàng
                                                                                    </div>
                                                                                </td>

                                                                                <td style="padding-top:5px;font-size:14px;font-family:Helvetica Neue,Arial,sans-serif;color:#3c4043;text-align:left;line-height:1.55em;vertical-align:top"
                                                                                    width="30%">

                                                                                    <div
                                                                                        style="color:#737373;margin:0px;font-size:12px;line-height:24px;font-weight:normal">
                                                                                        Hình thức thanh toán</div>

                                                                                    <div
                                                                                        style="color:#3c4043;display:block;font-family:sans-serif;font-size:14px;font-weight:normal;line-height:18px;margin:0px;padding:0px;text-align:left;text-decoration:none;padding-right:5px">
                                                                                        ${dataSend.payment}
                                                                                    </div>
                                                                                </td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td style="padding-top:5px;padding-bottom:10px;font-size:14px;font-family:Helvetica Neue,Arial,sans-serif;color:#3c4043;text-align:left;line-height:1.55em;vertical-align:top"
                                                                                    width="70%">

                                                                                    <div
                                                                                        style="color:#737373;margin:0px;font-size:12px;line-height:24px;font-weight:normal">
                                                                                        Thời gian</div>

                                                                                    <div
                                                                                        style="color:#3c4043;display:block;font-family:sans-serif;font-size:14px;font-weight:normal;line-height:18px;margin:0px;padding:0px;text-align:left;text-decoration:none;padding-right:5px">
                                                                                        ${dataSend.datePayment}
                                                                                    </div>
                                                                                </td>

                                                                                <td style="padding-top:5px;padding-bottom:10px;font-size:14px;font-family:Helvetica Neue,Arial,sans-serif;color:#3c4043;text-align:left;line-height:1.55em;vertical-align:top"
                                                                                    width="30%">
                                                                                    <div
                                                                                        style="color:#737373;margin:0px;font-size:12px;line-height:24px;font-weight:normal">
                                                                                        Mã hoá đơn : </div>

                                                                                    <div
                                                                                        style="color:#3c4043;display:block;font-family:sans-serif;font-size:14px;font-weight:normal;line-height:18px;margin:0px;padding:0px;text-align:left;text-decoration:none;padding-right:5px">
                                                                                        ${dataSend.billCode}
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td align="center"
                                                                    style="background-color:white;padding-top:10px;padding-bottom:10px">
                                                                    <table width="90%" border="0" align="center"
                                                                        cellpadding="0" cellspacing="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td
                                                                                    style="font-size:13px;font-family:Helvetica Neue,Arial,sans-serif;color:#969696;text-align:left;font-weight:bold;padding-bottom:5px">
                                                                                    CHI TIẾT HOÁ ĐƠN</td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td align="center"
                                                                                    style="background-color:white">
                                                                                    <table width="100%" border="0"
                                                                                        align="center" cellpadding="0"
                                                                                        cellspacing="0">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td
                                                                                                    style="border-top:1px solid #ececec">
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td align="center"
                                                                    style="background-color:white;padding-top:0;padding-bottom:20px">
                                                                    <table width="90%" border="0" align="center"
                                                                        cellpadding="0" cellspacing="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style="padding-top:5px;padding-bottom:5px;font-size:14px;font-family:Helvetica Neue,Arial,sans-serif;color:#3c4043;text-align:left;line-height:1.55em"
                                                                                    width="70%">
                                                                                    <div
                                                                                        style="color:#3c4043;margin:0px;font-size:12px;line-height:22px;font-weight:normal;font-size:15px;padding-right:10px">
                                                                                        Sản phẩm
                                                                                    </div>
                                                                                </td>
                                                                                <td style="padding-top:5px;padding-bottom:5px;font-size:14px;font-family:Helvetica Neue,Arial,sans-serif;color:#3c4043;text-align:left;line-height:1.55em"
                                                                                    width="30%">
                                                                                    <div
                                                                                        style="color:#3c4043;margin:0px;font-size:12px;line-height:22px;font-weight:normal;font-size:15px">
                                                                                        ${dataSend.product}
                                                                                    </div>
                                                                                </td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td style="padding-top:5px;padding-bottom:5px;font-size:14px;font-family:Helvetica Neue,Arial,sans-serif;color:#3c4043;text-align:left;line-height:1.55em"
                                                                                    width="70%">
                                                                                    <div
                                                                                        style="color:#3c4043;margin:0px;font-size:12px;line-height:22px;font-weight:normal;font-size:15px;padding-right:10px">
                                                                                        Số lượng
                                                                                    </div>
                                                                                </td>
                                                                                <td style="padding-top:5px;padding-bottom:5px;font-size:14px;font-family:Helvetica Neue,Arial,sans-serif;color:#3c4043;text-align:left;line-height:1.55em"
                                                                                    width="30%">
                                                                                    <div
                                                                                        style="color:#3c4043;margin:0px;font-size:12px;line-height:22px;font-weight:normal;font-size:15px">
                                                                                        x ${dataSend.qty}
                                                                                    </div>
                                                                                </td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td style="padding-top:5px;padding-bottom:5px;font-size:14px;font-family:Helvetica Neue,Arial,sans-serif;color:#3c4043;text-align:left;line-height:1.55em"
                                                                                    width="70%">
                                                                                    <div
                                                                                        style="color:#3c4043;margin:0px;font-size:12px;line-height:22px;font-weight:normal;font-size:15px;padding-right:10px">
                                                                                        Số tiền
                                                                                    </div>
                                                                                </td>
                                                                                <td style="padding-top:5px;padding-bottom:5px;font-size:14px;font-family:Helvetica Neue,Arial,sans-serif;color:#3c4043;text-align:left;line-height:1.55em"
                                                                                    width="30%">
                                                                                    <div
                                                                                        style="color:#3c4043;margin:0px;font-size:12px;line-height:22px;font-weight:normal;font-size:15px">
                                                                                        ${dataSend.orderValue}
                                                                                    </div>
                                                                                </td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td style="padding-top:5px;padding-bottom:5px;font-size:14px;font-family:Helvetica Neue,Arial,sans-serif;color:#3c4043;text-align:left;line-height:1.55em"
                                                                                    width="70%">
                                                                                    <div
                                                                                        style="color:#3c4043;margin:0px;font-size:12px;line-height:20px;font-weight:normal;font-size:15px;padding-right:10px">
                                                                                        Thuế GTGT</div>
                                                                                </td>
                                                                                <td style="padding-top:5px;padding-bottom:5px;font-size:14px;font-family:Helvetica Neue,Arial,sans-serif;color:#3c4043;text-align:left;line-height:1.55em"
                                                                                    width="30%">
                                                                                    <div
                                                                                        style="color:#3c4043;margin:0px;font-size:12px;line-height:22px;font-weight:normal;font-size:15px">
                                                                                        0 đ</div>
                                                                                </td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td style="padding-top:5px;padding-bottom:5px;font-size:14px;font-family:Helvetica Neue,Arial,sans-serif;color:#3c4043;text-align:left;line-height:1.55em"
                                                                                    width="70%">
                                                                                    <div
                                                                                        style="color:#3c4043;margin:0px;font-size:12px;line-height:22px;font-weight:bold;font-size:15px;padding-right:10px">
                                                                                        Tổng cộng</div>
                                                                                </td>
                                                                                <td style="padding-top:5px;padding-bottom:5px;font-size:14px;font-family:Helvetica Neue,Arial,sans-serif;color:#3c4043;text-align:left;line-height:1.55em"
                                                                                    width="30%">
                                                                                    <div
                                                                                        style="color:#3c4043;margin:0px;font-size:12px;line-height:22px;font-weight:bold;font-size:15px">
                                                                                        ${dataSend.total}
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td align="center">
                                                    <table align="center" width="512" border="0" cellspacing="0"
                                                        cellpadding="0">
                                                        <tbody>
                                                            <tr>
                                                                <td align="center"
                                                                    style="background-color:#3b78ff;padding-top:10px;padding-bottom:10px">
                                                                    <table width="90%" border="0" align="center"
                                                                        cellpadding="0" cellspacing="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>
                                                                                    <table width="100%" border="0"
                                                                                        align="center" cellpadding="0"
                                                                                        cellspacing="0">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td
                                                                                                    style="padding:0;margin:0">
                                                                                                    <div
                                                                                                        style="color:#f3e6ec;display:block;font-family:sans-serif;font-size:13px;font-weight:700;line-height:19px;margin:0px;padding:0px">
                                                                                                        TikiShop
                                                                                                        2022
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</div>
    `
    return result;
}


module.exports = {
    // sendSimpleEmail: sendSimpleEmail,
    sendBill: sendBill,
}