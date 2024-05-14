import { Schema, model } from "mongoose";

const contestantSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image:{
    type: [String],
  },
  voteCount: {
    type: Number,
    default: 0,
  },
},
{
  timestamps:true,
  versionKey:false,
  
});

export default model("Contestant", contestantSchema);