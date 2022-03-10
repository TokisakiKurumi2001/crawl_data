let request = require('request');
require('dotenv').config();
let lat = process.env.LATITUDE;
let lon = process.env.LONGITUDE;
let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${process.env.WEATHER_API_KEY}`

request(url, function (err, _, body) {
    if(err){
        console.log('error:', error);
    } else {
        let weather = JSON.parse(body);
        console.log(weather);
    }
});