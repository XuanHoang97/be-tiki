import newService from '../services/newService';

const newController = {
    // get all news
    GetAllNews : async(req, res) => {
        try{
            let {id} = req.query;
            let news = await newService.getAllNews(id)
            return res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                news
            })
        }catch(e){
            console.log(e);
            if (!id) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                    news: []
                })
            }
        }
    },

    //create news
    CreateNews : async(req, res) => {
        try{
            let news = await newService.createNews(req.body, req.file);
            return res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                news: news
            })
        }catch(e){
            console.log(e);
        }
    },

    //edit news
    EditNews : async(req, res) => {
        try{
            let news = await newService.editNews(req.body, req.file);
            return res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                news: news
            })
        }catch(e){
            console.log(e);
        }
    },

    //delete news
    DeleteNews : async(req, res) => {
        try{
            if (!req.body.id) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }

            let news = await newService.deleteNews(req.body.id);
            return res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                news: news
            })
        }catch(e){
            console.log(e);
        }
    }
}

module.exports = newController
