// will contain most of the logic for fetching the data from each API endpoint

const request = require('request'); // require the request library
// use request to fetch IP address from JSON API

const fetchMyIP = function(callback) {
  
  // asynchronously return IP Address using an API
  // pass through the error to the callback if an error occurs when requesting the IP data
  // parse and extract the IP address using JSON and then pass that through to the callback (as the second argument) if there is no error
  
  request('https://api.ipify.org?format=json', (error, response, body) => {
    
    // if error exists
    if (error) {
      callback(error);
      return;
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // use JSON.parse to convert the JSON string into an actual object
    let ip = JSON.parse(body).ip;

    // returns the ip if no errors occur
    callback(null, ip);

  });
};


// Define the fetchCoordsByIP function in iss.js.

// It should take in two arguments: ip (string) and callback
// Add the function to the object properties being exported from iss.js
// For now, it can have an empty body and do nothing

// * Input:
// *   - The ip (ipv4) address (string)
// *   - A callback (to pass back an error or the lat/lng object)
// * Returns (via Callback):
// *   - An error, if any (nullable)
// *   - The lat and lng as an object (null if error). Example:
// *     { latitude: '49.27670', longitude: '-123.13000' }
// */

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude });
  });
};


/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`
    , (error, response, body) => {

      if (error) {
        callback(error, null);
        return;
      }
 
      if (response.statusCode !== 200) {
        callback(Error(`Status Code ${response.statusCode} when fetching ISS fly over times: ${body}`), null);
        return;
      }

      // use JSON.parse to convert the JSON string into an actual object
      const passes = JSON.parse(body).response;
      callback(null, passes);

    });
};

module.exports = { fetchCoordsByIP };
module.exports = { fetchISSFlyOverTimes };


