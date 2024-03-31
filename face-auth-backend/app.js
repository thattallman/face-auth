const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
const bodyParser = require("body-parser");
mongoose
  .connect(
    `${process.env.MONGOURL}`
  )
  .then(() => console.log("mongo db connected "));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", authRouter);
module.exports = app