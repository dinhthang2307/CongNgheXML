var express = require('express');
var router = express.Router();
var xmldom = require('xmldom').DOMParser;
var fs = require('fs');
var Mat_hang;
var Ten_don_gia = [];
var Ten = [];
var Don_gia = [];
fs.readFile('./Du_lieu.xml', 'utf-8', function (err, data) {
  if (err) {
    throw err;
  }
  
  doc = new xmldom().parseFromString(data, 'application/xml');
  Mat_hang = doc.getElementsByTagName('Mat_hang');
  for(var i = 0; i < Mat_hang.length; i++)
  {
    var temp = {
      "Ten": Mat_hang[i].getAttribute("Ten"),
      "Don_gia": Mat_hang[i].getAttribute("Don_gia_Ban"),
      "Ma_so": Mat_hang[i].getAttribute("Ma_so")
    }
    Ten_don_gia.push(temp);
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: Mat_hang });
});

/* GET customerpage*/
router.get('/customer', function(req, res, next) {
  res.render('customer', { Ten_don_gia: Ten_don_gia});
});

/* GET employeepage*/
router.get('/employee', function(req, res, next) {
  res.render('employee', { title: Mat_hang});
});

/* GET managerpage*/
router.get('/manager', function(req, res, next) {
  res.render('manager', { title: Mat_hang});
});
module.exports = router;
