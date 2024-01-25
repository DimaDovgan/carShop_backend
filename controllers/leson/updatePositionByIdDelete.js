const Leson = require("../../models/leson");
const { createError } = require("../../helpers");

const updatePositionByIdDelete = async (req, res, next) => {
  console.log(req.user)
   const { _id:owner } = req.user;
    const id = req.params.linkId;
    console.log("id",id,"owner",owner,"req.body",req.body);

    const leson = await Leson.findOne({_id:id,owner});
    if (!leson) {
      throw createError(404,"Not found")
    }
    console.log(leson);
    const timeLeson=leson.tabPosition;
    for (let i = 0; i < leson.tabPosition.length; i++) {
        if(leson.tabPosition[i].date==req.body.date && leson.tabPosition[i].time==req.body.time){
            timeLeson.splice(i,1);
            console.log("del on position",i )


        }
        
      }
      const update = {tabPosition:timeLeson};
     const positionUpdate = await Leson.findOneAndUpdate({_id:id,owner:owner}, update, {new:true })
    if (!positionUpdate) {
      throw createError(404,`Not found ${positionUpdate} `)
    }
    console.log("positionUpdate",positionUpdate);
  res.json(positionUpdate);
  
}
module.exports = updatePositionByIdDelete;