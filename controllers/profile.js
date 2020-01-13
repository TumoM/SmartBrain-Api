const handleProfile = (req, res, knex) => {
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

}

module.exports = {
    handleProfile
}