const Car = require("../../models/car");
const getCarById= async (req, res, next) => {
    try {
      //const paramsString=req.query.params;
    //   const paramsObject = JSON.parse(paramsString);
      const id =req.params.id;
      console.log(id,"id--")
  
      const car = await  Car.findOne({ _id: id})
      res.json(car);
    } catch (error) {
      next(error);
    }
    }
    module.exports = getCarById;