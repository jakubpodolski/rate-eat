const UserSession = require('../../models/UserSession');

module.exports = (app) => {
  app.get('/api/account/logout', (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.findOneAndUpdate(
      {
        _id: token,
        isDeleted: false
      },
      {
        $set: {
        isDeleted: true
        }
      }, null, (err, sessions) => {
        if (err) res.send({
          success: false,
          message: 'Error: Server error'
        });
        
        return res.send({
          success: true,
          message: 'Login out!'
        });
      });
  });
}