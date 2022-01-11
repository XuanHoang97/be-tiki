import slideService from '../services/slideService';

const slideController = {
    //get all slide
    GetAllSlide : async(req, res) => {
        try{
            let {id} = req.query;
            let slides = await slideService.GetAllSlide(id)
            return res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                slides
            })
        }catch(e){
            console.log(e);
            if (!id) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                    slides: []
                })
            }
        }

    },

    //create slide
    CreateSlide : async(req, res) => {
        try {
            let info = await slideService.CreateSlide(req.body, req.file);
            return res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                info
            });
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },

    //edit slide
    EditSlide : async(req, res) => {
        try{
            let info = await slideService.EditSlide(req.body, req.file);
            return res.status(200).json(info);
        }catch(e){
            console.log(e);
        }
    },

    //delete slide
    DeleteSlide : async(req, res) => {
        try{
            if (!req.body.id) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
    
            let slide = await slideService.DeleteSlide(req.body.id);
            return res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                slide
            })
        }catch(e){
            console.log(e);
        }
    },

    //get all Special category
    GetAllSpecialCategory : async(req, res) => {
        try{
            let specialCategories = await slideService.GetAllSpecialCategory(req.query.id);
            return res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                specialCategories
            })
        }catch(e){
            console.log(e);
        }
    },

    //create Special category
    CreateSpecialCategory : async(req, res) => {
        try {
            let info = await slideService.CreateSpecialCategory(req.body, req.file);
            return res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                info
            });
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },

    //edit Special category
    EditSpecialCategory : async(req, res) => {
        try{
            let info = await slideService.EditSpecialCategory(req.body, req.file);
            return res.status(200).json(info);
        }catch(e){
            console.log(e);
        }
    },

    //delete Special category
    DeleteSpecialCategory : async(req, res) => {
        try{
            if (!req.body.id) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
    
            let specialCategory = await slideService.DeleteSpecialCategory(req.body.id);
            return res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                specialCategory
            })
        }catch(e){
            console.log(e);
        }
    }



}
module.exports = slideController