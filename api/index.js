"use strict";





const api = (function(){

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
  // api.get( { table : 'tables'[, key : 'id']})
  const get = function( args, callback ){
    const table = args.table,
    key = args.key;
    if( key ){
      app.get( `/api/${table}/:${key}`, function(req, res) {

        let pointer = +req.params[ key ]

        connection.query('SELECT * FROM ${table} where ${key}=?', key, (err, rows) => {
          if (!err) {
            let record = rows[0];
            res.setHeader('Content-Type', 'application/json')
            if (record) {

              res.end(JSON.stringify(record))
            } else {

              res.status(404).end()
            }
          } else {
            throw err
          }
        })
      })
    } else {
      app.get('/api/${table}', function(req, res) {

        res.setHeader('Content-Type', 'application/json');

        connection.query('SELECT * FROM ${table}', ( err, records ) => {
          if (!err) {
            res.end( JSON.stringify(records) )
          } else {
            throw err
          }
        })
      })
    }
    if( callback ) callback();
  }

  const put = function( args, callback ){
    const table = args.table,
    fields = args.fields,
    key = args.key;
    app.put('/api/tables/:id', function(req, res) {


            let pointer = +req.params[ key ]
            let table = req.body;



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
          })
    })
  }

  return {
    get : get,
    put : put
  }
})()







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
