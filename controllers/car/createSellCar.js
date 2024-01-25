const Car = require("../../models/car");
const { createError } = require("../../helpers");
const {createSellCarSchema}= require("../../validation/joiValidation");
const { format } = require('date-fns');
const CarInfo =require('../../models/carInfo');
const normalizeCarBrand = (brand) => {
  const specialBrands = ["BMW", "Mercedes-Benz", "Land Rover", "Alfa Romeo", "AMC", "BYD", "DAF", "GMC", 
  "Great Wall", "JAC", "JCB", "MG", "MINI", "SEAT", "SsangYong", "Van Hool", "ГАЗ", "ЗАЗ", "ЗИЛ", "ВАЗ", "ИЖ","Volkswagen"]
  let isSpecialBrand = false;
  let reurnBrtend=null;
  specialBrands.forEach(specialBrand => {
      const specialBrandLower=specialBrand.toLowerCase();
        isSpecialBrand = specialBrandLower.includes(brand.toLowerCase());
        if(isSpecialBrand){
            reurnBrtend= specialBrand ;
        }
  });
  if(reurnBrtend){
      return reurnBrtend
  }
    return brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase();
};

const sampleData = {
  brand: "BMW",
  models: [
    {
      model: "3",
      generations: [
        {
          generation: "e90",
          fuels: [
            {
              fuel: "diesel",
              engineVs: [
                {
                  engineV: "2",
                  powers: [
                    { power: "177" },
                    // Додайте інші потужності, якщо потрібно
                  ]
                }
                // Додайте інші об'єми двигуна, якщо потрібно
              ]
            }
            // Додайте інші типи пального, якщо потрібно
          ]
        }
        // Додайте інші генерації, якщо потрібно
      ]
    }
    // Додайте інші моделі, якщо потрібно
  ]
};

const newModel = {
  model: "5",
  generations: [
    {
      generation: "e60",
      fuels: [
        {
          fuel: "petrol",
          engineVs: [
            {
              engineV: "3",
              powers: [
                { power: "200" },
                // Додайте інші потужності, якщо потрібно
              ]
            }
            // Додайте інші об'єми двигуна, якщо потрібно
          ]
        }
        // Додайте інші типи пального, якщо потрібно
      ]
    }
  ]
  }





const createSellCar=async (req, res, next) => {
  try {
    console.log("user id",req.user.id)
    const { error } = createSellCarSchema.validate(req.body)
    console.log(req.body,"--req.body--")
    if (error) {
      console.log(error);
      throw createError(400, "missing required name field")
    }
    const { id: owner } = req.user;
    console.log(owner);
    const list = await Car.find({ owner});
    console.log(list);
    // if (list.some(elem => { 
    //   let a=elem.title === req.body.title;
    //   return a;
    // })) {
    //   throw createError(400, `${req.body.title} іs already taken`)
    // }
    const currentDate = new Date();
    const formattedTime = format(currentDate, 'dd.MM.yyyy HH:mm');
    // const carInf= await CarInfo.create(sampleData);
    // console.log(carInf,"--carinf");

    CarInfo.findOne({ brand: "BMW" }, (err, brand) => {
      if (err) {
        console.error("Помилка пошуку бренду:", err);
      } else if (brand) {
        brand.models.push(newModel);
        brand.save((err, result) => {
          if (err) {
            console.error("Помилка збереження бренду з новою моделлю:", err);
          } else {
            console.log("Бренд з новою моделлю збережено успішно:", result);
          }
        });
      } else {
        console.log("Бренд не знайдено");
      }
    });
    const {year,price,engineV}=req.body



    const leson = await Car.create({...req.body,year:parseFloat(year),price:parseFloat(price),engineV:parseFloat(engineV),datepublication:`${formattedTime}`, owner});
    res.status(201).json(leson);
  } catch (error) {
    console.log(error)
    next(error);
  }
  
}
module.exports = createSellCar;