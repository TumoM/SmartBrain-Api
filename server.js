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

 app = express();
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000


app.get("/", function (req, res) {
    console.log("In root route");
    res.send(database.users);
})

app.post("/signin", function (req, res) {
    const {
        email,
        password
    } = req.body;
    knex.select('email','hash').where('email','=', email).from('login')
        .then(data => {
            const hash = data[0].hash;
            const isValid = bcrypt.compareSync(password, hash)
            if (isValid){
                return knex.select().from('users')
                    .where('email','=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            }
            else{
                res.status(401).json('You shall not pass!!')
            }
        })
        .catch(err => res.status(400).json('wrong credentials'));
})

app.post("/register", function (req, res) {
    const {email,name,password} = req.body;
    const hash =  bcrypt.hashSync(password)
    knex.transaction(trx =>{
        trx.insert({
            hash,
            email
        }).into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name,
                joined: new Date()
            }).then((user) =>{
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
        .catch((err) =>{
                console.error('Bro',err);
                res.status(400).json(`Failed to register :( `);
            }) 
    

})

app.get("/profile/:id", function (req, res) {
    const id = req.params.id;
    knex.select().where({id}).from('users')
    .then((user) =>{
        if (!user.length > 0) {
            res.status(404).json("Not Found")

        }
        else{
        return res.json(user);
        }
    }).catch((err) =>{
        res.status(404).json("Error getting user")
        
    })

})

app.put('/image', (req, res) => {
    const id = req.body.id
    knex('users')
    .where('id', '=', id)
    .increment('entries',1)
    .returning('entries')
    .then((entires) =>{
        res.json(entires)
    })
    .catch((err) =>{
        console.error('Err',err);
        
        res.status(400).json('unable to get entries.')
    })

})


app.listen(port, () => {
    console.log(`Server running on: `, port);

})