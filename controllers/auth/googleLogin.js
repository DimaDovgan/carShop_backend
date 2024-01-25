const { createError } = require("../../helpers");
//const bcrypt=require("bcryptjs")
const User=require("../../models/user")
///const { loginAuthSchema } = require("../../validation/joiValidation");
const jwt = require("jsonwebtoken");
// const dotenv=require("dotenv");
// dotenv.config();
// const {SECRET_KEY}=process.env
const googleLogin = async (req, res,next) => {
  console.log("google login ",req.body)
     try {
    // console.log(req.body)
    // const {error}=loginAuthSchema.validate(req.body)
    // if (error) {
    //   throw createError(400,"Ошибка от Joi или другой библиотеки валидации")
    //     }
        const { email,tokenbody} = req.body;

      const auth = await User.findOne({ email: email });
      if (!auth) {
        throw createError(401, `${email} wrong`);
        }
        if (tokenbody!==auth.token) {
            throw createError(401, "google auth wrong");
      }
      
        const payload = {
            id:auth._id
        }
        const token= jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"1h"})
        await User.findByIdAndUpdate(auth._id,{token})  
      res.json({
            token:token,
            user: { email: auth.email, subscription: auth.subscription }
        });
    } catch (error) {
      console.log("error")
   next(error);
  }
  
}
module.exports = googleLogin;