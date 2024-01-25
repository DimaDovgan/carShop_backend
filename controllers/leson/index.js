const getAll = require("./getAll");
const getLesonById = require("./getLesonById");
const createLeson = require("./createLeson");
const delateLesonById = require("./delateLesonById");
const updateLeson = require("./updateLeson");
const updatePosition= require("./updatePosition");
const giveLesonAll=require("./giveLesonAll");
const updatePositionByIdDelete=require("./updatePositionByIdDelete")
const downloadFile=require("./downloadFile");

module.exports = {
    getAll,
    getLesonById,
    createLeson,
    delateLesonById,
    updateLeson,
    updatePosition,
    giveLesonAll,
    updatePositionByIdDelete,
    downloadFile
}