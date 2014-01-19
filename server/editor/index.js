var express = require('express');
var maps = require('./maps');

var app = module.exports = express();

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
  res.render('index', {
    maps: maps.list()
  });
});

app.get('/map/:file', function(req, res) {
  var map = maps.read(req.params.file);
  if (map) {
    res.send(200, map);
  } else {
    res.send(404);
  }
});

app.post('/map/:file', function(req, res) {
  var file = req.params.file;
  var content = req.body.map;

  maps.write(file, content);
  res.send(200);
});

if (!module.parent) {
  app.listen(3000);
  console.log('Listening on port 3000');
}
