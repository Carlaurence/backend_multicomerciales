const mongoose = require("mongoose");

const EngineManufacturerSchema = mongoose.Schema({
    make: {type: String, required: true, trim: true},
    creatorUserId: {type: mongoose.Schema.Types.ObjectId, ref: "multicomUser"},
    registerDate: {type: Date, default: Date.now()}
});

module.exports = mongoose.model("multicomEngineManufacturer", EngineManufacturerSchema)
