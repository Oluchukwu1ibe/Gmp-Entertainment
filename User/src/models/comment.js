import mongoose, { Schema } from "mongoose";
const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    timestamps:true,
    versionKey:false,
    
  });

export default mongoose.model("Comment",commentSchema);