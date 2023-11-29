import express, { json } from 'express';
import bodyParser from 'body-parser'; // latest version of exressJS now comes with Body-Parser!
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

import { handleRegister } from './controllers/register';
import { handleSignin } from './controllers/signin';
import { handleProfileGet } from './controllers/profile';
import { handleImage, handleApiCall } from './controllers/image';

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
app.use(json()); // latest version of exressJS now comes with Body-Parser!

app.get('/', (req, res)=> { res.send('it is working' })
app.post('/signin', handleSignin(db, bcrypt))
app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=> {
  console.log('app is running on port ${process.env.PORT}');
})
