const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiaHJpc2hhYmhjb2RlcyIsImEiOiJja3d5aDIxYjIwOHBkMnJwendwdGgwMHZjIn0.-THoLv181FzzFSQk_ykfnw";

  // request({ url: url, json: true }, (error, response) => {   ******** WITHOUT SHORTHAND PROPERTY AND DESTRUCTURING

  request({ url, json: true }, (error, { body }) => {
    // WITH SHORTHAND PROPERTY AND DESTRUCTURING

    if (error) {
      callback("Unable to connect to location services!", undefined); // js will leave the argument undefined if dont pass any value in it but it's good to mention undefined
    } else if (body.message || body.features.length === 0) {
      callback("Unable to find the location!", undefined);
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
      });
    }
  });
};

module.exports = geocode;
