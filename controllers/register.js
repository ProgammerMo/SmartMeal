const handleRegister = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body;
    const emailLowerCase = email.toLowerCase();

    if (!name || !email || !password) {
        res.status(400).json('Please fill all information');
    }
    else if (password.length < 6) {
        res.status(400).json('Password is too short');
    }
    else if (!email.includes('@') || !email.includes('.')) {
        res.status(400).json("Email isn't correct");
    }
    else {
        bcrypt.hash(password, null, null, (err, hash) => {
            if (err) {
                res.status(400).json("Please try again");
            }

            db.transaction(trx => {
                trx.insert({ 
                    hash: hash, 
                    email: emailLowerCase
                })
                .into('login')
                .then(() => {
                    return trx('users').returning('*').insert({
                        name: name,
                        email: emailLowerCase,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
                })
                .then(trx.commit)
            .catch (trx.rollback)
            })
            .catch (() => {
                res.status(400).json("Please try again");
            }) 
        });
    }
}

module.exports = { handleRegister: handleRegister };