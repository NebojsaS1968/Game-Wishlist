const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const game = new Schema({
  title: String,
  price: Number,
  year: Number,
  rating: Number,
  publisher: String,
  description: String,
  users: [{
    type: Schema.Types.ObjectId,
    ref: "user"
  }]
});

const Game = mongoose.model("game", game);

module.exports = Game;