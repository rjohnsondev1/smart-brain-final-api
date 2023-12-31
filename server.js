const express = require('express');
const bodyParse = require('body-parser');
const bcrypt = require ('bcrypt-nodejs');
const cors = ('cors');
const knex = ('knex');

const register = require('./controllers/register');
//import { handleRegister } from './controllers/register';
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  // connect to your own database here:
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'jestelle',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();


app.use(cors())
app.use(express.json()); // latest version of exressJS now comes with Body-Parser!

app.get('/', (req, res)=> { res.send('it is working') })
app.post('/signin', handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, () => {
  console.log('app is running on port ${process.env.PORT}');
})
