import uploadFileService from '../services/uploadFileService';

const uploadFileController = {

    // upload file
    uploadFile : async(req, res) => {
        try {
            let response = await uploadFileService.uploadFile(req.body, req.files);
            return res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                response
            });

        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },

}
module.exports = uploadFileController