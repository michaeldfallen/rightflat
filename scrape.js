var rightflat = require('./app/rightflat.js');


var results = rightflat.search()
var cleanResults = rightflat.deduplicateAndFilter(results);
