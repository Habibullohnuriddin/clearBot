require("dotenv").config();
require("./controllers");
require("./core");

const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.listen(() => {
  console.log("Ishlayapti... 😃");
});
