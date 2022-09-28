const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    group_id: {
        type: Number,
        //require: true
        default: null
    },
    name: {
        type: String,
        //require: true
        default: null
    },
    phone: {
        type: String,
        //require: true
        default: null
    }
});

module.exports = mongoose.model("Admins", AdminSchema);