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

The most basic command is getting a random name name from the entire database:

```
ng.generateName().then((name) => {
    console.log(`${name.firstName} ${name.surname} - ${name.gender}`);
    mongoose.disconnect();
}).catch((err) => {
    console.error(err);
});
```

To filter by gender or popularity, you can add in an options object:

```
// This would filter only female first names and \
// use only top 100 most popular first & last names
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
```

## Data Attributions
The surname data comes from FiveThirtyEight: https://github.com/fivethirtyeight/data
The first name data comes from the US Social Security Office: https://www.ssa.gov/oact/babynames/background.html

## Using Your Own Data
You can overwrite surname.csv and firstname.csv to include your own data. The format is:
```
// firstname.csv
name,gender('M'/'F'),popularity(int)

//surname.csv
name,,popularity(int)
```