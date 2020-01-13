const handleRoot = (req, res, knex) => {
    knex.select().from('users')
    .then(users => {    
        res.json(users);
    })
    .catch(err =>{console.log("Could not fetch users! \n",err);
    })
}

module.exports = {
    handleRoot
}