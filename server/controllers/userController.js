const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
const router = express.Router();
require("../db/conn");
const User = require("../models/userSchema");

exports.registerUser = async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "please fill the field propperly" });
  }

  try {
    const userExit = await User.findOne({ email: email });
    if (userExit) {
      return res.status(422).json({ error: "Email already exit. " });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password is not matching. " });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      await user.save();
      res.status(201).json({ message: "user registered suscessfully" });
    }
  } catch (err) {
    console.log(err);
  }
};

// login route
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ error: "please fill the field data" });
    }
    const userLogin = await User.findOne({ email: email });
    // userlogin will give whole document with matched email

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatch) {
        res.status(400).json({ message: "Invalid Credientials" });
      } else {
        res.json({ message: " user signin suscessfully" });
      }
    } else {
      res.status(400).json({ message: "Invalid Credientials" });
    }
  } catch (err) {
    console.log(err);
  }
};

// logout user
exports.logoutUser = (req, res) => {
  res.clearCookie("jwtoken", "aditya");
  res.status(200).send("user logout");
};
