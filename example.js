const mongoose = require('mongoose');
const ng = require("./name-generator");

const DBURL = 'mongodb://<username>:<password>@<host>'

// Connect to MongoDB
mongoose.connect(DBURL);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    options = {
        gender: "F",
        top: 100,
    };
    ng.generateName(options).then((name) => {
        console.log(`${name.firstName} ${name.surname} - ${name.gender}`);
        mongoose.disconnect();
    });
});