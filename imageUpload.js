const fs   = require('fs');
const multer = require('multer');
var type = '';
// Multer File upload settings
var DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    type = (JSON.stringify(req.headers.type)).replace(/['"]+/g, '');
    DIR = DIR+type;
    fs.existsSync(DIR) || fs.mkdirSync(DIR);
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    //const fileName = file.originalname.toLowerCase().split(' ').join('-');
    // var afterDot = (file.originalname).substr((file.originalname).indexOf('.'));
    // const fileName = Date.now()+afterDot;
    
    
    cb(null, fileName)
  }
});


module.exports = ({
     upload: multer({
        storage: storage,
        // limits: {
        //   fileSize: 1024 * 1024 * 5
        // },
        fileFilter: (req, file, cb) => {
          if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            DIR =  './public/';
            cb(null, true);
          } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
          }
        }
      })
})

