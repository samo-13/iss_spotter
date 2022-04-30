// will contain most of the logic for fetching the data from each API endpoint

const request = require('request'); // require the request library
// use request to fetch IP address from JSON API


const fetchMyIP = function(callback) {
  
  // asynchronously return IP Address using an API
  // pass through the error to the callback if an error occurs when requesting the IP data
  // parse and extract the IP address using JSON and then pass that through to the callback (as the second argument) if there is no error
  
  request('https://api.ipify.org?format=json', (error, response, body) => {

    if (error) {
      callback(error);
      return;
    }
    
  });
};

module.exports = { fetchMyIP };

