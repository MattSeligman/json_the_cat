const fetchBreedDescription = function(breedName, callback) {

  // We pull in request so we can do some internet requests.
  const request = require('request');

  // We set our location and concat the location to the search input.
  const location = `https://api.thecatapi.com/v1/breeds/search?q=`.concat(breedName);

  // Here's where the magic happens
  request(location, (error, response, body)=>{

    // let's check that statusCode response is accepted [200-299]
    const statusSuccess = (/2[0-9][0-9]/).test(response.statusCode);
    if (!statusSuccess) return callback(Error(error), null);
    
    // assign the jsonObject
    const jsonObject = JSON.parse(body)[0];

    // determine if it's located or not
    const notFound = jsonObject === undefined;
    if (notFound) return callback(Error(error), null);
      
    // if its found let's grab that description.
    const description = jsonObject.description;

    // Let's respond with those detailed facts they were curious about.
    if (!description) {
      return callback(Error(error), null);
    }
    return callback(null, description);
 
  });
  
};

module.exports = { fetchBreedDescription };