import { Sequelize } from '@sequelize/core';


//imports dontenv module and allows us to access stored environment variables stored in .env file
import 'dotenv/config';

import { Listing } from './ListingModel.js';

//Uses the API Url to connect to the instance on elephantsql
const sequelize = new Sequelize(process.env.API_URL);


try {
    //Test the connection to the database
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } 
  

    //Function that will retrieve all the listings in the database. Equivalent to the select * from "Listings"
      async function retrieveAllListings() {
  
          console.log('Retrieving all listings');
          //Find all entries in the Listing table
          const listings = await Listing.findAll();
          //Print the listings as a JSON 
          console.log(JSON.stringify(listings, null));
          
      }

    //Function that will retrieve the row in the Listings table that contains the name Library West
    async function findLibraryWest() {

      console.log('Finding Library West');
      //Find the first occurance of entry with the name Library West
      const libWest = await Listing.findOne({where:{name: 'Library West'}});

      //If the entry is not found then print to console else print the entry
      if( libWest==null)
      {
        console.log("Library West not found");
      }
      else
      {
        console.log(JSON.stringify(libWest, null));
      }

    }

    //Function that returns the row that contains the code 'CABL'. 
      async function removeCable() {

         console.log('Removing Cable BLDG');
         //Find the first occurence of entry with code cable
         const cable = await Listing.findOne({where:{code: 'CABL'}});
         //If entry was found then it will delete
         if(cable!=null)
         {
          await cable.destroy();
         }
    }

    //Function that is used to create a entry for the new data science building only storing the code and name
    async function addDSIT() {

       console.log('Adding the new DSIT BLDG that will be across from Reitz union. Bye Bye CSE, Hub, and French Fries.');
       //Create a new entry in Listings
       const dsit = await Listing.create({code: 'DSIT', name: 'Data Science and IT Building'});
       //Add it to the table
        await dsit.save();
    }
   

    //The entry with the name Phelps Laboratory has its address attribute update and is saved to the table in elephantsql
    async function updatePhelpsLab() {
       console.log('UpdatingPhelpsLab.');
       //Find the first occurence of a entry for phelps lab
       const phelps = await Listing.findOne({where:{name: 'Phelps Laboratory'}});
       //If found then it will update the address
       if(phelps!=null)
       {
        phelps.address='1953 Museum Rd, Gainesville, FL 32603';
        await phelps.save();
       }
       
 
    }

    
   console.log("Use these calls to test that your functions work. Use console.log statements in each so you can look at the terminal window to see what is executing. Also check the database.")
   //Calling all the functions to test them after the promise of the previous function was resolved
   retrieveAllListings().then(findLibraryWest).then(updatePhelpsLab).then(removeCable).then(addDSIT);
   
       
  


