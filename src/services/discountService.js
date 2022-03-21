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
                discountCode: 'DC' + Math.floor(Math.random() * 1000000),
                type: data.type,
                info: data.info,
                discount: data.discount,
                Max: data.Max,
                Used: 0,
                discountStart: data.discountStart,
                discountEnd: data.discountEnd,
                applyTo: data.applyTo,
                creator: data.creator,
                status: 'active',
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

            // update number discount used
            let discount = await db.Discount.findOne({
                where: { 
                    id: data.discountId,
                    discountCode: data.discountCode
                }
            });
            discount.Used += 1;
            await discount.save();

            resolve(coupon);
        } catch (e) {
            reject(e);
        }
    });
};

// get Discount User
let getDiscountUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let coupons = await db.Coupon.findAll({
                where: { userId: userId }
            });
            resolve(coupons);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    addDiscount,
    getDiscount,
    addDiscountUser,
    getDiscountUser
}