const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'dd-com',
  api_key: '464285452288769',
  api_secret: '7-2E6OH5JWLWjcKWrSHqNUj-lJ4',
  
});



module.exports = cloudinary;