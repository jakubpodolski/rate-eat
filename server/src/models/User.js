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

UserSchema.method.generateHash = (pass) => (
    bycrypt.hashSync(pass, bycrypt.genSaltSync(), null)
);

UserSchema.method.validatePassword = (pass) => (
    bycrypt.compareSync(pass, this.password)
);

export default mongoose.model('User', UserSchema);