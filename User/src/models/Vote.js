const mongoose = require("mongoose");
const { Schema } = mongoose;

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
  timestamps: true,
  versionKey: false,
});

module.exports = mongoose.model("Vote", voteSchema);
