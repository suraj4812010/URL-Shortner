// connect database to app/server
const mongoose = require('mongoose');


// install npm i dotenv to feed process.env
// jo bhi .env file ke andar hai wo process.env object ke andar load ho jayega
require("dotenv").config();

// import database url from process.env object
const DATABASE_URL = process.env.DATABASE_URL;


// This function establish connection with database
const connectToMongoDB = () => {
    mongoose.connect(DATABASE_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true
     })
    .then(() => console.log("Database connection succesfull"))
    .catch((error) => {
        console.log("Issue in DB connection");
        console.log(error.message);
        // iska matlab kya hai ??

    })
}

module.exports = connectToMongoDB;