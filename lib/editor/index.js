var maps = require('./maps');
var parse = require('co-body');
var views = require('co-views');
var route = require('koa-route');
var serve = require('koa-static');
var koa = require('koa');
var app = module.exports = koa();

// View engine
var render = views(__dirname + '/views', {ext: 'jade'});

// Static resources
app.use(serve(__dirname + '/public'));

// Routes
app.use(route.get('/', index));
app.use(route.get('/maps', list));
app.use(route.get('/maps/:name', read));
app.use(route.post('/maps/:name', write));

function *index() {
  this.body = yield render('index');
}

function *list() {
  this.body = yield maps.list();
}

function *read(name) {
  this.body = yield maps.read(name);
}

function *write(name) {
  var content = yield parse(this);
  yield maps.write(name, content);
}

if (!module.parent) {
  app.listen(3000);
  console.log('Listening on port 3000');
}
