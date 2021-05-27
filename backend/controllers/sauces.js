/*************************
 ** Sauces - Controller  *
 ************************/

const Sauce = require('../models/sauce');

const fs = require('fs');

exports.createASauce = (req, res, next) => {
    //const sauceObject = JSON.parse(req.body.sauce);
    const { id, ...sauceObject} = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    });
    sauce.save()
        .then(() => {
            res.status(201).json({ message: 'sauce créée.' });
        })
        .catch((error) =>
            res.status(400).json({error: error,}),
        );
};


exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file
        ? {
              ...JSON.parse(req.body.sauce),
              imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
          }
        : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch((error) => res.status(400).json({error: error,}));
};


exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then((sauce) => { res.status(200).json(sauce);})
    .catch((error) => {res.status(404).json({error: error,});
  });
};


exports.getAllSauce = (req, res, next) => {
  Sauce.find()
  .then((sauces) => {res.status(200).json(sauces);})
  .catch((error) => {res.status(400).json({error: error,});
  });
};


exports.removeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({_id: req.params.id})
            .then(() => res.status(200).json({
              message: 'Sauce supprimée !'
            }))
            .catch(error => res.status(400).json({
              error
            }));
        });
      })
      .catch(error => res.status(500).json({error: error,}));
};
  

/* exports.rateSauce = (req, res, next) => {
    
} */