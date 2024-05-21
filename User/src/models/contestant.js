import { Schema, model } from "mongoose";

const contestantSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  hobby: {
    type: String,
  },
  image:{
    type: [String],
  },
  voteCount: {
    type: Number,
    default: 0,
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  otpCode: {
    type: String,
    expire: "5m",
  },
},
{
  timestamps:true,
  versionKey:false,
  
});

export default model("Contestant", contestantSchema);