var express = require('express');
var router = express.Router();
const histController = require("../../controllers/professor/histController");


router.get('/add-historique', histController.addHist);

module.exports = router;