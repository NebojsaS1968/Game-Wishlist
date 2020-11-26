const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const user = new Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model("user", user);

module.exports = User;