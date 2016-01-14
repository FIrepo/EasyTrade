'use strict';

let multer = require('multer'),
    storage = multer.diskStorage({
        destination: 'public/images',
        filename: function (req, file, cb) {
            var date = Date.now();
            req.body.image = date + file.originalname;
            cb(null, date + file.originalname);
        }
    });

var uploadFile = multer({storage: storage});

module.exports = uploadFile;