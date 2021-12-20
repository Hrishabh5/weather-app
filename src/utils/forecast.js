const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=d3b8236409ff9c32c242941566fcd5af&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.error) {
      callback("Unable to find the location!", undefined);
    } else {
      const str =
        body.current.weather_descriptions[0] +
        ". It is currently, " +
        body.current.temperature +
        " degrees out. The cloud cover is " +
        body.current.cloudcover +
        "% and the humidity is " +
        body.current.humidity +
        "%.";
      callback(undefined, str);
    }
  });
};

module.exports = forecast;
