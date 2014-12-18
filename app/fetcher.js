var Request = require('request');
var Promise = require('promised-io/promise');

var Fetcher = module.exports = {
  fetch: function (url) {
    var deferred = new Promise.Deferred();
    Request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        deferred.resolve(body);
      } else {
        deferred.reject(error);
      }
    });
    return deferred;
  },
};
