const users = require('./users');
const messages = require('./messages');
const bcrypt = require('bcrypt-nodejs');

module.exports = function(app, con, auth) {
    users(app, con, auth, bcrypt);
    messages(app, con, auth);

    app.post('/api/login', async (req, res) => {
        const {email, password} = req.body;
        if(!email || !password) return res.status(400).send('Missing fields');
    
        return con.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
            if (err) return res.status(400).send(err);
    
            if(rows.length == 0) return res.status(400).send({status: 'failed', data: 'Nenhum usuário encontrado'});
            let user = rows[0];
            if(!bcrypt.compareSync(password, user.password)) return res.status(401).send({status: 'failed', data: 'Senha Inválida'});
            delete user.password;
    
            const token = auth.createToken(user);
            return res.status(200).send({ auth: true, token: token });
        })
    })
}