const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const config = require("./config");

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

//ROUTES TANEKO (/api/account lai chai perfix name vanxa)
const userRoutes = require("./routes/account");
app.use("/api/accounts", userRoutes);

const mainRoutes = require("./routes/main");
app.use("/api", mainRoutes);
const port = process.env.PORT || 4004;
app.listen(port, (req, res) => {
  console.log(`this is our port no 4004`);
});
