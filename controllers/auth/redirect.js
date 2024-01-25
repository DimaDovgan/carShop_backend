const queryString= require('querystring');
const axios = require("axios");
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
//const { categories } = require('../../services');
// const { SECRET_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL, FRONTEND_URL } = process.env;

const googleRedirect = async (req, res) => {
    console.log("this is google redirect !!!!!!")
   const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  console.log("params",urlParams["?code"]);

    // const {scope}  = urlParams;
    // console.log("code", scope)
       const code =urlParams["?code"]
     const tokenData = await axios({
               url: "https://oauth2.googleapis.com/token",
      method: "post",
     data: {
         client_id: process.env.GOOGLE_CLIENT_ID,
         client_secret: process.env.GOOGLE_CLIENT_SECRET,
         redirect_uri: `${process.env.BASE_URL}/api/users/google-redirect`,
        grant_type: "authorization_code",
         code,
       },
     });

  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
        Authorization: `Bearer ${tokenData.data.access_token}`
    }
  });
     const {email, picture} = userData.data;
 console.log("email",email,"picture",picture);
    let user = await User.findOne({email});
  console.log("user redirect",user)
  if (!user) {
    console.log("no registrate")
    // user = await User.create({email, avatarURL, verificationToken: null, verify: true})
    //await categories.defaultUserCategories(user._id);  
  }
  
  const payload = {
    id: user._id
  }
  const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '12h'});
  await user.updateOne({token});
  
  const {createdAt} = user;
  return res.redirect(`${process.env.FRONTEND_URL}login?token=${token}&email=${email}&createdAt=${createdAt}&avatarURL=${picture}`);
  //return res.redirect("https://www.youtube.com/")
};

module.exports = googleRedirect;