const Car=  require("../../models/car");
const createError =require("../../helpers/createError");
const User = require("../../models/user");
// const addFavoriteCar = async (req, res,next) => {
//     //   console.log("loginrouth",req.body)
//     const carId = req.params.car;
//     const { _id } = req.user;
//     console.log(carId,"--owner",_id,"--_id ")
    
//         try {
    
//           const car = await Car.findOne({ _id: carId });
//           const user=await User.findOne({ _id: _id });
//           console.log(user,"User1")
//           console.log(car,"auth1")
//           if (!car) {
//             throw createError(401, `${car} wrong`);
//             }

//             if (!user.favoriteCar.includes(carId)) {
//                 // Додайте carId до масиву favoriteCar, якщо його там немає
//                 user.favoriteCar.push(carId);
//                 await user.save(); // Збережіть зміни в базі даних
//               }

        
//           res.json({mess:"Add"});
//         } catch (error) {
//           console.log("error")
//        next(error);
//       }
      
//     }
const addFavoriteCar = async (req, res, next) => {
    const carId = req.params.car;
    const { _id } = req.user;
  
    try {
      const car = await Car.findOne({ _id: carId });
      const user = await User.findOne({ _id: _id });
  
      if (!car) {
        throw createError(401, "Invalid car");
      }
  
      if (!user) {
        throw createError(401, "Invalid user");
      }
  
      // Перевірте, чи carId вже є у масиві favoriteCar
      const carIndex = user.favoriteCar.findIndex((favoriteCar) => favoriteCar._id.toString() === carId);
      console.log(carIndex,"carIndex--")
  
      if (carIndex !== -1) {
        // Якщо carId вже є у масиві, видаліть його
        user.favoriteCar = user.favoriteCar.filter((favoriteCar) => favoriteCar._id.toString() !== carId);
      } else {
        // Якщо carId не є у масиві, додайте його
        user.favoriteCar.push({
          _id: car._id,
          brend: car.brend,
          model: car.model,
          year: car.year,
          generation: car.generation,
          engineV: car.engineV,
          power: car.power,
          fuel: car.fuel,
          transmission: car.transmission,
          wheelDrive: car.wheelDrive,
          description: car.description,
          color: car.color,
          region: car.region,
          city: car.city,
          datepublication: car.datepublication,
          imagesList: car.imagesList,
          price: car.price,
        });
      }
  
      // Збережіть зміни в базі даних
      await user.save();
  
      res.json({ favoriteCar: user.favoriteCar });
    } catch (error) {
      next(error);
    }
  };
    module.exports = addFavoriteCar;