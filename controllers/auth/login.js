const { createError } = require("../../helpers");
const bcrypt=require("bcryptjs")
const User=require("../../models/user")
const { loginAuthSchema } = require("../../validation/joiValidation");
const jwt = require("jsonwebtoken");
// const dotenv=require("dotenv");
// dotenv.config();
// const {SECRET_KEY}=process.env
const login = async (req, res,next) => {
  console.log("loginrouth",req.body)
    try {
    console.log(req.body)
    const {error}=loginAuthSchema.validate(req.body)
    if (error) {
      throw createError(400,"Ошибка от Joi или другой библиотеки валидации")
        }
        const { email,password} = req.body;

      const auth = await User.findOne({ email: email });
      console.log(auth,"auth1")
      if (!auth) {
        throw createError(401, `${email} wrong`);
        }
        const comparePassword = await bcrypt.compare(password, auth.password);
        if (!comparePassword) {
            throw createError(401, "Email or password is wrong");
      }
      
        const payload = {
            id:auth._id
        }
        const token= jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"1h"})
        await User.findByIdAndUpdate(auth._id,{token})  
      res.json({
            token:token,
            user: { email: auth.email,avatarUrl:auth.avatarUrl,name: auth.name, subscription: auth.subscription ,favoriteCar:auth.favoriteCar}
        });
    } catch (error) {
      console.log("error")
   next(error);
  }
  
}
module.exports = login;