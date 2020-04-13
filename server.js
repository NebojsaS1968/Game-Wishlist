const express = require('express')
const mongoose = require("mongoose")
const app = express()
const port = 3000;
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

mongoose
  .connect("mongodb://localhost:27017/testing", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.log(err))

  const games = require('./routes/games')

  app.use('/api/v1/games', games)

  app.listen(port, () => console.log('Server is listening on port 3000'))