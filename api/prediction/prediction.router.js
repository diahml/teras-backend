const { readPrediction } = require("./prediction.controller");
const router = require("express").Router();

//read prediction
router.get("/", readPrediction);

module.exports = router;