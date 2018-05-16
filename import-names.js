// Some user defined variables.
const FIRSTNAMEFILE = "firstnames.csv";
const SURNAMEFILE = "surnames.csv";

// Imports
const readline = require("readline");
const fs = require("fs");

// Model Imports
const FirstName = require('./models/firstname');
const Surname = require('./models/surname');

function readlinePromise (model, file, name, popularity, gender=null) {
    return new Promise((resolve, reject) => {
        model.count({}, (err, count) => {
            if (err) {
                return reject(err);
            }
            if (count > 0) {
                console.log("name-generator-mongoose: Data already exists. No need to import.");
                return resolve();
            }
            console.log("Adding from " + file);
            const fileReadline = readline.createInterface({
                input: fs.createReadStream(file)
            });
            const records = [];
            fileReadline.on('line', (line) => {
                const lineArr = line.split(",");
                const recordObject = {
                    name: lineArr[name],
                    popularity: Number(lineArr[popularity]),
                };
                if (gender) {
                    recordObject.gender = lineArr[gender];
                }
                records.push(recordObject);
            });
            fileReadline.on('close', () => {
                model.collection.insertMany(records, () => {
                    return resolve();
                })
            });
        });
    }).catch((err) => {
        console.log(err);
    });
}

exports.importNames = () => {
    return new Promise((resolve, reject) => {
        promises = [
            readlinePromise(FirstName, FIRSTNAMEFILE, 0, 2, 1),
            readlinePromise(Surname, SURNAMEFILE, 0, 2),
        ];
        Promise.all(promises).then(() => {
            return resolve();
        }).catch((err) => {
            console.error(err);
            return reject(err);
        });
    });
};