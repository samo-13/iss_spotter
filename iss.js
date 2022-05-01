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

module.exports = { fetchCoordsByIP };


