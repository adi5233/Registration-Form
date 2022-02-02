const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

// Route Imports
const page = require("./routes/pageRoute");
const user = require("./routes/userRoute");

app.use("/api/v1", page);
app.use("/api/v1", user);

module.exports = app;
