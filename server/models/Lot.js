const { Schema, model } = require('mongoose');

const lotSchema = new Schema(
  {
    lotName: {
      type: String,
      required: true
    },
    spaces: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Space',
      },
    ],
    
  },
 
);

const Lot = model('Lot', lotSchema);

module.exports = Lot;