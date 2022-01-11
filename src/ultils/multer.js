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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        //reject file
        cb({message: 'Unsupported file format'}, false)
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 },
    fileFilter: fileFilter
})