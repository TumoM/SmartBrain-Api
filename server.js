const express = require('express')
const bcrypt = require('bcrypt');

const app = express();
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

const port = process.env.PORT || 4000

const database = {
    users: [{
            id: '123',
            name: 'John',
            email: 'Johnmail@gmail.com',
            password: 'pass1',
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
        }
    ]
}

app.get("/", function (req, res) {
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
            return res.json("You're in!!!");
        }
    }
    res.json("Error signing in")
})

app.post("/register", function (req, res) {
    const {
        email,
        name,
        password
    } = req.body;
    bcrypt.hash(password, null, null, function (err, hash) {
        // Store hash in your password DB.
        if (err) {
            return res.status(500).json("Account creation failed.", err)
        } else {
            database.users.push({
                id: '125',
                name,
                email,
                password: hash,
                entries: 0,
                joined: new Date()
            });
            console.log("DB:", database);
            res.json(database.users[database.users.length - 1])
        }
    });

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
    for (user of database.users) {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    }
    res.status(404).json("no such user found")

})


// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });

// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(port, () => {
    console.log(`Server running on: `, port);

})