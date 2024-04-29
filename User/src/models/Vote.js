import mongoose, { Schema } from "mongoose";

const voteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  contestant: {
    type: Schema.Types.ObjectId,
    ref: "Contestant",
    required: true,
  },
  voteCount: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Vote", voteSchema);
