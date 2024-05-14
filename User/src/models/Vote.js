import mongoose, { Schema } from "mongoose";

const voteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contestant: {
    type: Schema.Types.ObjectId,
    ref: 'Contestant',
    required: true
  },
},
{
  timestamps:true,
  versionKey:false,
  
});

export default mongoose.model("Vote", voteSchema);
