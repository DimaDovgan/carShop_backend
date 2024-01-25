const Car = require("../../models/car");

    const getAllcar= async (req, res, next) => {
      try {
        const paramsString=req.query.params;
        const paramsObject = JSON.parse(paramsString);
        const { page , limit = 10, brend, fuel, model, priceFrom,priceTo, region, yearFrom, yearTo,transmission,wheelDrive,color,engineVFrom,engineVTo } = paramsObject ;
        const skip = (page - 1) * limit;
        console.log(page,"--page--")
         console.log(brend,"req brend")
        const filter = {};
        if (brend && brend!=="") filter.brend = brend;
        if (fuel && fuel!=="") filter.fuel = fuel;
        if (model && model!=="") filter.model = model;
        if (region && region!=="") filter.region = region;
        if (transmission && transmission!=="") filter.transmission = transmission;
        if (wheelDrive && wheelDrive!=="") filter.wheelDrive = wheelDrive;
        if (color && color!=="") filter.color = color;
        
        if (priceFrom && priceFrom !== "" && priceTo && priceTo !== "") {
          filter.price = { $gte: parseInt(priceFrom), $lte: parseInt(priceTo) };
        } else if (priceFrom && priceFrom !== "") {
          filter.price = { $gte: parseInt(priceFrom) };
        } else if (priceTo && priceTo !== "") {
          filter.price = { $lte: parseInt(priceTo) };
        }

        if (engineVFrom && engineVFrom !== "" && engineVTo && engineVTo !== "") {
          filter.engineV = { $gte: parseInt(engineVFrom), $lte: parseInt(engineVTo) };
        } else if (engineVFrom && engineVFrom !== "") {
          filter.engineV = { $gte: parseInt(engineVFrom) };
        } else if (engineVTo && engineVTo !== "") {
          filter.engineV = { $lte: parseInt(engineVTo) };
        }

        if (yearFrom && yearFrom !== "" && yearTo && yearTo !== "") {
          filter.year = { $gte: parseInt(yearFrom), $lte: parseInt(yearTo) };
        } else if (yearFrom && yearFrom !== "") {
          filter.year = { $gte: parseInt(yearFrom) };
        } else if (yearTo && yearTo !== "") {
          filter.year = { $lte: parseInt(yearTo) };
        }
        console.log(filter,"filter")
        const totalCars = await Car.countDocuments(filter);
        const totalPages = Math.ceil(totalCars / limit);
    
        const list = await Car.find(filter).skip(skip).limit(limit);
        res.json({
          cars: list,
          currentPage: page,
          totalPages: totalPages
        });
      } catch (error) {
        next(error);
      }
      }
      module.exports = getAllcar;