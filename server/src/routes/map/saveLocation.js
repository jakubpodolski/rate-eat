const UserSession = require('../../models/UserSession');
const Point = require('../../models/Point');

module.exports = (app) => {
  app.post('/api/location/save', async (req, res, next) => {
    const { body } = req;
    let {
      token,
      display_name, 
      lat,
      lon, 
      address,
      type, 
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
      
      Point.find({
        userId: userId,
        display_name: display_name
      }, (err, location) => {
        if (location.length) return res.send({
          success: false,
          message: "Error: Location alredy saved"
        })
        
        const newPoint = new Point(); 

        newPoint.userId = userId;
        newPoint.display_name = display_name;
        newPoint.lat = lat;
        newPoint.lon = lon;
        newPoint.type = type;
        newPoint.address = address;

        newPoint.save((err, user) => {
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
