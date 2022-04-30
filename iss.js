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

module.exports = { fetchMyIP };

