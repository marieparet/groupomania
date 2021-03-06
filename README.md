# Creation of a corporate social network

## Getting started

`git clone git@github.com:marieparet/groupomania.git`

### Frontend :

```
cd frontend
npm install 
npm run serve
```

### Backend :

```
cd backend
npm install
npm start
```

### Database :

Make sure you have `MySQL` installed globally

```
cd backend
```

You'll need to verify that the username and password in the config database.json file, match your local MySQL credentials.

```
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

Then open on any web browser : http://localhost:8080/

## API documentation

https://documenter.getpostman.com/view/13023621/TVt2e4h6

## What is this project ?

I have created a corporate social network, for a fictive company.
For this project, I used below techs :
- For the server : Node.js and Express framework
- For the database : MySQL language and Sequelize ORM
- For the frontend : Vue.js (Vue Router, Vuex), Sass, Bootsrap and BootsrapVue

## What did I learn ?

This project allowed me to apply all my backend and frontend knowledge to the development of an entire application from scratch. 

## Video presentation

Here is a quick video demonstration of the app :  

<a href="http://www.youtube.com/watch?feature=player_embedded&v=48__-Lmjybg
" target="_blank"><img src="http://img.youtube.com/vi/48__-Lmjybg/0.jpg" 
alt="Miniature de la présentation vidéo de l'application" width="240" height="180" border="10" /></a>