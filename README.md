# MeKa 2021

### Description du projet

Vous devez réaliser une application web permettant de créer des quiz et d’y jouer, en mode authentifié ou non.
Un quiz est un ensemble de questions. Chaque question est accompagnée d’un nombre limité de propositions (2 à 4 en général) présentées sous forme de checkboxes et parmi lesquelles le joueur est amené à choisir.
Lorsque le joueur coche la ou les bonnes cases, il marque un certain nombre de points. Chaque question peut rapporter un nombre de points différents. Rien n’interdit a priori que pour une même question, il faille cocher plusieurs cases pour marquer ces points.
En résumé :

* Un quiz est défini par un nom, une image et des mots-clés.
* Chaque question d’un quiz est définie par une phrase et peut rapporter un certain
nombre de points.
* La liste de propositions est soit une liste de phrases courtes, soit une liste d’images.
* Chaque question admet au minimum une proposition valide.
* Lorsque l’authentification est réalisée, un quiz appartient à une personne identifiée
par un nom et authentifiée par un mot de passe crypté.

### Gestion de votre projet

Vous devez proposer au plus tard mardi midi un accès pour chaque enseignant à l'outil de suivi de projet de leur choix, Trello ayant été préconisé. Une url par exemple avec un compte pour s'y connecter le cas échéant. Dans cet outil de suivi :

* On doit retrouver qui fait quoi, autant de cartes nécessaires que de fonctionnalités attendues, plusieurs états d'avancement des tâches (BackLog, todo, In progress, etc. à votre convenance). Attention, on doit absolument y trouver un état "À valider" et un état "Validé". Les fonctionnalités dans l'état "A valider" correspondront à celles pour lesquelles vous avez sollicité un enseignant pour validation, et si validation, penser à les changer de statut. La colonne "Validé" pourra servir notamment aux enseignants pour lister tout ce qui a été fait.
* Il est vivement conseillé de choisir un jeu de couleur pour distinguer les fonctionnalités "obligatoires 1", "obligatoires 2" et "optionnelles".

Vous serez évalués en grande partie sur l'état de votre outil de suivi durant toute la semaine: dashboard clair, tâches bien découpées en cartes claires et complètes, l'état d'une carte doit être fidèle à la réalité du terrain (une carte non commencée doit être dans une colonne "todo", une carte débutée doit être dans une colonne "in progress" par exemple, etc.

### Architecture de votre application

* Le backend : un serveur REST réalisé avec Express.js.
* Le frontend : une application web réalisée avec React.js
* Les tests : des tests automatisés comprenant
    * La complétion d’un quizz avec Cypress (partie 1)
    * Les tests backend sur l’affichage et la soumission d’un quizz (partie 1)
    * Les tests unitaires React sur le formulaire de création de quiz (partie 2)

Votre travail se divise en deux parties : une partie obligatoire qui doit d’abord être réalisée, testée, etc. et une partie optionnelle que vous ne pouvez entamer que si la partie obligatoire est terminée.

### Fonctionnalités obligatoires

En premier lieu vous devez faire en sorte que votre application (backend + frontend + tests) assure les fonctionnalités qui suivent. Les tests nécessaires doivent également être réalisés.

__Partie 1__

1. Créer la base de données avec quelques de données de base (au moins 2 quiz, au moins 3 questions par quiz)
2. Afficher la liste de tous les quiz, avec l’image associée
3. Afficher la liste des quiz en fonction d’un mot-clé
4. Intégrer au moins une question dont les propositions sont des images, et les afficher
sur le frontend.
5. Permettre de jouer à un quiz et afficher la somme des points obtenus (pas
d’authentification).

__Partie 2__

1. Authentifier les utilisateurs en utilisant : http://www.passportjs.org/packages/passport-jwt/ (cf. fiche de TD TD06)
2. Limiter les possibilités des joueurs non identifiés : ils ne peuvent répondre qu’aux trois premières questions d’un quiz.
3. Permettre à un joueur authentifié de créer et de modifier ses propres quiz.
4. Interdire à un joueur authentifié de jouer à ses propres quiz.
5. Mémoriser les scores des joueurs authentifiés.

### Principe de fonctionnement

Vous pouvez vous répartir le travail et avancer en parallèle sur les différentes parties du sujet.
Lorsqu’une partie est terminée, vous devez la faire valider par un enseignant.

### Fonctionnalités optionnelles


Selon le temps qu’il vous reste lorsque les parties obligatoires sont terminées, vous pouvez proposer des fonctionnalités optionnelles. Lorsque les parties obligatoires sont terminées, et seulement à ce moment-là, vous pouvez proposer des fonctionnalités obligatoires. Lorsque vos propositions sont validées, vous pouvez les placer dans votre outil de gestion de projet, organiser votre travail puis le réaliser.
Quelques idées de fonctionnalités additionnelles que vous pourriez réaliser :
* Intégrer des questions comportant une vidéo.
* Interdire de jouer plusieurs fois le même quiz.
* Afficher les statistiques d’un quiz : nombre de personnes l’ayant fait jusqu’au bout,
meilleur score, etc.
* Afficher les statistiques de l’ensemble des quiz : les plus populaires, les plus difficiles,
etc.
* Enregistrer et afficher les statistiques des joueurs authentifiés.

### Les enseignants

Frédéric Boussemart : frederic.boussemart@univ-artois.fr
Iokanaan Goutier : iokanaan.goutier@gmail.com
Christophe Lecoutre : lecoutre@cril.fr
Nicolas Paris : nparis62@gmail.com
