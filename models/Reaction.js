const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            min: [1, "Please enter your reaction!"],
            max: [280, "This isn\'t the place for your thesis!"],
        },
        userName: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // getter method to format timestamp on query
        }
    }
);

module.exports = reactionSchema;