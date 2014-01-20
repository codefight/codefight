'use strict';

function json(req, done) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(e) {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (xhr.status === 200) {
        done(null, JSON.parse(xhr.responseText));
      } else {
        done(e);
      }
    }
  };
  xhr.open(req.method, req.url, true);
  xhr.send(req.data);
}

json.get = function(url, done) {
  json({method: 'GET', url: url}, done);
};

json.post = function(url, data, done) {
  json({method: 'POST', url: url, data: data}, done);
};

var maps = {
  list: function(done) {
    json.get('/maps', done);
  },
  read: function(map, done) {
    json.get('/maps/' + map, done);
  },
  write: function(map, content, done) {
    json.post('/maps/' + map, content, done);
  }
};

function Editor(sidebar, canvas) {
  this.sidebar = new Sidebar(this, sidebar);
  this.canvas = new Canvas(this, canvas);
}

Editor.prototype = {
  refresh: function() {
    maps.list(function(err, data) {
      // Do nothing on error
      if (err) return;

      // Refresh sidebar
      this.sidebar.refresh(data.map(function(map) {
        return map.filename;
      }));
    }.bind(this));
  },
  load: function(name) {
    maps.read(name, function(err, map) {
      // Do nothing on error
      if (err) return;

      // Select the current map
      this.sidebar.select(map.filename);

      // Update visualization
      this.canvas.load(map);
    }.bind(this));
  }
};

function Sidebar(editor, elem) {
  this.editor = editor;
  this.elem = elem;
  this.active = null;
}

Sidebar.prototype = {
  _find: function(name) {
    return this.elem.querySelector('[data-map="' + name + '"]');
  },
  refresh: function(maps) {
    // Remove previous entries
    [].slice.call(this.elem.querySelectorAll('li')).forEach(function(elem) {
      elem.remove();
    });

    // Sort maps by name
    maps.sort(function(a, b) {
      return a < b ? -1 : 1;
    });

    // List maps
    for (var i = 0, n = maps.length; i < n; i++) {
      var map = maps[i];
      var elem = this.elem.appendChild(document.createElement('li'));
      elem.dataset.map = map;
      elem.innerText = map;
      elem.onclick = this.editor.load.bind(this.editor, map);
    }

    // Reselect active entry
    this.select(this.active, true);
  },
  select: function(name, skipDeselect) {
    if (!skipDeselect && this.active) this.deselect();
    if (name) {
      var entry = this._find(name);
      if (entry) {
        entry.classList.add('active');
        this.active = name;
      }
    }
  },
  deselect: function() {
    if (this.active) {
      var entry = this._find(this.active);
      if (entry) entry.classList.remove('active');
      this.active = null;
    }
  }
};

function Canvas(editor, elem) {
  this.editor = editor;
  this.tiles = elem.querySelector('canvas#tiles');
  this.grid = elem.querySelector('canvas#grid');
  this.tilesCtx = this.tiles.getContext('2d');
  this.gridCtx = this.grid.getContext('2d');
}

Canvas.TILE_SIZE = 10;

Canvas.prototype = {
  clear: function() {
    this.tilesCtx.clearRect(0, 0, this.tiles.width, this.tiles.height);
    this.gridCtx.clearRect(0, 0, this.grid.width, this.grid.height);
  },
  resize: function(width, height) {
    this.tiles.width = this.grid.width = width * Canvas.TILE_SIZE;
    this.tiles.height = this.grid.height = height * Canvas.TILE_SIZE;

    // Redraw grid
    for (var x = width; x--;) {
      this.gridCtx.moveTo(x * Canvas.TILE_SIZE, 0);
      this.gridCtx.lineTo(x * Canvas.TILE_SIZE, height * Canvas.TILE_SIZE);
    }

    for (var y = height; y--;) {
      this.gridCtx.moveTo(x * Canvas.TILE_SIZE, 0);
      this.gridCtx.lineTo(x * Canvas.TILE_SIZE, height * Canvas.TILE_SIZE);
    }
  },
  load: function(map) {
    this.resize(map.width || 30, map.height || 30);
    this.clear();
  }
};

window.onload = function() {
  var editor = new Editor(
    document.querySelector('#sidebar ul'),
    document.querySelector('#canvas')
  );

  editor.refresh();
};
