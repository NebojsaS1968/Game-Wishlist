const Game = require("../models/game")

const showAllGames = async (req, res, next) => {
  // limit
  if(req.query.limit){
    const games = await Game.find({}).limit(parseInt(req.query.limit))
    return res.status(200).send(games)
  } 

  // query rating&price with asc&desc
  if(req.query.sort === "rating" && req.query.order === "asc"){
    const games = await Game.find({}).sort({ rating: 1 })
    return res.status(200).send(games)
  } else if(req.query.sort === "rating" && req.query.order === "desc"){
    const games = await Game.find({}).sort({ rating: -1 })
    return res.status(200).send(games)
  } else if(req.query.sort === "price" && req.query.order === "asc"){
    const games = await Game.find({}).sort({ price: 1 })
    return res.status(200).send(games)
  } else if(req.query.sort === "price" && req.query.order === "desc"){
    const games = await Game.find({}).sort({ price: -1 })
    return res.status(200).send(games)
  }

  // no queries
  const games = await Game.find({})
  res.status(200).send({ games: games })
}

  const getGameById = async (req, res, next) => {
    const { id } = req.params
    const game = await Game.findById(id).populate("users")
    res.status(200).send({ game })
  }
  
  const searchGameTitle = async (req, res, next) => {
    const { title } = req.params;
    const game = await Game.find().where("title").equals(new RegExp(title, "i"));
    if (game.length === 0) {
      res.status(200).send({ err: "Error!" });
    } else {
      res.status(200).send({ game });
    }
  };

  const getGameDescription = async (req, res, next) => {
    const { id } = req.params
    const game = await Game.findById(id)
    const desc = game.description
    res.status(200).send({ desc })
  }

  const addGame = async (req, res, next) =>{
     const newGame = {
      title:  req.body.title,
      year: req.body.year,
      price: req.body.price,
      rating: req.body.rating,
      publisher: req.body.publisher,
      description: req.body.description
     }
      const game = new Game(newGame)
      const saveGame = await game.save()
      res.status(201).json({ msg: "Game is saved", newGame: saveGame })
  }

  const deleteGame = async (req, res, next) => {
    const { id } = req.params
    await Game.findByIdAndDelete(id)
    res.status(200).send({ msg: "Game is deleted" })
  }

  const deleteAllGames = async (req, res, next) => {
    await Game.deleteMany();
    res.status(200).send({ msg: "All games deleted!" })
  }

  const updateGame = async (req, res, next) => {
    const { id } = req.params
    const update = req.body
    // problem: cant display updated game in json response, it shows the old version of the game(unupdated)
    const game = await Game.findByIdAndUpdate(id, update)
    const save = await game.save()
    res.status(201).send({ msg: "Game is updated", updatedGame: save })
  }

  const getGameTitles = async (req, res, next) => {
    const games = await Game.find({})
    games.forEach(game => {
      res.status(200).send({titles : game.title})
    })
  }

  module.exports = { 
     showAllGames,
     addGame, 
     updateGame, 
     deleteGame, 
     getGameById, 
     getGameDescription, 
     searchGameTitle,
     deleteAllGames,
     getGameTitles
   }