const Leson = require("../../models/leson");
const { createError } = require("../../helpers");
//const { updateFavoriteSchema} = require("../../validation/joiValidation");
const updatePosition = async (req, res, next) => {
  console.log(req.user)
   const { _id:owner } = req.user;
  //try {
    const id = req.params.linkId;
    console.log("id",id,"owner",owner,"req.body",req.body);

    const leson = await Leson.findOne({_id:id,owner});
    if (!leson) {
      throw createError(404,"Not found")
    }
    let newTabPosition=[];
    if(leson.tabPosition.length>0){
      newTabPosition=leson.tabPosition;
    }
    newTabPosition.push(req.body);

    console.log("req.body",req.body,"newTabPosition",newTabPosition)
    const update = {tabPosition:newTabPosition};
     const positionUpdate = await Leson.findOneAndUpdate({_id:id,owner:owner}, update, {new:true })
    if (!positionUpdate) {
      throw createError(404,`Not found ${positionUpdate} `)
    }
   
  res.json(positionUpdate)
  
}
module.exports = updatePosition;