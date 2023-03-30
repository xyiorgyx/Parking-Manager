const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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
        phoneNumber:
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

userSchema.pre('save', async function (next){
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
})

userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = model('user', userSchema);

module.exports = User;