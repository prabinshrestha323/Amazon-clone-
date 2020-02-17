const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const config = require("./config");

const app = express();
//connected to mongoose
mongoose
  .connect("mongodb://localhost/Amazon", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Monogodb connected......"))
  .catch(err => console.log(err));

//middle wareof badyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//middleware of morgan => http request logger middleware for node js
app.use(morgan("dev"));

//middleware of cors => yo chai forntend and backend lai conneted smotherly
app.use(cors());

app.get("/", (req, res, next) => {
  res.json({
    user: "prabin"
  });
});

const port = process.env.PORT || 4004;
app.listen(port, (req, res) => {
  console.log(`this is our port no 4004`);
});
