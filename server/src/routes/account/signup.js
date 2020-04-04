const User = require('../../models/User.js')

module.exports = (app) => {
    app.post('/api/account/signup', (req, res, next) => {
        const { body } = req;
        let {
            email,
            login,
            password
        } = body;

        if (!email) return res.send({
            success: false,
            message: "Error: Email cannot be null"
        });

        if (!login) return res.send({
            success: false,
            message: "Error: Login cannot be null"
        });

        if (!password) return res.send({
            successs: false,
            message: "Error: Password cannot be null"
        });

        User.find({
            email: email
        }, (err, existingUser) => {
            if (err) return res.send({
                success: false,
                message: "Error: Server error"
            })
            else if (existingUser.length) return res.send({
                success: false,
                message: "Error: User exists"
            })

            const newUser = new User();
            
            newUser.email = email;
            newUser.login = login;
            newUser.password = newUser.generateHash(password);

            newUser.save((err, user) => {
                if (err) return res.send({
                    success: false,
                    message: "Error: Server error"
                })
                return res.send({
                    success: true,
                    message: "User created"
                })
            })
        })
    })
}