var Rightmove = require('./rightmove.js');
var Fetcher = require('./fetcher.js');
var Scraper = require('./scraper.js');
var Emailer = require('./emailer.js');
var Cache = require('./cache.js').init();
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
  deduplicateAndFilter: function (resultsPromises) {
    var flatSetDeferred = new Promise.Deferred();
    var flatSet = {};
    var dedupPromises = resultsPromises.map(function (mightBePromise) {
      var stationFlatsPromise = Promise.whenPromise(mightBePromise);

      stationFlatsPromise.then(function (stationFlats) {
        stationFlats.flats.map(function (flat) {
          var seenit = Cache.exists(flat.link);
          if (seenit == false) {
            var resultRef = flatSet[flat.link] = flatSet[flat.link] || { flat: {}, stations: [] };

            resultRef.flat = flat;
            resultRef.stations.push(stationFlats.station.n);
          }
        });
      });
      return stationFlatsPromise;
    });

    Promise.all(dedupPromises).then(function () {
      for(key in flatSet) {
        Cache.insert(key);
      }
      flatSetDeferred.resolve(flatSet);
      Cache.write();
    });
    return flatSetDeferred.promise;
  },
  email: function(maybePromise) {
    Promise
      .whenPromise(maybePromise)
      .then(function (results) {
        var flatsFound = Object.keys(results).length;
        var html = "Found <i>" + flatsFound + "</i> flats" + "<br/>";
        for (key in results) {
          var result = results[key];
          var nearTubes = result.stations.reduce(function(previousValue, currentValue) {
            return previousValue + ', ' + currentValue;
          });
          html = html + '<hr />' +
            '<a href="' + result.flat.link + '">' +
            '  <b>' + result.flat.address + '</b>' +
            '</a>' +
            '<p>' + result.flat.price + '</p>' +
            '<p>Nearby tubes: ' + nearTubes + '</p>' +
            '<a href="' + result.flat.link + '">' +
            '<img src="' + result.flat.photo + '" width="100%">' +
            '</a>'
        }
        if (flatsFound > 0) {
          Emailer.send(html);
        }
      });
  }
};
