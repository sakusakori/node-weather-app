const request = require('request');
const forecast = (lat, log, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ab1367674f73f6ada72ac089253a3d13&query=${log},${lat}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('1Unable to connect to internet', undefined);
    } else if (body.error) {
      callback('1Unable to find location, Try another search', undefined);
    } else {
      // console.log(response.body);
      const obj = body.current;
      console.log('Name is: ', body.location.name);
      callback(
        undefined,
        `It is currently ${obj.temperature} degrees out. There is a ${obj.precip} % chance of rain today`
      );
    }
  });
};
module.exports = forecast;
