
const { model, Schema } = require("mongoose");
const userShema = new Schema({
  name:{
    type:String,
    require:true,
  },
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  favoriteCar:
  {
    type: Array,
    required: [true, 'Email is required'],
    default: [],
  },

  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"  
  },
  avatarUrl:{
    type: String,
    required:true,
},
  token: {
    type: String,
    default: null,
  },
},{versionKey:false,timestamps:true})
const User = model("user", userShema);
module.exports =User;