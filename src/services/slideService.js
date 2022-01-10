import db from "../models/index";

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
let CreateSlide = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newSlide = await db.Slide.create({
                name: data.name,
                image: data.image,
                status: data.status,
                date: data.date,
                categoryId: data.categoryId,
            });
            resolve(newSlide);
        } catch (e) {
            reject(e);
        }
    })
}

//edit slide
let EditSlide = (data) => {
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
            }else {
                slide.name = data.name;
                slide.date = data.date;
                slide.status = data.status;
                slide.categoryId = data.categoryId;
                if(data.image) {
                    slide.image = data.image;
                }
                await slide.save();
                resolve({
                    errCode: 0,
                    message: 'The slide is updated'
                })
            }
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
let CreateSpecialCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newSpecialCategory = await db.SpecialCategory.create({
                name: data.name,
                image: data.image,
                date: data.date,
            });
            resolve(newSpecialCategory);
        } catch (e) {
            reject(e);
        }
    })
};

//edit special category
let EditSpecialCategory = (data) => {
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
            }else {
                specialCategory.name = data.name;
                specialCategory.date = data.date;
                specialCategory.categoryId = data.categoryId;
                if(data.image) {
                    specialCategory.image = data.image;
                }
                await specialCategory.save();
                resolve({
                    errCode: 0,
                    message: 'The special category is updated'
                })
            }
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