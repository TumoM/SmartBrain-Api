const express = require('express')
const bcrypt = require('bcrypt-nodejs');
var cors = require("cors");
const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'tumom',
      password : 'toor',
      database : 'smart-brain'
    }
  });

const root = require('./controllers/root')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')




 app = express();
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000


app.get("/", (req, res) => { root.handleRoot(req,res,knex)})

app.post("/signin", (req,res) =>{ signin.handleSignin(req,res,knex,bcrypt)})

app.post("/register", (req,res) =>{ register.handleRegister(req, res, knex, bcrypt)})

app.get("/profile/:id", (req, res) => { profile.handleProfile(req,res,knex)})

app.put('/image', (req, res) => { image.handleImage(req,res,knex)})


app.listen(port, () => {
    console.log(`Server running on: `, port);

})