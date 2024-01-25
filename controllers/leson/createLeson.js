const Leson = require("../../models/leson");
const { createError } = require("../../helpers");
const {addLesonSchema}= require("../../validation/joiValidation")
const createLeson=async (req, res, next) => {
  try {
    console.log("user id",req.user.id)
    const { error } = addLesonSchema.validate(req.body)
    if (error) {
      console.log(error);
      throw createError(400, "missing required name field")
    }
    const { id: owner } = req.user
    console.log(owner);
    const list = await Leson.find({ owner})
    if (list.some(elem => { 
      let a=elem.title === req.body.title;
      return a;
    })) {
      throw createError(400, `${req.body.title} іs already taken`)
    }

    const leson = await Leson.create({...req.body, owner});
    res.status(201).json(leson);
  } catch (error) {
    console.log(error)
    next(error);
  }
  
}
module.exports = createLeson;