import db from "../models/index";
import { Op } from "sequelize";

//search all product
const search = (keyword, priceFrom, priceTo) => {
    return new Promise(async (resolve, reject) => {
        try {
            let info = '';
            if (keyword === '' || keyword === undefined || keyword === null) {
                return info
            } 
            else {
                info = await db.Product.findAll({
                    where: {
                        [Op.or]: [
                            {
                                name: { [Op.like]: `%${keyword}%` },
                            }
                        ]
                    }
                })

                if(info.length === 0) {
                    resolve({
                        errCode: 1,
                        errMessage: 'Không tìm thấy sản phẩm nào',
                    })
                }else{
                    // filter price
                    if(priceFrom && priceTo) {
                        info = info.filter(item => {
                            return item.price >= priceFrom && item.price <= priceTo
                        })
                    }else if(priceFrom) {
                        info = info.filter(item => {
                            if(item.price >= priceFrom) {
                                return item.price >= priceFrom
                            }else{
                                return item.price <= priceFrom
                            }
                        })
                    }else if(priceTo) {
                        info = info.filter(item => {
                            if(item.price >= priceTo) {
                                return item.price >= priceTo
                            }else{
                                return item.price <= priceTo
                            }
                        })
                    }

                    // sort asc or desc by price
                    if(priceFrom && priceTo) {
                        info = info.sort((a, b) => {
                            return a.price - b.price
                        })
                    }else if(priceFrom) {
                        info = info.sort((a, b) => {
                            return a.price - b.price
                        })
                    }else if(priceTo) {
                        info = info.sort((a, b) => {
                            return b.price - a.price
                        })
                    }

                    resolve(info)
                }
            }
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = {
    search
}