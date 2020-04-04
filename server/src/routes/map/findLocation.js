const fetch = require('node-fetch');
const apiKey = require('./apiKey');

const options = {
  apiKey: apiKey.locationIQKey,
  endpoint: 'https://eu1.locationiq.com/v1/search.php'
};

const voivodeship = 'Lesser Poland Voivodeship';

const endpointGenerator = (query) => (
  `${options.endpoint}?key=${options.apiKey}&q=${query.replace(" ", "%20")}&format=json`
)

module.exports = (app) => {
  app.post('/api/location/find', async (req, res, next) => {
    const { body } = req;
    let {
      place
    } = body;

    if (!place) return res.send({
      success: false,
      message: "Error: Place cannot be null"
    })

    

    const foundPlaces = await fetch(endpointGenerator(place))
      .then(res => res.json())
      .then(res => res)
      .catch(err => console.log(err));

    if (!foundPlaces) return res.send({
      success: false,
      message: "Error: No such place"
    })

    // Limit places to Lesser Poland

    res.send({
      success: true,
      message: "Found places",
      locations: foundPlaces.filter(place => place.display_name.includes(voivodeship))
    })

  })
};
