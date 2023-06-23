const multer = require('multer');
const createHttpError = require('http-errors');

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename : (req, file, cb ) => {
        const name = Date.now() + Math.random()*159 + '.' + file.originalname.split('.').reverse()[0];
        cb(null, name )
    } 
});

const fileFilter = (req, file, cb) => {
    
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
        cb(createHttpError.BadRequest("only jpeg and png type images are allowed"));
    }
}

const upload = multer({
    storage : storage,
    limits : {
        fileSize : 1024*1024*1,
    },
    fileFilter : fileFilter
});

module.exports = upload;