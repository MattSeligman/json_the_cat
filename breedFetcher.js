// We start by grabing and processing the arguments entered (ignoring the first two which are locations to files)
const searchInput = process.argv.splice(2).toString();

// We pull in request so we can do some internet requests.
const request = require('request');

// We set our location and concat the location to the search input.
const location = `https://api.thecatapi.com/v1/breeds/search?q=`.concat(searchInput);

// Here's where the magic happens
request(location, (error, response, body)=>{

  // let's check that statusCode response is accepted [200-299]
  const statusSuccess = (/2[0-9][0-9]/).test(response.statusCode);
        
  // otherwise let's figure out what's causing the denial (some urls could require api keys)
  if (!statusSuccess) return console.log("Having trouble accessing the location: ", error);

  // assign the jsonObject
  const jsonObject = JSON.parse(body)[0];

  // determine if it's located or not
  const notFound = jsonObject === undefined;
  if (notFound) return console.log("I'm having trouble finding that breed. Please");
    
  // if its found let's grab that description.
  const description = jsonObject.description;

  // Let's respond with those detailed facts they were curious about.
  console.log(description);
});