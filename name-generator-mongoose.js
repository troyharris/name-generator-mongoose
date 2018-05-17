// Model Imports
const FirstName = require('./models/firstname');
const Surname = require('./models/surname');

// Import module
const impModule = require('./import-names');

function formatName(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function randomName (model, top=null, gender=null) {
    return new Promise((resolve, reject) => {
        const query = {};
        if (gender) {
            query.gender = gender;
        } 
        model.count(query, (err, count) => {
            let limit = count;
            if (top && top < count) {
                limit = top;
            }
            const random = Math.floor(Math.random() * limit);
            model.findOne(query).sort({ popularity: -1 }).limit(limit).skip(random).exec((err, res) => {
                name = {
                    type: res.type,
                    name: res.name,
                };
                if (res.type === 'firstName') {
                    name.gender = res.gender;
                }
                return resolve(name);
            });
        });
    });
}

exports.generateName = (options = {}) => {
    return new Promise((resolve, reject) => {
        promises = [
            randomName(FirstName, options.top, options.gender),
            randomName(Surname, options.top),
        ];
        Promise.all(promises).then((data) => {
            const name = {};
            data.map((row) => {
                fixedName = formatName(row.name);
                if (row.type === "surname") {
                    name.surname = fixedName;
                } else {
                    name.firstName = fixedName;
                    name.gender = row.gender;
                }
            });
            return resolve(name);
        });
    })
}

exports.importNames = () => {
    return new Promise((resolve, reject) => {
        impModule.importNames().then(() => {
            console.log("name-generator-mongoose: Finished import.");
            return resolve();
        }).catch((err) => {
            return reject(err);
        });
    })
}

exports.FirstName = FirstName;
exports.Surname = Surname;