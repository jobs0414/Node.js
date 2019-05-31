var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'bbangul',
  password : 'minkyo',
  port     : '3306',
  database : 'may30'
});

connection.connect();

connection.query('SELECT * from Persons', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.', err);
});

connection.end();