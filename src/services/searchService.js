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
            if(keyword && keyword !== '' && keyword !== undefined && keyword !== null) {
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