const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Superman2',
    database: 'todo'
});

try {
connection.connect();
}   catch(e) {
    console.log('Oops, Connection to mysql failed.');
    console.log(e)
}

const api = express();
api.use(bodyParser.json());

//This will let our program access this directory even if we move the folder around our system. Cool.
api.use(express.static(__dirname + '/public'));



api.post('/add', (req, res) => {
    console.log(req.body);
    
    connection.query('INSERT INTO tasks (description) VALUES (?)', [req.body.item], (error, results) => {
     if (error) return res.json({ error: error });
   connection.query('SELECT LAST_INSERT_ID() FROM tasks', (error, results) => {
      if (error) return res.json({ error: error });
   console.log(results);
     });
    });
   });
   
api.listen(3000, () => {
  console.log('API up and running!');
});



// api.get('/', (req, res) => {
//   console.log(req);
//   res.send('Hello, world!');
// });
