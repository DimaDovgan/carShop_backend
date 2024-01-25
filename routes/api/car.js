const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/car");
const {auth}=require("../../middlewares");
router.post('/createCar',auth, ctrl.createSellCar);
router.get('/getCar', ctrl.getAllcar);
router.get('/getCar/:id',ctrl.getCarById);



module.exports = router;