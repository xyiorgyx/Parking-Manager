const { Schema, model } = require('mongoose');

const spaceSchema = new Schema(
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

const Space = model('space', spaceSchema);

module.exports = Space;