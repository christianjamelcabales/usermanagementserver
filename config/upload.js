//for image upload

const path =  require('path')
const multer = require('multer')
const shortid = require('shortid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../public/uploads');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueFileName = `${shortid.generate()}${path.extname(file.originalname)}`;
    cb(null, uniqueFileName);
  }
})

const upload = multer({ storage: storage })
const fn = storage.filename

module.exports = upload
