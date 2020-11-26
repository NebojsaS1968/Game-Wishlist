const express = require('express')
const mongoose = require("mongoose")
const app = express()
const port = 3000;
const bodyParser = require('body-parser')
const session = require('express-session')
require('dotenv').config()
const MongoStore = require('connect-mongo')(session)
const TWO_HOURS = 1000 * 60 * 60 * 2 // 2h

const {
  SESS_LIFE = TWO_HOURS,
  SESS_NAME,
  SESS_SECRET
} = process.env 

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Session config
app.use(session({
  name: SESS_NAME,
  store: new MongoStore({ url: 'mongodb://localhost:27017/sessions' }),
  secret: SESS_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: SESS_LIFE,
    sameSite: true
  }
}))

// DB
mongoose
  .connect("mongodb://localhost:27017/wishlist", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.log(err))

// Routes
const games = require('./routes/games')
const user = require('./routes/user')

app.use('/games', games)
app.use('/user', user)


app.listen(port, () => console.log('Server is listening on port 3000'))