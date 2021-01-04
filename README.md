# Create a corporate social network

## Getting started

git clone `git@github.com:marieparet/groupomania.git`

### Frontend :

```
cd front
npm install 
npm run serve
```
Make sure you have `node-sass` installed globally

### Backend :

```
cd back
npm install
nodemon
```

### Database :

Make sure you have `MySQL` installed globally

```
cd back
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

This is the 7th and last Project of the OpenClassrooms' Web Developer course, in which I had to create a corporate social network, for a fictive company.
For this project, I used below techs :
- For the server : Node.js and Express framework
- For the database : MySQL language and Sequelize ORM
- For the frontend : Vue.js (Vue Router, Vuex), Sass, Bootsrap and BootsrapVue

## What did I learn ?

Building a social network from scratch allowed me to apply all my backend and frontend knowledge to the development of an entire application. 
