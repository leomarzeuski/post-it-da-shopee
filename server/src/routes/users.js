
module.exports = function(app, con, auth, bcrypt){
    app.get('/api/users/all', (req, res) => {
        if(auth.authenticateToken(req, res)) return;
    
        con.query('SELECT * FROM users', (err, rows) => {
            if (err) {
                console.log('Erro to get users...', err);
                res.status(400).send(err);
            }
    
            res.status(200).send({results: rows, rows: rows.length});
        });
    });
    
    app.post('/api/users/create', async (req, res) => {
        if(auth.authenticateToken(req, res)) return;
    
        const {name, email, password, confirm_password} = req.body;
        if(!name || !email || !password || !confirm_password && (password == confirm_password)) 
            res.status(400).send({status: 'failed', data: 'Missing fields'});
    
        let pwd = await bcrypt.hash(password, 10)
    
        con.query('INSERT INTO users(name, email, password) VALUES (?, ?, ?)', [name, email, pwd], (err, rows) => {
            if (err) res.status(400).send(err);
    
            res.status(201).send({status: 'success', data: rows})
        })
    })
}