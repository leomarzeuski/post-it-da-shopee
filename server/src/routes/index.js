const users = require('./users');
const bcrypt = require('bcrypt');

module.exports = function(app, con, auth) {
    users(app, con, auth, bcrypt);

    app.post('/api/login', async (req, res) => {
        const {email, password} = req.body;
        if(!email || !password) res.status(400).send('Missing fields');
    
        let pwd = await bcrypt.hash(password, 10)
        con.query('SELECT * FROM users WHERE email = ?', [email, pwd], (err, rows) => {
            if (err) res.status(400).send(err);
    
            if(rows.length == 0) res.status(400).send({status: 'failed', data: 'Nenhum usuário encontrado'});
            let user = rows[0];
            if(!bcrypt.compareSync(password, user.password)) res.status(401).send({status: 'failed', data: 'Senha Inválida'});
            delete user.password;
    
            const token = auth.createToken(user);
            return res.status(200).send({ auth: true, token: token });
        })
    })
}