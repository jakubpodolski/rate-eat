const mongoose = require('mongoose');


const UserSessionSchema = new mongoose.Schema({
    userId: {
        type: Number,
        default: 0,
    },
    timestamp: {
        type: Date,
        default: Date.now(),
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
});

export default mongoose.model('UserSession', UserSessionSchema);