const UserSession = require('../../models/UserSession');
const Location = require('../../models/Location');

module.exports = (app) => {
  app.post('/api/location/save', async (req, res, next) => {
    const { body } = req;
    let {
      token,
      name, 
      lat,
      lon, 
      type
    } = body;

    if (!token) return res.send({
      success: false,
      message: "Error: Cannot find token"
    })

    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, session) => {
      if (err) res.send({
        success: false,
        message: 'Error: Server error'
      });

      let userId = session[0].userId;

      if (!userId) res.send({
        success: false,
        message: 'Error: User not found'
      });


      Location.find({
        userId: userId,
        name: name
      }, (err, location) => {
        if (location.length) return res.send({
          success: false,
          message: "Error: Location alredy saved"
        })

        const newLocation = new Location(); 

        newLocation.userId = userId;
        newLocation.name = name;
        newLocation.lat = lat;
        newLocation.lon = lon;
        newLocation.type = type;

        newLocation.save((err, user) => {
          if (err) return res.send({
              success: false,
              message: "Error: Server error"
          })
          return res.send({
              success: true,
              message: "Location saved"
          })
        })
      })
    })
  })
};
