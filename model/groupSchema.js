const mongoose = require("mongoose");

// Guruh Schema va Model yaratish
const GroupSchema = new mongoose.Schema({
  groupId: Number,
  groupName: String,
  isAdmin: Boolean,
});

module.exports = mongoose.model("Group", GroupSchema);
