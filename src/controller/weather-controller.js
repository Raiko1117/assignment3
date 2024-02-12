const Weather = require("../models/Weather.js");
const https = require("https");

exports.getWeather = async (req, res) => {
  const query = req.query.city;
  const apiKey = "2cfe730f0d4e1da90e9ab48860bd6122";
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;

  https.get(url, function (response) {
    let rawData = "";
    let weatherData,
      error = null;

    response.on("data", function (chunk) {
      rawData += chunk;
    });

    response.on("end", async function () {
      try {
        weatherData = JSON.parse(rawData);
        console.log(weatherData);

        const newWeatherData = new Weather({
          city: query,
          temperature: weatherData.main.temp,
          weatherDescription: weatherData.weather[0].description,
          latitude: weatherData.coord.lat,
          longitude: weatherData.coord.lon,
          feelsLike: weatherData.main.feels_like,
          humidity: weatherData.main.humidity,
          pressure: weatherData.main.pressure,
          windSpeed: weatherData.wind.speed,
          icon: weatherData.weather[0].icon,
        });
        await newWeatherData.save();

        const weatherFromDB = await Weather.findOne().sort({ createdAt: -1 });

        // Отправка данных на клиент
        res.render("index", { weatherFromDB, error });
      } catch (err) {
        error = "Error, Please try again";
        res.render("index", { weatherFromDB: null, error });
      }
    });
  });
};
