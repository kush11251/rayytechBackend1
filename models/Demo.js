const mongoose = require("mongoose");

const DemoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        //required: true
        default: Date.now
    }
});

module.exports = mongoose.model("Demos", DemoSchema);