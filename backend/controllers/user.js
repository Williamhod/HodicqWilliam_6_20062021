/***************************
 ** Controller - User      *
 **************************/
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User')

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' })) //status 201 pour une création de ressource
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};
  
/*
*notre fonction signup va : 
*crypter le mdp
*prendre le mdp crypter et créer un nouveau user
* et va enregistrer l user dans la base de donnée
*/

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                //chaine de caractère ici très simple mais ne pro qui sera bien plus longue et complexe
                { expiresIn: '24h' }
                //le token n'est valable que durant 24h
              )
              /* 
              *cette solution de token permet comme pour la creation de nouveau objet , 
              *si on realise un objet avec un user, il ne pourra etre modifier par un autre, 
              *ce user id encoder sera utilise justement pour appliquer le bon user id sur chaque objet
              */
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};
  
/**
 * Dans la fonction login:
 * on récupère l adresse email de l utilisateur 
 * si l email n'est pas bon , on renvoie une erreur
 * sinon on compare le mdp entrée avec le hash de la base de donnée
 * si la comparaison n'est pas bonne on renvoie une erreur 
 * si la comparaison est bonne c'est que l'utilisateur a rentrée le bon identifiant
 * dans ce cas on fait ce qu'attend le front end, on renvoi un user id et son token 
 */

