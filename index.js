var http = require('http');
var url = require('url');
var fs = require('fs');

var peopleDictionary = {};
peopleDictionary['dmytro yashkir'] = 1; //its a lie!


fs.readdir('csv_data', function(err, files) {
  
  files.forEach( function (fileName) {
    fs.readFile('csv_data/' + fileName, 'utf-8', function( err, data){
      var names = data.split(',');
      
      names.forEach( function (name) {
        name = name.trim();
        if (peopleDictionary[name]){
          peopleDictionary[name]++;
        }else{
          peopleDictionary[name] = 1;
        }
      });

    });
  });

});


http.createServer(function (req, res) {
  
  var parsedUrl = url.parse(req.url, parseQueryString=true);

  if (parsedUrl.query.userName) {
    var name = parsedUrl.query.userName.trim();

    if (peopleDictionary[name]) {
      res.end(name + ' has attended ' + peopleDictionary[name] + ' times');
    }else{
      res.end(name + ' never attended :(');
    }
  }else{

    console.dir(peopleDictionary);
    var page =
    '<!DOCTYPE html>'+
    '<form>' +
    '<input id=userName name=userName placeholder="enter name" required>'+
    '<button type=submit>Do it!</button>'+
    '</form>';
    
    res.end(page);
  }
}).listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');
