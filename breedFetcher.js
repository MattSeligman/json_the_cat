const request = require('request');

const location = 'https://api.thecatapi.com/v1/breeds/search?q=Siberian'
const callbackFunction = (error, response, body)=>{

    // let's check that statusCode response is accepted [200-299]
    const statusSuccess = (/2[0-9][0-9]/).test(response.statusCode);
    
    // otherwise let's figure out what's causing the denial (some urls could require api keys)
    if(!statusSuccess){ return console.log("Having trouble accessing the location: ",error)}
    
    console.log(body)
    
    // returning the body (sourcode or JSON if accessing api)
    return body;
}

request( location, callbackFunction)