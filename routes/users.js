const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validate = require("validator");

const isValid = (value) => {
  if (typeof value === "undefined" || value === null) return false;

  if (typeof value === "string" && value.trim().length === 0) {
    return false;
  }
  return true;
};

const isValidRequestBody = (requestBody) => {
  return Object.keys(requestBody).length > 0;
};

router.route("/signup").post(async (req, res) => {
  try {
    let requestBody = req.body;
    if (!isValidRequestBody(requestBody)) {
      return res.status(400).send({
        status: false,
        message: "invalid request parameters . Please Provide User Details",
      });
    }

    const { name, email, password, phone } = requestBody;

    if (!isValid(name)) {
      return res.status(400).send({
        status: false,
        message: "Name is required",
      });
    }

    if (!isValid(email)) {
      return res.status(400).send({
        status: false,
        message: "Email is required",
      });
    }

    if (!validate.isEmail(email)) {
      return res.status(400).send({
        status: false,
        message: "Invalid Email",
      });
    }

    if (!isValid(password)) {
      return res.status(400).send({
        status: false,
        message: "Password is required",
      });
    }

    if (!isValid(phone)) {
      return res.status(400).send({
        status: false,
        message: "Invalid phone number",
      });
    }

    if (!/^((\\+91 - ?)|0)?[0-9]{10}$/.test(phone)) {
      return res.status(400).send({
        status: false,
        message: "phoneNumber should be valid",
      });
    }

    const isEmailAlreadyExists = await User.findOne({ email: email });
    if (isEmailAlreadyExists) {
      return res.status(400).send({
        status: false,
        message: "Email already exists",
      });
    }

    const isPhoneAlreadyExists = await User.findOne({ phone: phone });
    if (isPhoneAlreadyExists) {
      return res.status(400).send({
        status: false,
        message: "Phone number already exists",
      });
    }

    const user = {name, email, password, phone};
    const savedUser = await User.create(user);
    let token = jwt.sign(
        {
            userId: savedUser._id.toString(),
            exp: Math.floor(Date.now() / 1000) + 10 * 60 * 60,
        },
        "this-is-aSecretToken",
    );

    res.setHeader("x-api-key", token);
    savedUser.token = token;

    res.status(200).send({
        status: true,
        message: "User created successfully",
        data: savedUser,
    })

  } catch (err) {
    res.status(400).send({ status: false, message: err.message });
  }
});

router.route("/login").post(async (req, res) => {
    try {
        let requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
        return res.status(400).send({
            status: false,
            message: "invalid request parameters . Please Provide User Details",
        });
        }
    
        const { email, password } = requestBody;
    
        if (!isValid(email)) {
        return res.status(400).send({
            status: false,
            message: "Email is required",
        });
        }
    
        if (!validate.isEmail(email)) {
        return res.status(400).send({
            status: false,
            message: "Invalid Email",
        });
        }
    
        if (!isValid(password)) {
        return res.status(400).send({
            status: false,
            message: "Password is required",
        });
        }
    
        const user = await User.findOne({ email: email });
        if (!user) {
        return res.status(400).send({
            status: false,
            message: "Invalid email",
        });
        }
    
        if (user.password !== password) {
        return res.status(400).send({
            status: false,
            message: "Please check password",
        });
        }
        
        let token = jwt.sign(
            {
                userId: user._id.toString(),
                exp: Math.floor(Date.now() / 1000) + 10 * 60 * 60,
            },
            "this-is-aSecretToken",
        );
    
        res.setHeader("x-api-key", token);
        user.token = token;
    
        res.status(200).send({
            status: true,
            message: "User logged in successfully",
            data: user,
        })
    
    } catch (err) {
        res.status(400).send({ status: false, message: err.message });
    }
});

module.exports = router;
