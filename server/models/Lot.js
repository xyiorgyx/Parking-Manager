const { Schema, model } = require('mongoose');

const lotSchema = new Schema(
  {
    lotName: {
      type: String,
      required: true
    },
    lotSpaces: [
      {
        type: Schema.Types.ObjectId,
        ref: 'space',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Lot = model('lot', lotSchema);

module.exports = Lot;