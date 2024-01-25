const Leson = require("../../models/leson");
const { createError } = require("../../helpers");

const delateLesonById = async (req, res, next) => {
  const { id: owner } = req.user;
  
  try { 
      const delateContact = await Leson.findOneAndRemove({ _id: req.params.linkId ,owner});
    
    if (!delateContact) {
      throw createError(404,"Not found")
    }
    res.json({ message : "contact deleted" });

  } catch(error)
  {
    next(error)
  }
}
module.exports = delateLesonById;