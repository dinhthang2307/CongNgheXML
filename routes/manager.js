var express = require('express');
var router = express.Router();
var xmldom = require('xmldom').DOMParser;
var fs = require('fs');
var Mat_hang;
var Ngay;
var Ban_hang;
var Tong = 0;
var Ten_don_gia = [];
fs.readFile('./Du_lieu.xml', 'utf-8', function (err, data) {
  if (err) {
    throw err;
  }
  
  doc = new xmldom().parseFromString(data, 'application/xml');
  Ban_hang = doc.getElementsByTagName('Ban_hang');
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
  Ngay = (Ban_hang[0].getAttribute("Ngay"));
  for(var i = 0; i < Ban_hang.length; i++)
  {
    Tong += parseInt(Ban_hang[i].getAttribute("Tien"));
  }

});

/* GET customerpage*/
router.get('/', function(req, res, next) {
  res.render('manager', { Ten_don_gia: Ten_don_gia, Tong: Tong, Ngay: Ngay});
});
module.exports = router;