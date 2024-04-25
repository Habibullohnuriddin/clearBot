require("dotenv").config();
require("./controllers");
require("./core");

const express = require("express");
const app = express();

app.use(express.json());
app.use(cors());
