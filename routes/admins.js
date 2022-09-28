const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");

//Gets all the admins
router.route("/add").get(async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

//submits a admin
router.route("/add").post(async (req, res) => {
  const { id, group_id, name, phone } = req.body;
  const admin = new Admin({
    id,
    group_id,
    name,
    phone,
  });
  try {
    const savedAdmin = await admin.save();
    res.status(200).json(savedAdmin);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
