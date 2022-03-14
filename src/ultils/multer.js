const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    
  })

  const fileFilter = (req, file, cb) => {
      if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, true)
      }else{
            cb({message:'Unsupported file format'}, false)
      }
  }

module.exports = multer({
    storage: storage,

    fileFilter: fileFilter 
})