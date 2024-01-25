const {  model, Schema } = require("mongoose");
const lesonShema = new Schema({
  brend: {
      type: String,
      required: [true, 'no brend'],
    },
    city:{
      type: String,
      required: [true, 'no city'],
    },
    region:{
      type: String,
      required: [true, 'no region'],
    },
    color:{
      type: String,
      required: [true, 'no color'],
    },
    description:{
      type: String,
      required: [true, 'no description'],
    },
    fuel:{
      type: String,
      required: [true, 'no fuel'],
    },
    imagesList:{
      type: Array,
      required: [true, 'no imagesList'],
    },
    model: {
      type: String,
      required: [true, 'no brend'],
    },
    datepublication:{
        type: String,
      required: [true, 'no date public'],
    },
    transmission:{
      type: String,
      required: [true, 'no transmission'],
    },
    wheelDrive:{
      type: String,
      required: [true, 'nowhellDrive'],
    },
    year:{
        type: Number,
      required: [true, 'no year'],
    },
    generation:{
        type: String,
        required: [true, 'no generation'],
    },
    engineV:{ 
        type: Number,
        required: [true, 'no engineV'],
    },
    power:{
        type: String,
        required: [true, 'no pover'],
    },
    price:{
      type: Number,
      required: [true, 'no pover'],
  },
    owner:{
    type:Schema.Types.ObjectId,
    ref:"users",
    }
},{versionKey:false,timestamps:true})
const Car = model("Car", lesonShema);
module.exports = Car;