var Cheerio = require('cheerio');

var cleanString = function (str) {
  return str.replace('\r', '').replace('\n', '');
}

var Scraper = module.exports = {
  orReturnEmpty: function (error) {
    console.log('an error occurred ' + error);
    return [];
  },
  scrape: function (html) {
    var $ = Cheerio.load(html);
    var flatList = $('li.summary-list-item');
    var flats = flatList.map(function (i, flat) {
      var address = $('span.displayaddress strong', flat).text();
      var photo = $('img', flat).attr('src');
      var price = $('div.price-new a', flat).first().text();
      var link = $('div.price-new a', flat).attr('href');
      return {
        'address' : cleanString(address),
        'photo' : photo,
        'price' : cleanString(price),
        'link' : 'http://www.rightmove.co.uk' + link
      };
    }).get();
    return flats;
  },
}
