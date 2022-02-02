const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("../db/conn");
const User = require("../models/userSchema");

// About Page
exports.about = (req, res) => {
  res.send(req.rootUser);
};

//Get User Data for Contact Page and Home Page
exports.getdata = (req, res) => {
  res.send(req.rootUser);
};

//contact us page
exports.contact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      console.log("error in contact form");
      return res.json({ error: "Please fill the contact form" });
    }

    const userContact = await User.findOne({ _id: req.userID });

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );

      await userContact.save();
      res.status(201).json({ message: "user contact saved successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};
