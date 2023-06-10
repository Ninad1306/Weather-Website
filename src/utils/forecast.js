const request = require('postman-request');

forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3d12bd5ea348a5c947683ce1a6cc4903&query=' + lat + ',' + long;

    request({url: url, json: true},(error,response) => {
        const {temperature,feelslike} = response.body.current;

        if(error){
            callback('Cannot access weather api.',undefined);
        }
        else if(response.body.length === 0){
            callback('Wrong input',undefined);
        }
        else{            
            callback(undefined,{
                temperature,
                feelslike
            })
        }
    })
}

module.exports = forecast;