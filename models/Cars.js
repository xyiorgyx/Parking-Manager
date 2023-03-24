const { Schema, model } = require('mongoose');

const carsSchema = new Schema({

  license_plate: {
    type: String,
    required: true,
  },

  make: {
    type: String,
    required: true
  },

  model: {
    type: String,
    required: true
  },

  color: {
    type: String,
    required: true
  },

});

module.exports = carsSchema;