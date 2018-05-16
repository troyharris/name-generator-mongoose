var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SurnameSchema = Schema(
    {
        name: {type: String, required: true},
        popularity: { type: Number },
    }
);

SurnameSchema.virtual('type').get(() => {
    return "surname";
});

module.exports = mongoose.model('Surname', SurnameSchema);