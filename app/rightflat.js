var Rightmove = require('./rightmove.js');
var Fetcher = require('./fetcher.js');
var Scraper = require('./scraper.js');
var Promise = require('promised-io/promise');

var print = function(message) {
  return function(obj) {
    console.log(message);
    console.log(obj);
  };
};

module.exports = {
  search: function() {
    return Rightmove.forEachStation(function (station, url) {
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
    var dedupPromises = resultsPromises.map(function (mightBePromise) {
      var stationFlatsPromise = Promise.whenPromise(mightBePromise);

      stationFlatsPromise.then(function (stationFlats) {
        stationFlats.flats.map(function (flat) {
          var resultRef = flatSet[flat.link] = flatSet[flat.link] || { flat: {}, stations: [] };

          resultRef.flat = flat;
          resultRef.stations.push(stationFlats.station.n);
        });
      });
      return stationFlatsPromise;
    });

    Promise.all(dedupPromises).then(function () {
      flatSetDeferred.resolve(flatSet);
    });
    flatSetDeferred.then(print('deduplicated results'));
    return flatSetDeferred.promise;
  }
};
