const { Schema, model } = require('mongoose');

const carSchema = new Schema({

  license_plate: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
    trim: true
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
  spaces:[
    {
      type: Schema.Types.ObjectId,
      ref: 'Space',
    },
  ],
},


);

const Car = model('Car', carSchema);

module.exports = Car;

