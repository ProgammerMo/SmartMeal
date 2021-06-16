const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const search = require('./controllers/search');
const api = require('./controllers/api');
const db = require('knex')({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'password123123#',
        database : 'Smart-Meal'
    }
});

const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) =>{
    res.json('OK');
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt); })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt); })

app.put('/search/', (req, res) => { search.handleSearch(req, res, db); })

app.get('/meals/:calories', (req, res) => { api.fetchMeals(req, res); })

app.get('/meal/:meal', (req, res) => { api.fetchMealImage(req, res); })

app.listen('3001', () =>{
    console.log('app running')
})