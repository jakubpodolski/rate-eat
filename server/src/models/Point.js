const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
    userId: {
      type: String,
      default: '',
    },
    display_name: {
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
    address: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
});

module.exports = mongoose.model('Point', PointSchema);