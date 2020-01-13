const handleImage = (req, res, knex) => {
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

}

module.exports = {
    handleImage
}