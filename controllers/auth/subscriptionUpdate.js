const { createError } = require("../../helpers");
const { updateSubscriptionShema } = require("../../validation/joiValidation");
const User=require('../../models/user')
const subscriptionUpdate = async (req, res,next) => {
    const { _id: id} = req.user;
  try {
    const {error}=updateSubscriptionShema.validate(req.body)
    if (error || Object.keys(req.body).length === 0) {
      throw createError(400,"missing field favorite")
    }
      const user = await User.findOneAndUpdate({ id }, req.body, { new: true })
      console.log("user",user)
      if (!user) {
        console.log("errror")
      throw createError(404,"Not found")
    }
    res.json(user)
    
  } catch (error) {
    next(error)
  }
  
}
module.exports = subscriptionUpdate