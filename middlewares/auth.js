const {createError}=require("../helpers")
const jwt = require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();
const { SECRET_KEY } = process.env;
const User=require("../models/user")
const auth = async (req, res, next) => {
    const { authorization="" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    console.log(token,"----token---")
    console.log("authorization",authorization);
    if (bearer !== "Bearer") {
        console.log("no bear",authorization)
        next(createError(401,"Not Unauthorized no bear "))
    }
        try {

            const  {id}  = jwt.verify(token,SECRET_KEY);
            console.log("id",id)
            const user = await User.findById(id);
            console.log("user",user)
            if (!user || !user.token) {
                next(createError(401,"Not Unauthorized !user.token"))
            }
            req.user = user;
            console.log("SECRET_KEY",SECRET_KEY)
            console.log("auth ok");
            next();
        } catch (error) {
            console.log(error.message,"--error.message---")
            next(createError(401, error.message))
            
        }

    
    
}

module.exports = auth;