var Rightmove = require('./rightmove.js');
var Fetcher = require('./fetcher.js');
var Scraper = require('./scraper.js');
var Promise = require('promised-io/promise');

module.exports = {
  search: function() {
    Rightmove.forEachStation(function (station, url) {
      console.log('Searching ' + station.n + ' on Rightmove');

      var flatsFound = Promise.whenPromise(url)
        .then(Fetcher.fetch)
        .then(Scraper.scrape, Scraper.orReturnEmpty)
        .then(console.log);

      return '';
    });
  }
};
