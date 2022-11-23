// EMAIL
// email validation via mongoose

// FRIENDS
// Schema Array references User model

const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        userName: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // figure out validation
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        friends: [],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

const User = model('user', userSchema);

module.exports = User;