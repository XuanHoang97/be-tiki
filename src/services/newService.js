import db from "../models/index";
import { Op } from "sequelize";

// getAllNews
let getAllNews = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let news = '';
            if (id === 'ALL') {
                news = await db.New.findAll({
                })
            } 
            if(id && id !== 'ALL') {
                news = await db.New.findOne({
                    where: { id: id }
                });
            }
            resolve(news);
        } catch (error) {
            reject(error);
        }
    });
};

//createNews
let createNews = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let News = await db.New.create({
                name: data.name,
                image: data.image,
                description: data.description,
                content: data.content,
                status: data.status,
                category_id: data.category_id,
                author_id: data.author_id,
                view: data.view,
                hot: data.hot,

            });
            resolve(News);
        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    getAllNews,
    createNews
}