const express = require("express");
const authenticate = require("../middleware/authenticate");
const { about, contact, getdata } = require("../controllers/pageController");

const router = express.Router();

router.route("/about").get(authenticate, about);
router.route("/contact").post(authenticate, contact);
router.route("/getdata").get(authenticate, getdata);

module.exports = router;
