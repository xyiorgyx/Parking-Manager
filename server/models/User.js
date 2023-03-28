const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required:true

        },
        password:
        {
            type: String,
            required:true

        },
        name:
        {
            type: String,
            required:true

        },
        phone_number:
        {
            type: String,
            required:true

        },
        email:
        {
            type:String,
            required:true
        },
        cars: [
            {
              type: Schema.Types.ObjectId,
              ref: 'car',
            },
          ],
          spaces: [
            {
              type: Schema.Types.ObjectId,
              ref: 'space',
            },
          ],
          paid: {
            type: Boolean
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const User = model('user', userSchema);

module.exports = User;