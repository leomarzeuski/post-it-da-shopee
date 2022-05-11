const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const environment = require('../config/environment.js');
const env = environment.environment;
const app = express();
const porta = 8000;

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

app.get('/users', (req, res) => {
    con.query('SELECT * FROM users', (err, rows) => {
        if (err) {
            console.log('Erro to get users...', err);
            res.send(err).status(400);
        }

        res.send({results: rows, rows: rows.length}).status(200);
    });
});

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