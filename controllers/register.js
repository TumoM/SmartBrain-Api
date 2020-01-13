const handleRegister = (req, res, knex, bcrypt) =>{
        const {email,name,password} = req.body;
        const hash =  bcrypt.hashSync(password)
        knex.transaction(trx =>{
            trx.insert({
                hash,
                email
            }).into('login')
            .returning('email')
            .then((loginEmail) => {
                return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0],
                    name,
                    joined: new Date()
                }).then((user) =>{
                    console.log('New user created:',user[0]);
                    
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
        
}

module.exports = {
    handleRegister : handleRegister
}