const NodeGeocoder = require('node-geocoder');
const apiKey = require('./apiKey');

const options = {
  provider: 'locationiq',
  apiKey: apiKey.locationIQKey
};

const geocoder = NodeGeocoder(options);

module.exports = (app) => {
  app.get('/api/location/find', (req, res, next) => {
    
    geocoder.geocode('wietnam restauracja')
      .then(function(res) {
        console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      });
      
  })
};
