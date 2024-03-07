
const multer = require("multer")
const storage = multer.diskStorage({
   destination: (req, file, cb) => { cb(null, 'upload'); },
   
   
   filename: (req, file, cb) => { 
      console.log(file)
      cb(null, file.originalname ) } });
      
   

const upload = multer({storage :storage,
   fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('Somente  ficheiros png, jpg aceitos!'));
      }
  }


})

module.exports = upload