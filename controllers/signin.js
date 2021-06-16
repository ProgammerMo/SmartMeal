const handleSignin = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    db.select('hash').from('login').where('email', '=', email)
    .then( hash => {
        bcrypt.compare(password, hash[0].hash, function(err, pas) {
            if (err) {
                res.status(400).json("Wrong credentials");
            }
            
            if (pas) {
                db.select('*').from('users').where('email', '=', email)
                .then(user => {
                    res.json(user[0]);
                })
                .catch(() => {
                    res.status(400).json("Wrong credentials");
                })
            }
            else {
                res.status(400).json("Wrong credentials");
            }
        });
    })
    .catch(() => {
        res.status(400).json("Wrong credentials");
    })
}

module.exports = { handleSignin: handleSignin };