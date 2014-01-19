var fs = require('fs');
var path = require('path');

var mapdir = path.join(__dirname, '..', '..', 'content', 'maps');

module.exports = {
  list: function() {
    return fs.readdirSync(mapdir).filter(function(name) {
      if (name === '.' && name === '..') {
        return false;
      }

      if (path.extname(name) !== '.json') {
        return false;
      }

      return true;
    }).map(function(name) {
      return path.basename(name, '.json');
    });
  },
  read: function(name) {
    var file = path.join(mapdir, name + '.json');
    if (fs.existsSync(file)) {
      return fs.readFileSync(file);
    }

    return null;
  },
  write: function(name, content) {
    var file = path.join(mapdir, name + '.json')
    fs.writeFileSync(file, content);
  }
};
