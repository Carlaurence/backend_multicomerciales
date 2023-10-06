const express = require("express");
const router = express.Router();//ESTE ELELEMNTO LLAMA AL TIPO DE PETICION [get, post, put, delete]
const controllerEngineManufacturer = require('../controllers/ControllerEngineManufacturer');//CONEXION AL /CONTROLLER
const tokenVerifier = require('../middleware/tokenVerifier');

router.post('/', tokenVerifier, controllerEngineManufacturer.createEngineManufacturer);
router.get('/', tokenVerifier, controllerEngineManufacturer.getAllEngineManufacturers);
router.get('/:id', tokenVerifier, controllerEngineManufacturer.getEngineManufacturerById);
router.delete('/:id', tokenVerifier, controllerEngineManufacturer.deleteEngineManufacturer);
router.put('/', tokenVerifier, controllerEngineManufacturer.updateEngineManufacturer);


module.exports = router;