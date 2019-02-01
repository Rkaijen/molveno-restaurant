"use strict";


const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const connection = mysql.createConnection({
  host: '185.87.187.148',
  user: 'robkai1q_molvenodb',
  password: 'mcrajmolveno2019',
  database: 'robkai1q_molvenodb'
});

app.get('/api/tables', function(req, res) {

  res.setHeader('Content-Type', 'application/json');

  connection.query('SELECT * FROM tables', (err, users) => {
    if (!err) {
      res.end(JSON.stringify(users));
    } else {
      throw err;
    }
  });
});

app.get('/api/tables/:id', function(req, res) {

  let id = +req.params.id

  connection.query('SELECT * FROM tables where id=?', id, (err, rows) => {
    if (!err) {
      let table = rows[0];
      res.setHeader('Content-Type', 'application/json')
      if (table) {

        res.end(JSON.stringify(user));
      } else {

        res.status(404).end();
      }
    } else {
      throw err;
    }
  });
});

app.put('/api/tables/:id', function(req, res) {


        let id = +req.params.id
        let table = req.body;

        //TODO: aanpassen definitieve velden 

        connection.query(
          'UPDATE tables SET nr, chairs=?,wheelchair=?, status=? Where id = ?',
          [table.chairs, table.wheelchair, table.status, id],
          (err, result) => {
            if (!err) {

              connection.query('SELECT * FROM tables where id=?', [id], (err, rows) => {
                if (!err) {


                  let table = rows[0];


                  if (table) {
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify(user));
                  } else {
                    res.setHeader('Content-Type', 'application/json')
                    res.status(404).end();
                  }
                } else {
                  throw err;
                }
              });
            }
            else {
              throw err;
            }
      });
});

app.delete('/api/tables/:id', function(req, res) {
  let id = +req.params.id;

  connection.query(
    'DELETE FROM tables WHERE id = ?', [id], (err, result) => {
      if (!err) {

        res.status(204).end();
      }
      else {
        throw err;
      }
    }
  );
});
