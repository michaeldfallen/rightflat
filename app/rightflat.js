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
    var results = Rightmove.forEachStation(function (station, url) {
      var deferred = new Promise.Deferred();
      var flatsFound = Promise.whenPromise(url)
        .then(Fetcher.fetch)
        .then(Scraper.scrape, Scraper.orReturnEmpty)
        .then(function (flats) {
          deferred.resolve({
            'flats': flats,
            'station': station
          });
        }, function (err) {
          deferred.resolve({
            'flats': [],
            'station': station
          });
        });

      return deferred.promise;
    });
  },
  deduplicateResults: function (resultsPromises) {
    var flatSetDeferred = new Promise.Deferred();
    var flatSet = {};
    resultsPromises.map(function (stationFlatsPromise) {
      stationFlatsPromise.then(function (stationFlats) {
        stationFlats.flats.map(function (flat) {
          //Add the flat to the flatSet
          //Add the station to the flats station array
          //Might need to check if it exists first
        });
      });
    });
    return flatSetDeferred.promise;
  }
};
