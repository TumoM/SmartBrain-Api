const handleSignin = (req, res, knex, bcrypt) =>{
    const {
        email,
        password
    } = req.body;
    if (!email|| !password) {
        return res.status(400).json("incorrect form submission")
    }
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
}

module.exports = {
    handleSignin
}