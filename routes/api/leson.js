const express = require('express');
const ctrl=require("../../controllers/leson")
 const { auth } = require("../../middlewares");
 const router = express.Router();
 //const cloudinary=require("../../helpers/cloudinary");
const uploader = require("../../helpers/multer");

// DB_host = mongodb+srv://Dima:BUVu1QfgRgpjb1RZ@cluster0.trx80dd.mongodb.net/db-contacts?retryWrites=true&w=majority

router.get('/' ,auth,ctrl.giveLesonAll)

router.get('/:linkId', auth, ctrl.getLesonById)

router.post('/',auth,ctrl.createLeson )

router.delete('/:linkId',auth, ctrl.delateLesonById)

router.put('/:linkId',auth, ctrl.updateLeson);
router.patch("/:linkId/position", auth, ctrl.updatePosition)
router.patch("/:linkId/positionDelete", auth, ctrl.updatePositionByIdDelete)
//router.post("/:linkId/uploadFile", auth, ctrl.downloadFile)
router.post("/:linkId/uploadFile",auth, uploader.single("file"),ctrl.downloadFile);
// ,auth
module.exports = router
