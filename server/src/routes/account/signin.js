const User = require('../../models/User.js')
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
    app.post('/api/account/signin', (req, res, next) => {
        const { body } = req;
        let {
            email,
            password
        } = body;

        if (!email) return res.send({
            success: false,
            message: "Error: Email cannot be null"
        })

        if (!password) return res.send({
            success: false,
            message: "Error: Password cannot be null"
        })

        User.find({
            email: email
        }, (err, users) => {
            if (err) return res.send({
                success: false,
                message: "Error: Server error"
            })

            if (users.length != 1) return res.send({
                success: false,
                message: "Error: Invalid"
            })

            let user = users[0]

            if (!user.validatePassword(password)) return res.send({
                success: false,
                message: "Error: Invalid"
            })

            const userSession = new UserSession();
            userSession.userId = user._id;

            userSession.save((err, doc) => {
                if (err) return res.send({
                    success: false,
                    message: "Error: Server error"
                })

                return res.send({
                    success: true,
                    message: "Signin valid",
                    token: doc._id
                })
            })
        })
    })
};