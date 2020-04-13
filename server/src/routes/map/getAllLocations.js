const UserSession = require('../../models/UserSession');
const Location = require('../../models/Location');

module.exports = (app) => {
  app.post('/api/location/getall', async (req, res, next) => {
    const { body } = req;
    let {
      token,
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
      }, (err, locations) => {
        if (err) res.send({
          success: false,
          message: 'Error: Server error'
        });

        res.send({
          success: true,
          message: 'All places',
          places: locations
        });
      })
    })
  })
};
