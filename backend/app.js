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



/****************************
 **  Routes - declaration   *
 ***************************/
//const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');


/***********************
 **  DB - Connexion    *
 **********************/

mongoose.connect('mongodb+srv://williamhod:MongoDBPassWord33@cluster0.opybw.mongodb.net/soPekockoDB?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // * tout le monde à l'accès à notre api
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  //ajouter les headers mentionnés aux requêtes envoyées vers notre api
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  //envoyés des requetes avec les methodes mentionnées (post , get etc)
  next();
});


app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('/api/sauces', sauceRoutes);

app.use('/api/auth', userRoutes);




// Export de l'application express pour déclaration dans server.js
module.exports = app;




