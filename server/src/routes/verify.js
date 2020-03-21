const UserSession = require('../models/UserSession');

module.exports = (app) => {
    app.get('/api/account/verify', (req, res, next) => {
        const { query } = req;
        const { token } = query;

        UserSession.find({
            _id: token,
            isDeleted: false
        }, (err, sessions) => {
            if (err) res.send({
                success: false,
                message: 'Error: Server error'
            });

            if (sessions.length != 1) res.send({
                success: false,
                message: 'Error: Invalid'
            });

            return res.send({
                success: true,
                message: 'Verified'
            });
        });
    });
}