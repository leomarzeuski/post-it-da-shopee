module.exports = function(app, con){
    
    app.post('/api/cards/new', (req, res) => {
        let {title, body, date} = req.body;

        if(!title || !body || !date) 
            return res.status(400).send({status: 'failed', data: 'Missing fields'});
    
        return con.query('INSERT INTO cards(title, body, date) VALUES (?, ?, ?)', [title, body, date], (err, rows) => {
            if (err) return res.status(400).send(err);
    
            return res.status(201).send({status: 'success', data: rows})
        })
    })

    app.get('/api/cards/:date', (req, res) => {
        const {date} = req.params;

        return con.query('SELECT * FROM cards WHERE date = ? ORDER BY date DESC', [date], (err, rows) => {
            if (err) return res.status(400).send(err);
    
            return res.status(201).send({status: 'success', data: rows})
        })
    })
}