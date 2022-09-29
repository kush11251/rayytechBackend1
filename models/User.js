const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: [6, "Minimum password length is 6 characters"],
        trim: true,
    },
    phone: {
        type: Number,
        required: [true, "Please provide phone number"],
        unique: true,
        trim: true,
        length: true,
        validate: {
            validator: function (phone) {
                return /^((\\+91 - ?)|0)?[0-9]{10}$/.test(phone);
            }, message: "Please enter valid phone number", isAsync: false
        }
    },
    token: {type: String},
});

module.exports = mongoose.model("Users", UserSchema);