import db from "../models/index";
const { cloudinary } = require('../ultils/cloudinary');

// upload file
let uploadFile = (data, files) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!files){
                resolve({
                    errCode: 1,
                    errMessage: 'The file is not exist'
                })
            }else{
                let result = await Promise.all(files.map(async (file) => {
                    const result = await cloudinary.uploader.upload(file.path);
                    const imgDesc= await db.Image.create({
                        ...data,
                        images: result.url,
                        cloudinary_id: result.public_id
                    });
                    imgDesc.save();
                    return result;
                }));
                console.log('result',result);
                resolve({
                    errCode: 0,
                    message: 'The image description is created',
                })
            }
        } catch (e) {
            reject(e);
        }
    })
};

module.exports = {
    uploadFile
}
