import { Schema, model } from "mongoose";

const contestantSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  voteCount: {
    type: Number,
    default: 0,
  },
});

export default model("Contestant", contestantSchema);