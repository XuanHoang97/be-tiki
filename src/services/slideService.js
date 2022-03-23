import db from "../models/index";
const { cloudinary } = require('../ultils/cloudinary');

//get all slides
let GetAllSlide = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let slides = '';
            if (id === 'ALL') {
                slides = await db.Slide.findAll({
                })
            } 
            if(id && id !== 'ALL') {
                slides = await db.Slide.findOne({
                    where: { id: id }
                });
            }
            resolve(slides);
        } catch (error) {
            reject(error);
        }
    });
};

//create slide
let CreateSlide = (data, file) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(file){
                const result = await cloudinary.uploader.upload(file.path);
                data.image = result.secure_url;
                data.cloudinary_id = result.public_id;
            }
            let newSlide = await db.Slide.create({
                ...data
            });
            resolve(newSlide);
        } catch (e) {
            reject(e);
        }
    })
}

//edit slide
let EditSlide = (data, file) => {
    return new Promise(async (resolve, reject) => {
        try { 
            let slide = await db.Slide.findOne({
                where: { id: data.id },
                raw: false
            });

            if(!slide) {
                resolve ({
                    errCode: 1,
                    errMessage: 'Slide not found'
                })
            }

            if(file){
                const result = await cloudinary.uploader.upload(file.path);
                data.image = result.secure_url;
                data.cloudinary_id = result.public_id;
            }
            slide.name = data.name;
            slide.status = data.status;
            slide.image = data.image;
            slide.cloudinary_id = data.cloudinary_id;
            await slide.save(
                {...data }
            );
            resolve({
                errCode: 0,
                errMessage: 'The slide is updated'
            })            
        
        } catch (e) {   
            reject(e);
        }
    });
};

//delete slide
let DeleteSlide = (slideId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let foundSlide = await db.Slide.findOne({
                where: { id: slideId }
            })
    
            if (!foundSlide) {
                resolve({
                    errCode: 2,
                    errMessage: `The slide isn't exist`
                })
            }

            if(foundSlide.cloudinary_id) {
                await cloudinary.uploader.destroy(foundSlide.cloudinary_id);
            }
    
            await db.Slide.destroy({
                where: { id: slideId }
            });
    
            resolve({
                errCode: 0,
                message: `The slide is deleted`,
            })
        } catch (e) {
            reject(e);
        }
    })
};

//get all special category
let GetAllSpecialCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialCategory = '';
            if (id === 'ALL') {
                specialCategory = await db.SpecialCategory.findAll({
                })
            } 
            if(id && id !== 'ALL') {
                specialCategory = await db.SpecialCategory.findOne({
                    where: { id: id }
                });
            }
            resolve(specialCategory);
        } catch (error) {
            reject(error);
        }
    });
};

///create special category
let CreateSpecialCategory = (data, file) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(file){
                const result = await cloudinary.uploader.upload(file.path);
                data.image = result.secure_url;
                data.cloudinary_id = result.public_id;
            }

            let newSpecialCategory = await db.SpecialCategory.create({
                ...data
            });
            resolve(newSpecialCategory);
        } catch (e) {
            reject(e);
        }
    })
};

//edit special category
let EditSpecialCategory = (data, file) => {
    return new Promise(async (resolve, reject) => {
        try { 
            let specialCategory = await db.SpecialCategory.findOne({
                where: { id: data.id },
                raw: false
            });

            if(!specialCategory) {
                resolve ({
                    errCode: 1,
                    errMessage: 'SpecialCategory not found'
                })
            }

            if(file){
                const result = await cloudinary.uploader.upload(file.path);
                data.image = result.secure_url;
                data.cloudinary_id = result.public_id;
            }
            specialCategory.name = data.name;
            specialCategory.categoryId = data.categoryId;
            specialCategory.image = data.image;
            specialCategory.cloudinary_id = data.cloudinary_id;
            await specialCategory.save(
                {...data }
            );
            resolve({
                errCode: 0,
                errMessage: 'The special category is updated'
            })            

        } catch (e) {   
            reject(e);
        }
    });
};     

//delete special category
let DeleteSpecialCategory = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let foundItem = await db.SpecialCategory.findOne({
                where: { id: categoryId }
            })
    
            if (!foundItem) {
                resolve({
                    errCode: 2,
                    errMessage: `The special category isn't exist`
                })
            }
    
            await db.SpecialCategory.destroy({
                where: { id: categoryId }
            });
    
            resolve({
                errCode: 0,
                message: `The special category is deleted`,
            })
        } catch (e) {
            reject(e);
        }
    })
};




module.exports = {
    GetAllSlide,
    CreateSlide,
    EditSlide,
    DeleteSlide,
    GetAllSpecialCategory,
    CreateSpecialCategory,
    EditSpecialCategory,
    DeleteSpecialCategory
}