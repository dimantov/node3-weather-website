const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGltYW50b3YiLCJhIjoiY2p2M2IwajZuMDBhYzN5bnp2OWlzb29vNSJ9.risTrYK0c4R0yL3zJsajwg'
    request ({url: url, json:true}, (err,{body})=> {
        if(err){
            callback('Unable to connect to location services!', undefined);
        }else if(body.features.length === 0){
            callback('Unable to find location. Try another search', undefined);
        }else{
            callback(undefined, {
                longtitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;