const {  model, Schema } = require("mongoose");
const lesonShema = new Schema({
  title: {
      type: String,
      required: [true, 'Set title for leson'],
    },
    teacher: {
      type: String,
    },
    // date: {
    //   type: String,
    // },
    // time: {
    //   type: String,
    // },
    tabPosition:{
      type:Array,
    },
    lesonLink: {
      type: String,
    },
    lesonFilesList:{
      type:Array,
    },
    owner:{
    type:Schema.Types.ObjectId,
    ref:"users",
    }
},{versionKey:false,timestamps:true})
const Leson = model("leson", lesonShema);
module.exports = Leson;