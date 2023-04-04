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
        parkingLot: {
            type:String,
            required:true
        },
        occupant: {
            type:String
        }
    },
);

const Space = model('Space', spaceSchema);

module.exports = Space;