
import { Sequelize} from '@sequelize/core';

//imports dontenv module and allows us to access stored environment variables stored in .env file - See https://www.npmjs.com/package/dotenv
import 'dotenv/config';

//Import file system - Examples of how to use the file system module - fs - https://www.scaler.com/topics/nodejs/fs-module-in-node-js/
import * as fs from 'fs';

//imports the Listing Model we created in ListingModels.js
import { Listing } from './ListingModel.js';


//Connection to the instance of ElephantSQL using the API_URL
const sequelize = new Sequelize(process.env.API_URL);

//Testing that the .env file is working - This should print out the port number
console.log(process.env.PORT); //Should print out 8080 
console.log(process.env.API_Key); //Should print out "Key Not set - starter code only"

 try {
  //Setup table in the DB
  await Listing.sync({ force: true });
  console.log("The table for the Listing model was just (re)created!");
  
  /* This callback function read the listings.json file into memory (data) and stores errors in (err).
      Write code to save the data into the listingData variable and then save each entry into the database.
   */
  fs.readFile('listings.json', 'utf8', function(err, data) {
    // Errors-Check out this resource for an idea of the general format err objects and Throwing an existing object.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw#throwing_an_existing_object
    if (err) throw err;
    console.log(data);

    //Save and parse the data from the listings.json file into a variable, so that we can iterate through each instance - Similar to Bootcamp#1
   //Create variable listingData and parse the data from listings.json
    const listingData = JSON.parse(data);
     //Use Sequelize create a new row in our database for each entry in our listings.json file using the Listing model we created in ListingModel.js
    // to https://sequelize.org/docs/v6/core-concepts/model-instances/#creating-an-instance
    
    //For loop iterates through listingData.entries and creates a new entry in the Listings table
    for(const listing of listingData.entries){
      listing.coordinates = JSON.stringify(listing.coordinates);
      //Create a new entry in Listings using one entry from listingData json file
      Listing.create(listing);
    }
     



    });
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


 /* 
  Once you've written + run the script, check out your ElephantSQL database to ensure that it saved everything correctly. 
 */

 