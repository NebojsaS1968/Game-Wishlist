const express = require("express")
const router = express.Router()

const { validation } = require("../middlewares/validation/validation")

const {
  addGameSchema,
  updateGameSchema,
} = require("../middlewares/validation/schemas/games")

const Games = require("../controllers/games")

const {
  showAllGames,
  getGameById,
  getGameDescription,
  addGame,
  deleteGame,
  updateGame,
  searchGameTitle,
  deleteAllGames
} = Games;

// /api/v1/games
router.route("/")
  .get(showAllGames)
  .post(validation(addGameSchema), addGame)
  .delete(deleteAllGames)

router.route("/:id")
  .get(getGameById)
  .delete(deleteGame)
  .patch(validation(updateGameSchema), updateGame)

router.route("/:id/desc")
  .get(getGameDescription)

router.route("/search/:title")
  .get(searchGameTitle)

module.exports = router;