const { Schema, model } = require('mongoose');

const spaceSchema = new Schema(
    {
        spaceName:{
            type: String,
            required: true
        },
        occupied: {
            type: Boolean,
            default:false,
            required: true
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

const Space = model('space', spaceSchema);

module.exports = Space;