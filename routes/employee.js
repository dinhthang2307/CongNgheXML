var express = require('express');
var router = express.Router();
var xmldom = require('xmldom').DOMParser;
var fs = require('fs');
var Mat_hang;
var Ban_hang;
var Tong = 0;

//ten don gia variable
var Ten_don_gia = [];
//bien luu so luong san pham
var So_Luong=0;



fs.readFile('./Du_lieu.xml', 'utf-8', function (err, data) {
  //quang loi
  if (err) {
    throw err;
  }
  
  //parse xml
  doc = new xmldom().parseFromString(data, 'application/xml');
  //lay referemnce tag ban hang
  Ban_hang = doc.getElementsByTagName('Ban_hang');
  //lay reference tag mat hang
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

  for(var i = 0; i < Ban_hang.length; i++)
  {
    //tinh tong tien
    Tong += parseInt(Ban_hang[i].getAttribute("Tien"));
  }

});

////Save To XML
 fs.writeFile('./Du_lieu.xml', 'utf-8',function(err, data){
       //quang loi
  if (err) {
    throw err;
  }
  //parse xml
  doc = new xmldom().parseFromString(data, 'application/xml');
 });


 //doc su kien click button
 //doc gia tri duoc luu trong text box
 //Save xuongs xml
 function ClickEvent(maso){
   var string_So_Luong="";
   //lay string text box
  string_So_Luong=document.getElementById(maso.ToString()).value;
  //parse to int
  So_Luong = parseInt(string_So_Luong);
  

 }

router.get('/detail/:Ma_so_mat_hang', restrict, function(req, res){
  console.log(req.params);
});

/* GET customerpage*/
router.get('/', function(req, res, next) {
  res.render('employee', { Ten_don_gia: Ten_don_gia, Tong: Tong});
});
module.exports = router;