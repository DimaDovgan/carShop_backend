const { createError } = require("../../helpers");
// const bcrypt=require("bcryptjs")
const User=require("../../models/user")
// const dotenv=require("dotenv");
// dotenv.config();
// const {SECRET_KEY}=process.env
const getUser = async (req, res,next) => {
//   console.log("loginrouth",req.body)
const owner =req.params.owner;
console.log(owner,"--owner")

    try {

      const auth = await User.findOne({ _id: owner });
      console.log(auth,"auth1")
      if (!auth) {
        throw createError(401, `${email} wrong`);
        }
    
      res.json({
            user: { email: auth.email,avatarUrl:auth.avatarUrl,name: auth.name }
        });
    } catch (error) {
      console.log("error")
   next(error);
  }
  
}
module.exports = getUser;