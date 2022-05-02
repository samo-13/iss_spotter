const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = function(passTimes) {
  for (let pass of passTimes) {

    let dateTime = new Date(0);

    // The setUTCSeconds() method sets the seconds for a specified date according to universal time.
    dateTime.setUTCSeconds(pass.risetime);

    let duration = pass.duration;

    console.log(`Next pass will happen at ${dateTime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()

.then((passTimes) => {
  printPassTimes(passTimes)
})

.catch((error) => {
  console.log("It didn't work: ", error.message);
})
