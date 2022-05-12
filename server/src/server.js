require("dotenv-safe").config()

const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const app = express();
const porta = 8000;
const auth = require('./middleware.js');

const con = mysql.createConnection({
    host: process.env.MYSQL_HOST, 
    user: process.env.MYSQL_USER, 
    password: process.env.MYSQL_PWD, 
    database: process.env.MYSQL_DB, 
    port: process.env.MYSQL_PORT, 
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

require('./routes')(app, con, auth);

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