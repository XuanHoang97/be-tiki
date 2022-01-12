const multer = require('multer')
const path = require('path')

module.exports = multer({
    storage: multer.diskStorage({}),

    fileFilter: function (req, file, cb) {
        var ext = path.extname(file.originalname)
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return cb(new Error('Only .png and .jpg files are allowed!'), false)
        }
        cb(null, true)
    }  
})