/****************************
 **   App - declaration     *
 ***************************/

//! import npm module
const express = require("express");

//use for db (mongoDB)
const mongoose = require('mongoose');

//use for upload file (as picture)
const multer = require('multer');

//use for file way (path)
const path = require('path');

// use to protect some http request,headers safety, sniffing, clickjacking... https://www.npmjs.com/package/helmet
const helmet = require("helmet");

// Limite nomber of request per IP
const rateLimit = require('./middleware/expressRateLimit-config')


/****************************
 **  Routes - declaration   *
 ***************************/
//const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');


/***********************
 **  DB - Connexion    *
 **********************/

mongoose.connect(
  process.env.DATABASE_ADMIN,
  {useNewUrlParser: true, useUnifiedTopology:true}
)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();


/***********************
 **  Header - Setup    *
 **********************/

app.use((req, res, next) => {
  res.setHeader(`Access-Control-Allow-Origin`, process.env.HOST); // Only our website have headers access
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

/********************
 **    App- Use     *
 *******************/

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(helmet());

/********************
 **App-Use - API    *
 *******************/
app.use('/api/sauces',rateLimit, sauceRoutes);

app.use('/api/auth',rateLimit, userRoutes);


/********************
 **Export on server *
 *******************/

// Export de l'application express pour déclaration dans server.js
module.exports = app;




