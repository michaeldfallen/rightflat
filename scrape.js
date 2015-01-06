var rightflat = require('./app/rightflat.js');

var results = require('./testdata.js').rightmoveResults;

//var results = rightflat.search()
var cleanResults = rightflat.deduplicateAndFilter(results);
rightflat.email(cleanResults);
