const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Модель для конкретної потужності двигуна
const PowerSchema = new Schema({
  power: { type: String, required: true }
});

// Модель для конкретного об'єму двигуна та його потужностей
const EngineVSchema = new Schema({
  engineV: { type: String, required: true },
  powers: [PowerSchema]
});

// Модель для конкретного типу пального та його об'ємів двигунів
const FuelSchema = new Schema({
  fuel: { type: String, required: true },
  engineVs: [EngineVSchema]
});

// Модель для конкретної генерації та її типів пального
const GenerationSchema = new Schema({
  generation: { type: String, required: true },
  fuels: [FuelSchema]
});

// Модель для конкретної моделі автомобіля та її генерацій
const CarModelSchema = new Schema({
  model: { type: String, required: true },
  generations: [GenerationSchema]
});

// Головна модель автомобілів
const CarBrandSchema = new Schema({
  brand: { type: String, required: true },
  models: [CarModelSchema]
});

// Створення моделі
const CarInfo = mongoose.model('CarInfo', CarBrandSchema);

// Експорт моделі для використання в інших частинах програми
module.exports = CarInfo;