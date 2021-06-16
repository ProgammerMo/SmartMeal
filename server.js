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
        host : 'ec2-52-19-170-215.eu-west-1.compute.amazonaws.com',
        user : 'pfhvdmsbtmpvoo',
        password : '352601895fa54d9b30d01ab877f8455df80710a3166b926ff95a2dc87cd604dc',
        database : 'd4j8aqedlhhvuj',
        uri: 'postgres://pfhvdmsbtmpvoo:352601895fa54d9b30d01ab877f8455df80710a3166b926ff95a2dc87cd604dc@ec2-52-19-170-215.eu-west-1.compute.amazonaws.com:5432/d4j8aqedlhhvuj'
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