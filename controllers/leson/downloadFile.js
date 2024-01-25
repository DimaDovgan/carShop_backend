const Leson = require("../../models/leson");
const { createError } = require("../../helpers");
const cloudinary=require("../../helpers/cloudinary");
const fs = require('fs').promises;
const mv = require('mv');

const downloadFile = async (req, res, next) => {
   const { id: owner } = req.user;
   const id = req.params.linkId;
  
  try {
    const fileName=req.file.originalname.split(".");
    const formatFile=fileName[fileName.length-1];
    console.log(formatFile,"formatFile")
    console.log("req.file",req.file)
     const upload = await cloudinary.v2.uploader.upload(req.file.path,{use_filename :true, resource_type: "raw",format:formatFile });
  // return res.json({
  //   success: true,
  //   file: upload.secure_url,
  // });
  console.log("upload",upload);

    const leson = await Leson.findOne({_id:id,owner});
      if (!leson) {
        throw createError(404,"Not found")
      }
      //console.log(leson)
  let newListOFFiles=[];
    if(leson.lesonFilesList.length>0){
      newListOFFiles=leson.lesonFilesList;
    }
    newListOFFiles.push({url:upload.secure_url,title:req.file.originalname});
    //console.log("upload",upload,"newListOFFiles",newListOFFiles)
    const update = {lesonFilesList:newListOFFiles};
     const Update = await Leson.findOneAndUpdate({_id:id,owner:owner}, update, {new:true })
    if (!Update) {
      throw createError(404,`Not found ${Update} `)
    }
    console.log("Update leson",Update)
  res.json(Update)
  } catch (error) {
    console.log(error)
    next(error);
  }
    
}
module.exports = downloadFile ;