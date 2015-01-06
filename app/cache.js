var fs = require('fs');

var Cache = module.exports = {
  items: [],
  insert: function(key) {
    Cache.items.push(key);
  },
  exists: function(key) {
    return Cache.items.indexOf(key) > -1;
  },
  init: function() {
    fs.readFile('cache.json', function (err, data) {
      if (err) console.log(err);
      if (typeof data !== 'undefined') {
        Cache.items = JSON.parse(data);
      }
    });
    return Cache;
  },
  write: function() {
    fs.writeFile(
      'cache.json',
      JSON.stringify(Cache.items),
      function (err) {
        if (err) throw err;
      }
    );
  }
};
