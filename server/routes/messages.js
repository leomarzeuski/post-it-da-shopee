module.exports = function(app, con, auth){
    
    app.post('/api/messages/create', (req, res) => {
        if(auth.authenticateToken(req, res)) return;

        const sent_id = auth.getUser(req.headers['x-access-token'])
        const date = new Date()
        const {title, body, received_user_id} = req.body;

        if(!title || !body || !received_user_id) 
            return res.status(400).send({status: 'failed', data: 'Missing fields'});
    
        return con.query('INSERT INTO messages(title, body, date, received_user_id, sent_user_id) VALUES (?, ?, ?, ?, ?)', [title, body, date, received_user_id, sent_id], (err, rows) => {
            if (err) return res.status(400).send(err);
    
            return res.status(201).send({status: 'success', data: rows})
        })
    })

    app.get('/api/messages/received', (req, res) => {
        if(auth.authenticateToken(req, res)) return;

        const sent_id = auth.getUser(req.headers['x-access-token'])
    
        return con.query('SELECT * FROM messages WHERE received_user_id = ? ORDER BY date DESC', [sent_id], (err, rows) => {
            if (err) return res.status(400).send(err);
    
            return res.status(201).send({status: 'success', data: rows})
        })
    })

    app.get('/api/messages/sent', (req, res) => {
        if(auth.authenticateToken(req, res)) return;

        const sent_id = auth.getUser(req.headers['x-access-token'])
    
        return con.query('SELECT messages.*, users.name, users.email  FROM messages INNER JOIN users ON messages.received_user_id = users.id WHERE sent_user_id = ? ORDER BY date DESC', [sent_id], (err, rows) => {
            if (err) return res.status(400).send(err);
    
            return res.status(201).send({status: 'success', data: rows})
        })
    })
}