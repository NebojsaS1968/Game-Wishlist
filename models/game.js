const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const game = new Schema({
  title: String,
  price: Number,
  year: Number,
  discount: String,
  rating: Number,
  publisher: String,
  description: String
});

const Game = mongoose.model("game", game);

module.exports = Game;