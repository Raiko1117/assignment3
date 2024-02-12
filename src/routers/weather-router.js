
const express = require('express')
const {getWeather} = require('../controller/weather-controller.js')

const router = express.Router()
router.get("/", getWeather)

module.exports = router;
