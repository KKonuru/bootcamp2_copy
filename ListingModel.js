/* Import Sequalize and other libraires */
//Syntax for importing ES Modules - https://www.geeksforgeeks.org/how-to-use-an-es6-import-in-node-js/
import { Sequelize, DataTypes } from '@sequelize/core';

//imports dontenv module and allows us to access stored environment variables stored in .env file
import 'dotenv/config';

//Connect to the instance of ElephantSQL using the API_URL
const sequelize = new Sequelize(process.env.API_URL);

//Define the listing model with the attributes code, name, coordinates, and address
//Define the name of the table as 'Listings'
const Listing = sequelize.define('Listing', {
  //The code and name are required. All fields are stored as String except the coordinates which are a JSON
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull:false
  },
  coordinates:{
    type:DataTypes.JSONB
  },
  address:{
    type:DataTypes.STRING
  },
  }, {
  // Other model options go here
  tableName: 'Listings'
});

// `sequelize.define` also returns the model
console.log(Listing === sequelize.models.Listing); // true
console.log(Listing);

//Export the model 'Listing' in a single statement at the end of the module
export { Listing };
