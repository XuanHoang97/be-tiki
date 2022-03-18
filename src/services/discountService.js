import db from "../models/index";
const {format, zonedTimeToUtc} = require('date-fns-tz');

//today's date
const today =new Date();
const timeZone = 'Asia/Ho_Chi_Minh';
const timeInZone = zonedTimeToUtc(today, timeZone);
const currentDate = today.valueOf() + 7 * 60 * 60

// add discount
let addDiscount = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let discount = await db.Discount.create({
                ...data
            });
            resolve(discount);
        } catch (e) {
            reject(e);
        }
    });
};

// get discount
let getDiscount = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let discounts = '';
            if (id === 'ALL') {
                discounts = await db.Discount.findAll({})
            } 
            if(id && id !== 'ALL') {
                discounts = await db.Discount.findOne({
                    where: { id: id }
                });
            }
            resolve(discounts);
        } catch (error) {
            reject(error);
        }
    });
};

// add Discount User
let addDiscountUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let coupon = await db.Coupon.create({
                ...data
            });
            resolve(coupon);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    addDiscount,
    getDiscount,
    addDiscountUser
}