const mongoose = require('mongoose');

const YearSchema = mongoose.Schema({
    year: {type: Number, required: true, trim: true},
    creatorUserId: {type: mongoose.Schema.Types.ObjectId, ref: "multicomUser"},
    registerDate: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('multicomYear', YearSchema)