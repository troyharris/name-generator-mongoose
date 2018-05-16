var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var FirstNameSchema = Schema(
    {
        name: { type: String, required: true },
        popularity: { type: Number },
        gender: { type: String }
    }
);

FirstNameSchema.virtual('type').get(() => {
    return "firstName";
});

module.exports = mongoose.model('FirstName', FirstNameSchema);