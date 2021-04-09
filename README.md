# RAPPORT PROJET MEKA 2021
____
## Les Gatés : Squizzie
##### Etienne Doutrelon, Nicolas Houillon, Valentin Michel, Karl Remy

Nous avons réaliser ce projet Meka 2021 qui présente une interface développée sous ReactJS/Express proposant une authentification des utilisateurs pouvant créer, intéragir et répondre aux quizz. Nous avons nommé notre application Squizzie, dans un thème coloré tout en restant le plus sobre possible pour une visibilité optimale.

## Fonctionnalités principales

- Authentification des utilisateurs
- Créer/Modification des Quizz : nom du quizz, les questions, la/les réponses associées (texte/image)
- Participer à un quizz
- Afficher/Rechercher la liste des quizz par mot-clé
- Un score qui sera affiché à chaque fin de quizz.

## Technologies utilisées
- Front Ent : ReactJS
- Back End : Express (PostgresSQL)
- Gestion de projet : Trello et communication via Zoom/Discord

## Packages NPM
```
npm i react-router-dom
npm i axios
npm i react-cookie
npm i react-bootstrap
npm i passport passport-jwt bcrypt jsonwebtoken
npm i express-fileupload
npm install cypress --save-dev
npm i --save-dev chai enzyme @wojtekmaj/enzyme-adapter-react-17
npm i mocha --save-dev
npm i chai
npm i chai-http
```

# Organisation
> Nous avons organisé notre équipe en analysant chaque tâche demandée, que nous avons classé dans un Trello en fonction de leur catégorie (Front/Back/Gestion/Tests), que nous avons géré en classant dans différents tableaux (A faire, en cours, à valider, validé/terminé), en laissant également la possibilité aux différents membres de l'équipe de proposer une "idée" de conception de notre application via la "Boite à idées".
Nous avons planifié deux réunions quotidiennes : une dans la matinée, et une juste après la pause du déjeuner, afin de montrer globalement l'avancé de chacun et distribuer les prochaines tâches si nécessaire.
Concernant les membres de l'équipe :
**Etienne et Valentin** ont travaillés sur la partie authentification, sur la création de quizz et le filtrage par mot-clé.
**Nicolas** a travaillé sur le déroulement d'un quizz, le score du joueur, les tests et l'édition d'un quizz.
**Karl** a travaillé sur la partie Front-End de l'application et son intégration + gestion des images.

# Application
| Tâches | Status |
| ------ | ------ |
| Authentification | Fonctionne |
| Filtrage par mot-clé | Fonctionne |
| Création de quizz | Fonctionne |
| Édition de quizz | Fonctionne |
| Jouer à un quizz | Fonctionne |
| Comptabiliser un score et l'afficher | Fonctionne |
| Création de la base de données avec quelques data | Fonctionne |
| Afficher la liste de tout les quizz | Fonctionne |
| Intégrer au moins une question dont les propositions sont des images | Fonctionne |
| User non authentifié : ne peuvent répondre qu’aux trois premières questions d’un quiz | Fonctionne |
| Permettre à un joueur authentifié de créer et de modifier ses propres quizz | Fonctionne partiellement |
| Interdire à un joueur authentifié de jouer à ses propres quizz | Fonctionne partiellement |
| Mémoriser les scores des joueurs authentifiés. | Fonctionne |

## Mise en place

Pour démarrer notre application, il est nécessaire :
- Configurer le fichier .env avec votre environnement de base de données postgresSql.
- Executez un ```npm i``` dans la partie ```cd server/``` et la partie ```cd client/```.
- ```psql -f server/data/pg.sql``` (importé notre base de données)
- Placez-vous dans ```cd server/```et ```cd client/```dans 2 terminals différents et lancez ```npm start``` pour démarrer la partie serveur et cliente.
- Accéder directement à notre application : ```http://localhost:3000```

## Rétrospective

##### Les difficultées rencontrées sont principalement

- Un problème avec l'utilisation de PostgresSQL, qui a retardé le travail d'un membre de l'équipe sur la partie Backend.
- Gestion des Tokens
- CRUD
- Gestion d'upload d'une image
- Le temps
- Peu d'expérience sur la technologie utilisée

##### Forces de l'équipe

> Nous avons l'habitude de travailler ensemble, nous connaissons les capacités de chacun des membres de l'équipe et nous avons pu départager les tâches en fonction des connaissances de chacun.

##### Gestion des risques
- Gestion du temps

##### Ce qui peut être amélioré
- Améliorer la sécurité
- Rajout des fonctionnalités optionnelles
- Afficher le profil d'un utilisateur avec ses stats
- L'édition des quizz
- Afficher les réponses de l'utilisateur plutôt que les bonnes réponses
- Intégrer un timer pour les questions d'un quizz
- Création de quizz avec les questions/réponses en utilisant un formulaire unique.