const Leson = require("../../models/leson");
const {createError}=require("../../helpers")
const getLesonById = async (req, res, next) => {
  const { id: owner } = req.user;
  try {
    console.log("req.params",req.params)
    const id = req.params.linkId;
  const contact = await Leson.findOne({_id:id,owner},{createdAt:0,updatedAt:0});
    if (!contact) {
      throw createError(404,"Not found")
    }
    res.json( contact);
  } catch (err) {
    next(err);
}
}
module.exports=getLesonById
