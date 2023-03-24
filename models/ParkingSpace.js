const { Schema, model } = require('mongoose');

const parkingSpaceSchema = new Schema(
    {
        spaceID:{
            type: String,
            required: true
        },
        occupied: {
            type: Boolean,
            required: true
        }

    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

module.exports = parkingSpaceSchema;