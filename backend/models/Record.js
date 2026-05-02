const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
    symptom: String,
    result: String,
    advice: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Record", recordSchema);