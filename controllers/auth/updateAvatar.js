const path = require("path");
const  Jimp = require('jimp');
const fs = require("fs/promises");
const { createError } = require("../../helpers");
const { basedir } = global;
const User = require("../../models/user");
console.log(basedir)
const avatarDir=path.join("public","avatars")
const updateAvatar = async (req, res,next) => {
    try {
        const { _id } = req.user;
        console.log("file",req.file)
        const { path: tmpPath, originalname } = req.file;
        const [extension] = originalname.split(".").reverse();
        
        console.log("tempPath", tmpPath);
        console.log("originalname", originalname);
        const newName = `${_id}.${extension}`;
    const uploadPath = path.join(avatarDir, newName);
    // await fs.rename(tmpPath, uploadPath);
        Jimp.read(tmpPath, async(err, avararImg) => {
            
  if (err) throw err;
            await avararImg.resize(250, 250).write(uploadPath);
            
        });
        await fs.unlink(tmpPath);
        const avatarURL = path.join("avatars", newName);
        console.log("user",User)
        const result = await User.findByIdAndUpdate(_id, { avatarUrl: avatarURL });
        if (!result) {
            throw createError(401, "Not authorized");
        }
    res.json({
        avatarURL,
    })
        
    } catch (error) {
        await fs.unlink(req.file.path);
        next(error);
    }
    
}
module.exports = updateAvatar;