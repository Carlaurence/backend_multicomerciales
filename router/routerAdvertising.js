const express = require('express');
const router = express.Router();
const controllerAdvertising = require('../controllers/ControllerAdvertising');
const tokenVerifier = require('../middleware/tokenVerifier');

router.post("/", tokenVerifier, controllerAdvertising.createAdvertising);
router.get("/", controllerAdvertising.getAllAdvertising);

module.exports = router;