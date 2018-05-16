const mongoose = require('mongoose');
const ng = require("./name-generator");

const DBURL = 'mongodb://username:password@url:port/dbname'

// Connect to MongoDB
mongoose.connect(DBURL);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    ng.importNames().then(() => {
        options = {
            gender: "F",
            top: 100,
        };
        ng.generateName(options).then((name) => {
            console.log(`${name.firstName} ${name.surname} - ${name.gender}`);
            mongoose.disconnect();
        }).catch((err) => {
            console.error(err);
        });
    }).catch((err) => {
            console.error(err);
    });
});