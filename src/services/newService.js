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
                productId: data.productId,
                category_id: data.category_id,
                author_id: data.author_id,
                date: data.date,
                view: data.view,
                hot: data.hot,
            });
            resolve(News);
        } catch (e) {
            reject(e);
        }
    })
}

//edit news
let editNews = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let news = await db.New.findOne({
                where: { id: data.id },
                raw: false
            });

            if(!news) {
                resolve ({
                    errCode: 1,
                    errMessage: 'News and events not found'
                })
            }else {
                news.name = data.name;
                news.description = data.description;
                news.content = data.content;
                news.status = data.status;
                news.productId = data.productId;
                news.category_id = data.category_id;
                news.author_id = data.author_id;
                news.date = data.date;
                if(data.image) {
                    news.image = data.image;
                }
                await news.save();
                resolve({
                    errCode: 0,
                    message: 'The News and event is updated'
                })
            }
        } catch (e) {   
            reject(e);
        }
    });
};

//delete news and events
let deleteNews = (NewsId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let foundNews = await db.New.findOne({
                where: { id: NewsId }
            })
    
            if (!foundNews) {
                resolve({
                    errCode: 2,
                    errMessage: `The News & event isn't exist`
                })
            }
    
            await db.New.destroy({
                where: { id: NewsId }
            });
    
            resolve({
                errCode: 0,
                message: `The news and events is deleted`,
            })
        } catch (e) {
            reject(e);
        } 
    })
}

module.exports = {
    getAllNews,
    createNews,
    editNews,
    deleteNews
}