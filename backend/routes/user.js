/******************
 ** User - Routes  *
 ******************/

const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const verifyPassword = require('../middleware/checkPassWord');
const emailValidator = require('../middleware/emailValidator-config');



/** Chiffre le mot de passe de l'utilisateur,
 * ajoute l'utilisateur à la base de données.
 */
router.post('/signup',emailValidator, verifyPassword, userCtrl.signup);

/** Vérifie les informations d'identification de l'utilisateur, en renvoyant l'identifiant
 * userID depuis la base de données et un jeton Web JSON signé (contenant également l'identifiant userID)
 */
router.post('/login', userCtrl.login);

module.exports = router;
