var fs = require('fs');
var path = require('path');

var mapdir = path.normalize(__dirname + '/../../content/maps');

module.exports = {
  list: function() {
    return function(done) {
      var found = fs.existsSync(mapdir);
      if (found) {
        fs.readdir(mapdir, function(err, files) {
          if (err) return done(err);

          files = files.filter(function(name) {
            return path.extname(name) === '.json';
          }).map(function(name) {
            return {
              filename: path.basename(name, '.json')
            };
          });

          done(null, files);
        });
      } else {
        done(null, []);
      }
    };
  },
  read: function(name) {
    var file = mapdir + '/' + name + '.json';
    return function(done) {
      var found = fs.existsSync(file);
      if (found) {
        fs.readFile(file, function(err, content) {
          if (err) return done(err);
          try {
            content = JSON.parse(content);
            content.filename = name;
          } catch (err) {
            return done(err);
          }
          done(null, content);
        });
      } else {
        done(new Error("Not found"));
      }
    };
  },
  write: function(name, content) {
    return function(done) {
      try {
        delete content.filename;
        content = JSON.stringify(content);
      } catch (err) {
        return done(err);
      }
      fs.writeFile(mapdir + '/' + name + '.json', content, done);
    };
  }
};
