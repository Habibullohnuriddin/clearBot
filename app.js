require("dotenv").config();
require("./controllers");
require("./core");

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

try {
  mongoose.connect(
    "mongodb+srv://nuriddinovx2:lYwb1Se4QUtCIbu3@cluster.vpcpv4k.mongodb.net/users"
  );
  app.listen(() => {
    console.log(`✅ MongoDB-ga ulanish muvaffaqiyatli amalga oshirildi!`);
  });
} catch (err) {
  console.log("⚠️ MongoDBga ulanishda xatolik:", err);
}

app.get("/", (req, res) => {
  res.send("Salom, Express!");
});
