const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        default: ''
    },
    login: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },

});

UserSchema.methods.generateHash = function (pass) {
    return bycrypt.hashSync(pass, bycrypt.genSaltSync(), null)
};

UserSchema.methods.validatePassword = function (pass) {
    return bycrypt.compareSync(pass, this.password)
};

module.exports = mongoose.model('User', UserSchema);