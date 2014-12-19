var Rightmove = require('./rightmove.js');
var Fetcher = require('./fetcher.js');
var Scraper = require('./scraper.js');
var Promise = require('promised-io/promise');

var print = function(station) {
  return function(flats) {
    console.log('Found ' + flats.length + ' flats in ' + station.n);
    console.log(flats);
  };
};

module.exports = {
  search: function() {
    Rightmove.forEachStation(function (station, url) {
      var flatsFound = Promise.whenPromise(url)
        .then(Fetcher.fetch)
        .then(Scraper.scrape, Scraper.orReturnEmpty)
        .then(print(station));

      return '';
    });
  }
};
