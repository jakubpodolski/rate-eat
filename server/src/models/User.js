const mongoose = require('mongoose');
const crypro = require('crypto');

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

UserSchema.method.generateHash = (pass) =>  crypro.createHash('sha256').update(pass);

export default mongoose.model('User', UserSchema);