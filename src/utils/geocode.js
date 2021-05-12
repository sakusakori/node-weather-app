const request = require('request');
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic291bG1vcnRhbCIsImEiOiJja29qcTk4bW0wd29lMnBqemh4Z2YwZTVrIn0.bin75G0qz6z7IWGmVD4TMQ&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to internet', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location, Try another search', undefined);
    } else {
      const obj = body.features;
      const [log, lat] = obj[0].center;
      // console.log(obj[0].text);
      // console.log(lat, log);
      callback(undefined, { lat, log, location: obj[0].place_name });
    }
  });
};

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

module.exports = geocode;
