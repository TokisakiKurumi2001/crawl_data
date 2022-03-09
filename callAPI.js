let request = require('request');
require('dotenv').config();
let url = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=${process.env.WEATHER_API_KEY}`

request(url, function (err, response, body) {
    if(err){
        console.log('error:', error);
    } else {
        let weather = JSON.parse(body);
        console.log(weather);
    }
  });