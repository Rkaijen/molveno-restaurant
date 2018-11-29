'use strict';

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Hans',
  password: 'HansPass01',
  database: 'MolvenoDB'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});


function insert(name, username, email) {
  const user = {
    name: name,
    username: username,
    email: email
  };
  connection.query('INSERT INTO users SET ?', user, (err, result) => {
    if (err) throw err;

    console.log('Last insert ID:', result.insertId);
  });
}


function list() {
  connection.query('SELECT * FROM users', (err, users) => {
    if (err){
      throw err;
    }
    else {
      for(let user of users) {
        console.log(user.name);
      }
    }
  });
}


function findById(id) {
  connection.query('SELECT * FROM users where id=?', [id], (err, row) => {
    if (err) {
      throw err;
    }
    else {
      console.log(row);
    }
  });
}



function update(id, email) {
  connection.query(
    'UPDATE users SET email = ? Where ID = ?',
    [email, id],
    (err, result) => {
      if (err) throw err;

      console.log(`Changed ${result.changedRows} row(s)`);
    }
  );
}


function remove(id) {
  connection.query(
    'DELETE FROM users WHERE id = ?', [id], (err, result) => {
      if (err) throw err;
      console.log(`Deleted ${result.affectedRows} row(s)`);
    }
  );
}
