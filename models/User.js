const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        user_name: {
            type: String,
        },
        password:
        {
            type: String,
        },
        license_plate:
        {
            type: String,
            required: true,
        },
        name:
        {
            type: String,
        },
        phone_number:
        {
            type: String,
        },
        make_model:
        {
            type: String,
        },
        color:
        {
            type: String,
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

module.exports = userSchema;