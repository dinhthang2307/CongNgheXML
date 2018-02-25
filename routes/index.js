var express = require('express');
var router = express.Router();
var xmldom = require('xmldom').DOMParser;
var fs = require('fs');
var genres;
fs.readFile('./books.xml', 'utf-8', function (err, data) {
  if (err) {
    throw err;
  }
  
  doc = new xmldom().parseFromString(data, 'application/xml');
  genres = doc.getElementsByTagName('genre');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: genres });
});

/* GET customerpage*/
router.get('/customer', function(req, res, next) {
  res.render('customer', { title: genres});
});

/* GET employeepage*/
router.get('/employee', function(req, res, next) {
  res.render('employee', { title: genres});
});

/* GET managerpage*/
router.get('/manager', function(req, res, next) {
  res.render('manager', { title: genres});
});
module.exports = router;
