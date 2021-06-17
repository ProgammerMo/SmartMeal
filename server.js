const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const search = require('./controllers/search');
const api = require('./controllers/api');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 
const db = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
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

app.listen(process.env.PORT || 3001, () =>{
    console.log('Running')
})