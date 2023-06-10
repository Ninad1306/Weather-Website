const request = require('postman-request');

geocode = (address, callback) => {
    const geoCodeUrl = 'http://api.positionstack.com/v1/forward?access_key=15dae9707f78795e033ac5553eecce05&query='+ address;

    request({url: geoCodeUrl, json: true},(error,response) => {
        const {latitude,longitude,label} = response.body.data[0];

        if(error){
            callback('Cannot access weather api.',undefined);
        }
        else if(response.body.length === 0){
            callback('Wrong input',undefined);
        }
        else{            
            callback(undefined,{
                latitude,
                longitude,
                label
            })
        }
    })
}

module.exports = geocode;