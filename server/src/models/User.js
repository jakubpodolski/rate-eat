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

UserSchema.methods.generateHash = (pass) => (
    bycrypt.hashSync(pass, bycrypt.genSaltSync(), null)
);

UserSchema.methods.validatePassword = (pass) => (
    bycrypt.compareSync(pass, this.password)
);

module.exports = mongoose.model('User', UserSchema);