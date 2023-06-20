const request = require('postman-request');

forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3d12bd5ea348a5c947683ce1a6cc4903&query=' + lat + ',' + long + '&interval=1';

    request({url: url, json: true},(error,response) => {
        const {temperature,feelslike,precip,wind_speed,wind_dir,humidity,weather_descriptions,weather_icons} = response.body.current;
        const {localtime} = response.body.location

        if(error){
            callback('Cannot access weather api.',undefined);
        }
        else if(response.body.length === 0){
            callback('Wrong input',undefined);
        }
        else{            
            callback(undefined,{
                temperature,
                feelslike,
                precip,
                wind_speed,
                wind_dir,
                humidity,
                localtime,
                weather_descriptions,
                weather_icons,
            })
        }
    })
}

module.exports = forecast;