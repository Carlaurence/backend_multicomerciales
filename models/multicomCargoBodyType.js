const mongoose = require("mongoose");

const CargoBodyTypeSchema = mongoose.Schema({
    name: {type: String, required: true, trim: true},
    creatorUserId: {type: mongoose.Schema.Types.ObjectId, ref: "multicomUser"},
    registerDate: {type: Date, default: Date.now()}
});

module.exports = mongoose.model("multicomCargoBodyType", CargoBodyTypeSchema)
