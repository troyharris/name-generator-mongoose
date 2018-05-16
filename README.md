# name-generator-mongoose
This node.js module has two parts. The first part imports a large number of first & last names into the user's MongoDB using Mongoose. The data includes a popularity field to allow filtering based on a name's popularity. It also includes a gender binary field ("M" or "F") for first names.

## Import Data
To import the data, you can run the importNames function that returns a Promise:
```const ng = require("./name-generator");
ng.importNames().then(() => {
    console.log("The names have been imported");
};
```

You only need to import once (in fact, if it notices data already in the collection, it will stop itself from importing so as to not cause duplicates).

## Generating a Random Name

```
ng.generateName(options).then((name) => {
    console.log(`${name.firstName} ${name.surname} - ${name.gender}`);
};
```
