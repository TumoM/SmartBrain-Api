const express = require('express')
const bcrypt = require('bcrypt-nodejs');
var cors = require("cors");

const app = express();
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000

const database = {
    users: [{
            id: '123',
            name: 'John',
            email: 'john@mail',
            password: '1',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'Sallymail@gmail.com',
            password: 'pass2',
            entries: 0,
            joined: new Date()
        },
        {
            id: '125',
            name: 'test',
            email: 'test@mail',
            password: 'pas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get("/", function (req, res) {
    console.log("In root route");
    res.send(database.users);
})

app.post("/signin", function (req, res) {
    const {
        email,
        password
    } = req.body;
    
    for (user of database.users) {
        if (email === user.email &&
            password === user.password) {                
            return res.json(user);
        }
    }
    res.status(400).json("Error signing in")
})

app.post("/register", function (req, res) {
    const {
        email,
        name,
        password
    } = req.body;
    database.users.push({
        id:'125',
        name,
        email,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length-1])

})

app.get("/profile/:id", function (req, res) {
    const id = req.params.id;
    for (user of database.users) {
        if (user.id === id) {
            found = true;
            return res.json(user)
        }
    }
    res.status(404).json("no such user found")

})

app.put('/image', (req, res) => {
    const id = req.body.id
    let found = false;
    for (user of database.users) {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    }
    if (!found) {
    res.status(404).json("no such user found")
        
    }

})


app.listen(port, () => {
    console.log(`Server running on: `, port);

})