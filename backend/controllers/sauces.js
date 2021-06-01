/*************************
 ** Sauces - Controller  *
 ************************/

const Sauce = require('../models/sauce');
const fs = require('fs');


exports.createASauce = (req, res, next) => {
    //const sauceObject = JSON.parse(req.body.sauce);
    const { id, ...sauceObject } = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/r_${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    });
    sauce
        .save()
        .then(() => {
            res.status(201).json({ message: 'sauce créée.' });
        })
        .catch((error) => res.status(400).json(error));
    console.log('La sauce ', sauceObject.name, "vient d'étre ajouter !");
};

exports.modifySauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }).then((sauce) => {
        let sauceObject = {};
        if (req.file) {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlinkSync(`images/${filename}`, (err) => {
                if (err) throw 'image not found';
                console.log('file remove');
            });
            sauceObject = {
                ...JSON.parse(req.body.sauce),
                imageUrl: `${req.protocol}://${req.get('host')}/images/r_${req.file.filename}`,
            };
        } else {
            sauceObject = { ...req.body };
        }
        /*const sauceObject = req.file
                ? {
                      ...JSON.parse(req.body.sauce),
                      imageUrl: `${req.protocol}://${req.get('host')}/images/r_${req.file.filename}`,
                  }
                : { ...req.body };*/
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet modifié !' }))
            .catch((error) => res.status(400).json(error));
        console.log('La sauce ', sauceObject.name, 'a bien été modifier');
    }) .catch((error) => res.status(404).json(error));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            res.status(200).json(sauce);
        })
        .catch((error) => {
            res.status(404).json(error);
        });
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then((sauces) => {
            res.status(200).json(sauces);
        })
        .catch((error) => {
            res.status(400).json(error);
        });
};

exports.removeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() =>
                        res.status(200).json({
                            message: 'Sauce supprimée !',
                        }),
                    )
                    .catch((error) => res.status(400).json(error));
            });
        })
        .catch((error) => res.status(500).json(error));

    console.log('La sauce  est perdu a jamais !!!!');
};

exports.rateSauce = (req, res, next) => {
    Sauce.findById(req.params.id)
        .then((sauce) => {
            let newValues = {};
            let message = '';

            if (req.body.like === 1) {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    throw `Erreur, l'utilisateur aime déjà la sauce ${sauce.name}`;
                }
                if (sauce.usersDisliked.includes(req.body.userId)) {
                    throw `Erreur, l'utilisateur déteste déjà la sauce ${sauce.name}`;
                }
                newValues = {
                    $push: { usersLiked: req.body.userId },
                    $inc: { likes: 1 },
                };
                message = `L'utilisateur aime la sauce ${sauce.name}`;
            } else if (req.body.like === -1) {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    throw `Erreur, l'utilisateur aime déjà la sauce ${sauce.name}`;
                }
                if (sauce.usersDisliked.includes(req.body.userId)) {
                    throw `Erreur, l'utilisateur déteste déjà la sauce ${sauce.name}`;
                }
                newValues = {
                    $push: { usersDisliked: req.body.userId },
                    $inc: { dislikes: 1 },
                };
                message = `L'utilisateur déteste la sauce ${sauce.name}`;
            } else {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    newValues = {
                        $pull: { usersLiked: req.body.userId },
                        $inc: { likes: -1 },
                    };
                    message = `L'utilisateur n'aime plus la sauce ${sauce.name}`;
                }
                if (sauce.usersDisliked.includes(req.body.userId)) {
                    newValues = {
                        $pull: { usersDisliked: req.body.userId },
                        $inc: { dislikes: -1 },
                    };
                    message = `L'utilisateur ne déteste plus la sauce ${sauce.name}`;
                }
            }
            console.log(message);
            Sauce.updateOne({ _id: req.params.id }, newValues)
                .then(() => res.status(200).json(message))
                .catch((error) => res.status(404).json(error));
        })
        .catch((error) => res.status(404).json(error));
};
