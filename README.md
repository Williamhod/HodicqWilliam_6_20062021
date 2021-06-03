# Projet 6 OC So Pekocko
  - [For the Front-end](#for-the-front-end)
    - [Piquante](#piquante)
    - [Development server](#development-server)
  - [For the Back-end](#for-the-back-end)
    - [Package node](#package-node)
    - [Notice API](#notice-api)
--------------------------------------------------------------------------------------------------------------------
## For the Front-end 

### Piquante

Le projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 7.0.2.

Pour faire fonctionner le projet, vous devez installer node-sass à part.

### Development server

Démarrer `ng serve` pour avoir accès au serveur de développement. Rendez-vous sur `http://localhost:4200/`. L'application va se recharger automatiquement si vous modifiez un fichier source.

--------------------------------------------------------------------------------------------------------------------
## For the Back-end

run "server" afin de lance le serveur du back-end qui sera par defaut lancer via nodemon. Attention a bien installer toutes les dépendances de node.


### Package node 


| NPM dépendances                   | Utilité                                                                                                       |
|:---------------------------------:|:-------------------------------------------------------------------------------------------------------------:|
| nodemon                           |Permet de relancer le serveur au moindre changement                                                            |
| express                           |Framework pour construire l'application web                                                                    |
| mongoose                          |Permet de réaliser la connexion a notre base de donnée (MongoDB)                                               |
| mongoose-unique-validator         |Permet d'avoir des adresse email unique dans notre base de donnée                                              |
| bcrypt                            |La technologie de chiffrement utilisé pour stocker nos mots de passe dans la DB                                |
| password-validator                |Nous permet de réaliser un schéma type de mot de passe                                                         |
| jsonwebtoken                      |Permet la création de token d'identification pour sécuriser nos routes de l'api sauces                         |
| multer                            |Package qui permet de gèrer les fichiers entrants dans nos requêtes                                            |
| multer-sharp-resizer              |Package qui va permettre ici de redimensionner et allèger les images uploadées                                 |
| path                              |Sert a l'upload de nos images afin de travailler sur le chemin des fichiers dans nos répertoires               |
| dotenv                            |Permet de charger les variables environnement contenu dans un fichier .env                                     |
| email-validator                   |Assure du format de l'email rentré                                                                             |
| express-rate-limit                |Limite le nombre de requète par IP sur l'indice temps configuré                                                |
| helmet                            |Securise l'application de vulnérabilités bien connue (cross-site scripting, sniffing, protection xss,...)      |
| fs                                |(File System) Permet de gèrer les téléchargement et modification d'images                                      |
| no cache                          |Permet de ne pas concerver de cache du backend pour avoir toujours la version update                           |

### Notice API


 Important: [informations de l'api !](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P6/Guidelines+API.pdf "Redirection sur le lien fournit par Openclassrooms")
