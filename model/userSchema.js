const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  id: Number,
  requiredPassword: String,
});

module.exports = mongoose.model("User", UserSchema);
