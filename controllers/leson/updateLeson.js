const Contact = require("../../models/leson");
const { createError } = require("../../helpers");
const { updateContactSchema } = require("../../validation/joiValidation");

const updateLeson = async (req, res, next) => {
  const { id: owner } = req.user;
  console.log(" updateLeson owner",owner);
  console.log("user",req.user);
  console.log("body",req.body);
  console.log("req.params.contactId",req.params.linkId)
  try {
    const {error}=updateContactSchema.validate(req.body)
    if (error || Object.keys(req.body).length === 0) {
      throw createError(400,"missing fields")
    }
  
    const leson = await Contact.findOneAndUpdate({ _id: req.params.linkId,owner:owner }, req.body, { new: true })
    
    if (!leson) {
      throw createError(404,"Not found")
    }
    res.json(leson);
   
    
  } catch (error) {
    next(error)
  }
}
module.exports = updateLeson;