const multer = require('multer')
const path = require('path')

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '/uploads'))
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     },
//     fileFilter: function (req, file, cb) {
//         var ext = path.extname(file.originalname)
//         if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
//             return cb(new Error('Only .png and .jpg files are allowed!'), false)
//         }
//         cb(null, true)
//     }
// })

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