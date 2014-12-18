var Promise = require('promised-io/promise');
var Scraper = require('./scraper.js');
var Fetcher = require('./fetcher.js');

var Rightmove = module.exports = {
  forEachStation: function (block) {
    var base = 'http://www.rightmove.co.uk/property-to-rent/find.html';
    var settings = '&maxDaysSinceAdded=1'
      + '&minPrice=' + Rightmove.minPrice
      + '&maxPrice=' + Rightmove.maxPrice
      + '&minBedrooms=' + Rightmove.numBeds
      + '&maxBedrooms=' + Rightmove.numBeds
      + '&numberOfPropertiesPerPage=12'
      + '&radius=' + Rightmove.maxDistance;

    return Rightmove.tubeStations.map(function (station) {
      var url = base + '?locationIdentifier=STATION^' + station.id + settings;
      return block(station, url);
    });
  },
  maxPrice: '1400',
  minPrice: '1100',
  numBeds: '1',
  maxDistance: '0.5',
  tubeStations: [
    { id:1241, n:"Bow Road" },
    { id:1238, n:"Bow Church" },
    { id:6221, n:"Mile End" },
    { id:4583, n:"Highbury & Islington" },
    { id:1700, n:"Cambridge Heath" },
    { id:5801, n:"London Fields" },
    { id:4076, n:"Hackney Downs" },
    { id:7616, n:"Rectory Road" },
    { id:8768, n:"Stoke Newington" },
    { id:1682, n:"Caledonian Road & Barnsbury" },
    { id:4670, n:"Holloway Road" },
    { id:1679, n:"Caledonian Road" },
    { id:3515, n:"Finsbury Park" },
    { id:10100, n:"Willesden Green" },
    { id:3509, n:"Finchley Road" },
    { id:5069, n:"Kentish Town" },
    { id:9848, n:"West Hampstead" },
    { id:5045, n:"Kensal Green" },
    { id:7502, n:"Queen's Park" },
    { id:5126, n:"Kilburn Park" },
    { id:5945, n:"Maida Vale" },
    { id:9635, n:"Warwick Avenue" },
    { id:7232, n:"Pimlico" },
    { id:3050, n:"East Acton" },
    { id:10010, n:"White City" },
    { id:15065, n:"Wood Lane" },
    { id:8153, n:"Shepherd's Bush" },
    { id:4658, n:"Holland Park" },
    { id:6818, n:"Notting Hill Gate" },
    { id:6719, n:"North Greenwich" },
    { id:9485, n:"Vauxhall" },
    { id:3197, n:"Elephant & Castle" },
    { id:5345, n:"Lambeth North" },
    { id:1721, n:"Canada Water" },
    { id:8498, n:"Southwark" },
    { id:1193, n:"Borough" },
    { id:5792, n:"London Bridge" },
    { id:869, n:"Bermondsey" },
    { id:6314, n:"Monument" },
    { id:9290, n:"Tower Hill" },
    { id:9287, n:"Tower Gateway" },
    { id:5615, n:"Liverpool Street" },
    { id:140, n:"Aldgate" },
    { id:143, n:"Aldgate East" },
    { id:908, n:"Bethnal Green (Underground)" },
    { id:905, n:"Bethnal Green (Mainline)" },
    { id:10022, n:"Whitechapel" },
    { id:8726, n:"Stepney Green" }
  ]
};
