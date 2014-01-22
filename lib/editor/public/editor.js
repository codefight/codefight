'use strict';

// DOM helper
// ----------

var $ = function(context, selector) {
  if (!selector) {
    selector = context;
    context = document;
  }

  return context.querySelector(selector);
};

$.all = function(context, selector) {
  if (!selector) {
    selector = context;
    context = document;
  }

  return document.querySelectorAll(selector);
};

$.show = function(elem) {
  elem.style.display = 'block';
};

$.hide = function(elem) {
  elem.style.display = 'none';
};

// JSON helper
// -----------

function json(req, done) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function(e) {
    // Waits until the request has complete.
    if (xhr.readyState === 4) {
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

// Processes a `GET` request.
json.get = function(url, done) {
  json({method: 'GET', url: url}, done);
};

// Processes a `POST` request.
json.post = function(url, data, done) {
  json({method: 'POST', url: url, data: data}, done);
};

// Maps service
// ------------

var Maps = {
  // Lists all created maps.
  list: function(done) {
    json.get('/maps', done);
  },
  // Gets the content of the specified map.
  read: function(map, done) {
    json.get('/maps/' + map, done);
  },
  // Saves the specified map.
  write: function(map, content, done) {
    json.post('/maps/' + map, content, done);
  }
};

// Editor component
// ----------------

function Editor() {
  this.properties = new Properties(this);
  this.sidebar = new Sidebar(this);
  this.toolbar = new Toolbar(this);
  this.canvas = new Canvas(this);
}

Editor.prototype = {
  // Requests the map list.
  refresh: function() {
    Maps.list(function(err, data) {
      // Do nothing on error
      if (err) return;

      // Refresh sidebar
      this.sidebar.refresh(data.map(function(map) {
        return map.filename;
      }));
    }.bind(this));
  },
  // Loads the specified map.
  load: function(name) {
    Maps.read(name, function(err, map) {
      // Do nothing on error
      if (err) return;

      // Select the current map
      this.sidebar.select(map.filename);

      // Update protperties editor
      this.properties.load(map);

      // Update visualization
      this.canvas.load(map);

      // Display the editor
      this.show();
    }.bind(this));
  },
  configure: function(config) {
    console.log(config);
  },
  show: function() {
    this.toolbar.show();
    this.canvas.show();
  },
  hide: function() {
    this.toolbar.hide();
    this.canvas.hide();
  }
};

// Sidebar component
// -----------------

function Sidebar(editor) {
  this.editor = editor;
  this.elem = $('#sidebar ul');
  this.active = null;
}

Sidebar.prototype = {
  _find: function(name) {
    return $(this.elem, '[data-map="' + name + '"]');
  },
  // Refreshs items.
  refresh: function(maps) {
    // Remove previous entries
    [].slice.call($.all(this.elem, 'li')).forEach(function(elem) {
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
  // Selects specified item.
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
  // Deselects active item.
  deselect: function() {
    if (this.active) {
      var entry = this._find(this.active);
      if (entry) entry.classList.remove('active');
      this.active = null;
    }
  }
};

// Toolbar component
// -----------------

function Toolbar(editor) {
  this.editor = editor;
  this.elem = $('#toolbar');

  $(this.elem, 'button.configure').onclick = function() {
    this.editor.properties.open();
  }.bind(this);
}

Toolbar.prototype = {
  show: function() {
    $.show(this.elem);
  },
  hide: function() {
    $.hide(this.elem);
  }
};

// Canvas component
// ----------------

function Canvas(editor) {
  this.editor = editor;
  this.elem = $('#canvas');
  this.tiles = $('canvas#tiles');
  this.grid = $('canvas#grid');
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

    // Configures grid styles.
    // These are inherited from the CSS definitions.
    this.gridCtx.strokeStyle = window.getComputedStyle(this.grid).getPropertyValue('border-color');
    this.gridCtx.lineWidth = 1;

    // Redraws grid
    for (var x = 1; x < width; x++) {
      this.gridCtx.beginPath();
      this.gridCtx.moveTo(x * Canvas.TILE_SIZE + 0.5, 0);
      this.gridCtx.lineTo(x * Canvas.TILE_SIZE + 0.5, height * Canvas.TILE_SIZE);
      this.gridCtx.closePath();
      this.gridCtx.stroke();
    }

    for (var y = 1; y < height; y++) {
      this.gridCtx.beginPath();
      this.gridCtx.moveTo(0, y * Canvas.TILE_SIZE + 0.5);
      this.gridCtx.lineTo(width * Canvas.TILE_SIZE, y * Canvas.TILE_SIZE + 0.5);
      this.gridCtx.closePath();
      this.gridCtx.stroke();
    }
  },
  load: function(map) {
    this.clear();
    this.resize(map.width || 30, map.height || 30);
  },
  show: function() {
    $.show(this.elem);
  },
  hide: function() {
    $.hide(this.elem);
  }
};

// Modal component
// ---------------

function Modal(elem) {
  this.overlay = $('#overlay');
  this.elem = elem;
}

Modal.prototype = {
  // Displays the modal.
  open: function() {
    $.show(this.elem);
    $.show(this.overlay);
  },
  // Hides the modal.
  close: function() {
    $.hide(this.elem);
    $.hide(this.overlay);
  }
};

// Map properties modal
// --------------------

function Properties(editor) {
  Modal.call(this, $('#properties'));
  this.editor = editor;

  // Inputs
  this.filename = $(this.elem, 'input.filename');
  this.width    = $(this.elem, 'input.width');
  this.height   = $(this.elem, 'input.height');

  // Buttons
  $(this.elem, 'button.save').onclick = this.save.bind(this);
  $(this.elem, 'button.cancel').onclick = this.close.bind(this);
}

Properties.prototype = Object.create(Modal.prototype);
Properties.prototype.constructor = Properties;

Properties.DEFAULT_WIDTH = 30;
Properties.DEFAULT_HEIGHT = 30;

Properties.prototype.load = function(map) {
  this.filename.value = map.filename;
  this.width.value    = map.width  || Properties.DEFAULT_WIDTH;
  this.height.value   = map.height || Properties.DEFAULT_HEIGHT;
};

Properties.prototype.save = function() {
  // Applies configuration
  this.editor.configure({
    filename: this.filename.value,
    width:    parseInt(this.width.value),
    height:   parseInt(this.height.value)
  });

  // Closes the modal
  this.close();
};

// Bootstrap
// ---------

// Waits until the `window` is loaded.
window.onload = function() {
  // Starts the editor.
  window.editor = new Editor();
  window.editor.refresh();
};
