const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    userId: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    lat: {
      type: String,
      default: '',
    },
    lon: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
});

module.exports = mongoose.model('Location', LocationSchema);