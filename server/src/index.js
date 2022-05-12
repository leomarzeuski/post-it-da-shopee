const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const bcrypt = require('bcrypt');
const app = express();
const environment = require('../config/environment.js');
const env = environment.environment;

const porta = 8000;
const saltRounds = 10;

const con = mysql.createConnection({
    host: env.host, 
    user: env.user, 
    password: env.password, 
    database: env.database, 
    port: 3306, 
    ssl: {
        ca: fs.readFileSync("./config/ssl.crt.pem")
    }
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

con.connect((err) => {
    if (err) {
        console.log('Erro connecting to database...', err);
        return
    }

    console.log('Connection established!');
});

app.get('/api/users/all', (req, res) => {
    con.query('SELECT * FROM users', (err, rows) => {
        if (err) {
            console.log('Erro to get users...', err);
            res.status(400).send(err);
        }

        res.status(200).send({results: rows, rows: rows.length});
    });
});

app.post('/api/users/create', async (req, res) => {
    const {name, email, password, confirm_password} = req.body;
    if(!name || !email || !password || !confirm_password && (password == confirm_password)) 
        res.status(400).send('Missing fields');

    let pwd = await bcrypt.hash(password, saltRounds)

    con.query('SELECT * FROM users', (err, rows) => {
        if (err) res.status(400).send(err);

        res.status(201).send({status: 'success', data: rows})
    })
})

app.post('/api/login', async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) res.status(400).send('Missing fields');

    let pwd = await bcrypt.hash(password, saltRounds)
    con.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, pwd], (err, rows) => {
        if (err) res.status(400).send(err);

        res.status(200).send({status: 'success', data: rows})
    })
})

app.listen(porta, () => console.log(`Listening on ${porta}`));
app.on("close", function() {
    con.end((err) => {
        if(err) {
            console.log('Erro to finish connection...', err);
            return 
        }
        console.log('The connection was finish...');
    });
});