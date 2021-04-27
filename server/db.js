const mysql = require('mysql');

// Create connection
const database = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : 'NirmitD1!',
    database : 'nughiwebdb'
});

module.exports.database = database;
