const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
    text: {
        type: String,
        required: true,
        maxLength: 500
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    parentComment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: null 
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},
{
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model("Comment", commentSchema);
