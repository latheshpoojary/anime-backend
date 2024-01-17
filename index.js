const express = require("express");
const session = require('express-session');
const passport = require('passport');
const mongoStore = require('connect-mongo');
const cors = require('cors');

// require('./stratergies/local');
require('./stratergies/goggle');
// Routes
const narutoRoute = require('./routes/naruto');
const login = require('./routes/login');
const onepieceRoute = require('./routes/onepiece');
const cookiesParser = require('cookie-parser');
const server = express();
server.use(cors({origin: "*"}));

const PORT = 3001;
require('./database')
// Use cookie-parser middleware before other middleware
server.use(cookiesParser());
server.use(express.json());
server.use(session({
  secret: 'AJBXSFDWYEBKSNDJC',
  resave: false,
  saveUninitialized: false,
  store: mongoStore.create({
    mongoUrl:'mongodb://127.0.0.1:27017/anime'
  })
}))
// Generic middleware
server.use((req, res, next) => {
  // Your middleware logic here
  next();
});

server.use(passport.initialize());
server.use(passport.session());

server.use('/auth',login);
server.use('/naruto', narutoRoute);

server.use('/onepiece',onepieceRoute);
server.listen(PORT, () => console.log("Server running on port 3001"));






