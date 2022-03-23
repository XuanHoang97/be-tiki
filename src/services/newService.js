import db from "../models/index";
const { cloudinary } = require('../ultils/cloudinary');


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

// create News
let createNews = (data, file) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(file){
                const result = await cloudinary.uploader.upload(file.path);
                data.image = result.secure_url;
                data.cloudinary_id = result.public_id;
            }
            let newEvent = await db.New.create({
                ...data
            });

            // add notification
            let user = await db.User.findAll({
            });

            if(user){
                // send all user
                user.forEach(async (item) => {
                    await db.Notify.create({
                        userId: item.id,
                        title: data.name,
                        description: data.description,
                        status: 'N1',
                        image : data.image,
                        type: 'ACTIVITY',
                        date: new Date().valueOf() + 7 * 60 * 60,
                    })
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Thêm thành công',
                    newEvent
                })
            }
            console.log('newEvent', user.id);

            resolve(newEvent);
        } catch (e) {
            reject(e);
        }
    })
}

//edit news
let editNews = (data, file) => {
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
            }
            
            if(file){
                const result = await cloudinary.uploader.upload(file.path);
                data.image = result.secure_url;
                data.cloudinary_id = result.public_id;
            }

            // else {
                news.name = data.name;
                news.description = data.description;
                news.category_id = data.category_id;
                news.productId = data.productId;
                news.author_id = data.author_id;
                news.date = data.date;
                news.image = data.image;
                news.cloudinary_id = data.cloudinary_id;

                await news.save({
                    ...data
                });
                resolve({
                    errCode: 0,
                    message: 'The News and event is updated'
                })
            // }
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