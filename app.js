/*
* File Name: app.js
* Description: This file contains server side expressJS code to open files in a local host and display mysql database
* Copyright (c) 2019: Tata Elxsi
* Authors: Hamsalekha U.V
* Creation Date: 07/02/2020
* MODIFICATION RECORD:Replced Json file with Mysl queries for inserting and modifying data in database.
*
*/

//Including modules
const mysql = require('mysql');
const express = require('express');
const path = require("path");
const http = require("http");
const request = require('request');
const app = express();
const url = "http://localhost:8000/flights";
request.get(url, (error, response, body) => {
  var json = JSON.parse(body);
  console.log(json);
});
//Creating http server
const server = http.createServer(function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");// response to allow code from any origin to access resource
  res.writeHead(200);
});
// Mysql connection with database created
var mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password@123',
  database: 'flightdb'
});
//To insert a row to the database table  directly
mysqlConnection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO flight (FlightName,LeavesFrom,ArrivesAt,Time,Price) VALUES ('Go Air', 'Russia','Indonesia','11:40:00','4300')";
  mysqlConnection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  })
  //To update a row in the database table directly
  var sql = "UPDATE flight SET FlightName= 'Gev' WHERE FlightName = 'Go Air'";
  mysqlConnection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  })
})
app.listen(8000, () => console.log('Express server is running at port no : 8000'));
app.get('/flights', (req, res) => {
  //To retrieve rows from mysql database
  mysqlConnection.query('SELECT * FROM flight', (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
});
//Redirecting to the web page after Mysql insertion
app.use(express.static('root'));
app.use('/images', express.static(__dirname + '/Images'));
app.get('/', function (req, res) {
  res.status(200)
  res.sendFile(__dirname + '/login.html');
})
app.use(express.static(path.join(__dirname, "views")));
app.get('/views/searchflight.html', function (req, res) {
  res.status(200)
  res.sendFile(__dirname + '/views/searchflight.html');
})
app.get('/views/flightdetails.html', function (req, res) {
  res.sendFile(__dirname + '/views/flightdetails.html');
})
app.get('/views/contactdetails.html', function (req, res) {
  res.sendFile(__dirname + '/views/contactdetails.html');
})
app.get('/views/payment.html', function (req, res) {
  res.sendFile(__dirname + '/views/payment.html');
})
app.get('/views/final.html', function (req, res) {
  res.sendFile(__dirname + '/views/final.html');
})
//Creating web server at the specified port
app.listen(3003, function () {
  console.log('server is working')
})

