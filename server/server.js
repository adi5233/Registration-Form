const dotenv = require("dotenv");
const path = require("path");

// cofig
dotenv.config({ path: path.resolve(__dirname, "./config.env") });

const app = require("./app");

const connectDatabase = require("./db/conn");
// Connecting to database
connectDatabase();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`connection is setup at ${port}`);
});
