const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/4b1bc69a2d7ea58e96b2ba0c59bf5ee4/'+ encodeURIComponent(lat) +','+ encodeURIComponent(long);
    request({url, json:true}, (err, {body})=>{
        if(err){
            callback('Unable to connect to forecast services');
        }else if (body.error){
            callback('The given location is invalid');
        }else{
            callback(undefined, `It is currently ${body.currently.temperature} degrees outside with ${body.currently.precipProbability} probability of precipitation`)
        }
    })
}

module.exports = forecast;