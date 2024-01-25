const multer = require('multer');
const path = require("path");
const {basedir} = global;
console.log("basedir 1",basedir);
const avatarDir=path.join("public","avatars")
//const avatarDir=path.join("tmp")
const multerConfig = multer.diskStorage({
  destination: avatarDir,
    filename: (req, file, cb) => {
       
    cb(null, file.originalname);
  }
})
const upload = multer({
    storage: multerConfig,
});
module.exports = upload;