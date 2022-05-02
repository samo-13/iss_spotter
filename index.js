
// ------------------------------------------------------------------------------------------------------
// // will require and run our main fetch function

// const { fetchMyIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// ------------------------------------------------------------------------------------------------------

// temporary code - can be commented out.
// const { fetchCoordsByIP } = require('./iss');

// fetchCoordsByIP('162.245.144.188', (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned coordinates:' , coordinates);
// });

// ------------------------------------------------------------------------------------------------------

// const coordinates = { latitude: '49.27670', longitude: '-123.13000' };


// const { fetchISSFlyOverTimes } = require('./iss');

// fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned flyover times:' , passTimes);
// });

// ------------------------------------------------------------------------------------------------------

// const { nextISSTimesForMyLocation } = require('./iss');

// nextISSTimesForMyLocation((error, passTimes) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }
//   // success, print out the deets!
//   console.log(passTimes);
// });


// ------------------------------------------------------------------------------------------------------

/** 
 * Input: 
 *   Array of data objects defining the next fly-overs of the ISS.
 *   [ { risetime: <number>, duration: <number> }, ... ]
 * Returns: 
 *   undefined
 * Sideffect: 
 *   Console log messages to make that data more human readable.
 *   Example output:
 *   Next pass at Mon Jun 10 2019 20:11:44 GMT-0700 (Pacific Daylight Time) for 468 seconds!
 */

const printPassTimes = function(passTimes) {
  for (let pass of passTimes) {

    let dateTime = new Date(0);

    // The setUTCSeconds() method sets the seconds for a specified date according to universal time.
    dateTime.setUTCSeconds(pass.risetime);

    let duration = pass.duration;

    console.log(`Next pass will happen at ${dateTime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("Oops, it didn't work!", error);
  }
  
  printPassTimes(passTimes);

});



// LHL learning exercise -- code provided 

