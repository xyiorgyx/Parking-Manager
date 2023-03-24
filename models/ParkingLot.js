const { Schema, model } = require('mongoose');

const parkingLotSchema = new Schema(
  {
    parkingLotName: {
      type: String,
      required: true
    },
    parkingSpaces: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ParkingSpaces',
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

module.exports = parkingLotSchema;