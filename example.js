const mongoose = require('mongoose');
const ng = require("./name-generator");

// Replace with your MongoDB connection string
const DBURL = 'mongodb://username:password@url:port/dbname'

// Connect to MongoDB
mongoose.connect(DBURL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    // First we import names. In real life, we would only do this once \
    // probably in a seperate script.
    ng.importNames().then(() => {
        // After names are imported, we setup an options object. \
        // In this example, we are selecting female first names \
        // in the top 100 for both first and last names.
        options = {
            gender: "F",
            top: 100,
        };
        // Run generateName and pass it our options. It returns an \
        // object with firstName, lastName and gender.
        ng.generateName(options).then((name) => {
            console.log(`${name.firstName} ${name.surname} - ${name.gender}`);
            // Our example is now done. Disconnect from the database \
            // so the program can exit.
            mongoose.disconnect();
        }).catch((err) => {
            console.error(err);
        });
    }).catch((err) => {
        console.error(err);
    });
});