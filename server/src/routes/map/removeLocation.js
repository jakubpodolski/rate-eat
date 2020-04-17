const Point = require('../../models/Point');

module.exports = (app) => {
  app.post('/api/location/remove', async (req, res, next) => {
    const { body } = req;
    let {
      display_name, 
      type,
      userId
    } = body;

    Point.findOneAndDelete(
    {
      userId: userId,
      display_name: display_name,
      type: type
    }, (err, location) => {
      if (err) return res.send({
        success: false,
        message: "Error: Server error"
      })

      return res.send({
        success: true,
        message: "Success: Location removed"
      })
    })
  })
};
