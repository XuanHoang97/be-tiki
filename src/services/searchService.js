import db from "../models/index";
import { Op } from "sequelize";

//search user
const searchUser = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            let info = await db.User.findAll({
                where: {
                    [Op.or]: [

                        { username: { [Op.like]: `%${keyword}%` } },
                        { email: { [Op.like]: `%${keyword}%` } },
                        { phoneNumber: { [Op.like]: `%${keyword}%` } },
                        { address: { [Op.like]: `%${keyword}%` } },
                        { image: { [Op.like]: `%${keyword}%` } },
                    ]
                },
                attributes: {
                    exclude: ['password']
                },

                
                
                raw: false,
            })
            resolve(info)
        } catch (e) {
            reject(e);
        }
    })
}



module.exports = {
    searchUser
}