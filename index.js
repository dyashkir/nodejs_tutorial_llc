var http = require('http');
var url = require('url');
var fs = require('fs');

var peopleDictionary = {};
peopleDictionary['dmytro yashkir'] = 1; //its a lie!

var phrase = [ 
      { limit:0, text: 'Your kind are not welcome here'},
      {limit:1, text: 'Have you tried turning power off and then on?'},
      {limit:2, text: 'lame joke 123'},
      {limit:10, text: 'Go away stalker!'},
      {limit:100000, text: 'something is terribly wrong'}];

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

    //first lets retrieve the number of times user attended
    var attendanceNumber = 0;
    if (peopleDictionary[name]) {  //check if name is in the dictionary
      attendanceNumber = peopleDictionary[name];
    }

    var index = 0; //start with the very first phrase
    do {
      index++;     //increment by 1
    }while ( phrase[index].limit <= attendanceNumber ); //check that user has attended enough
  
    res.end(phrase[index-1].text);
  
  }else{

    //console.dir(peopleDictionary);
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
