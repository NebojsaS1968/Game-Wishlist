const Game = require("../models/game")

const sortGames = (a, b, value) => {
    if (a[value] < b[value]) {
      return -1
    }
    if (a[value] > b[value]) {
      return 1
    }
    return 0
  } 

const showAllGames = async (req, res, next) => {
    if(req.query.sort === "price" && req.query.order === "asc"){
      const game = await Game.find({});
      const games = game.sort((a, b) => sortGames(a, b, "price"));
      res.status(200).send({ games });
    }
  
    if(req.query.sort === "price" && req.query.order === "desc"){
      const game = await Game.find({});
      const games = game.sort((a, b) => sortGames(a, b, "priec")).reverse()
      res.status(200).send({ games });
    }
  
    if(req.query.sort === "discount" && req.query.order === "desc"){
      const game = await Game.find({});
      const games = game.sort((a, b) => sortGames(a, b, "discount"));
      res.status(200).send({ games });
    }
  
    if(req.query.sort === "discount" && req.query.order === "asc"){
      const game = await Game.find({});
      const games = game.sort((a, b) => sortGames(a, b, "discount")).reverse()
      res.status(200).send({ games });
    }

    if (req.query.limit){
      game = await Game.find({}).limit(parseInt(req.query.limit));
      res.status(200).send(games);
    }
  
    if (!req.query.sort && !req.query.order) {
      const games = await Game.find({})
      res.status(200)
      res.send({ games: games })
    }
  }

  const getGameById = async (req, res, next) => {
    const { id } = req.params
    const game = await Game.findById(id)
    res.status(200).send({ game })
  }
  

  const searchGameTitle = async (req, res, next) => {
    const { title } = req.params;
    const game = await Game.find().where("title").equals(new RegExp(title, "i"));
    if (game.length === 0) {
      res.status(200).send({ err: "An error has occured!" });
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
        console.log(req.body)
        const newGame = {
          title:  req.body.title,
          year: req.body.year,
          price: req.body.price,
          discount: req.body.discount,
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

  const updateGame = async (req, res, next) => {
    const { id } = req.params
    const update = req.body
    await Game.findByIdAndUpdate(id, update)
    res.status(200).send({ msg: "Game is updated" })
  }

  module.exports = { 
     showAllGames,
     addGame, 
     updateGame, 
     deleteGame, 
     getGameById, 
     getGameDescription, 
     searchGameTitle
   }