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
        name:
        {
            type: String,
        },
        phone_number:
        {
            type: String,
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