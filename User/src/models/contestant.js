import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
const contestantSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide a valid email address"],
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    alphanumeric: true,
    trim: true,
    minLength: 6,
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
    required: true,
  },
  image:{
    type: [String],
    required: true,
  },
  voteCount: {
    type: Number,
    default: 0,
  },
  otpCode: {
    type: String,
    expire: "5m",
  },
  otpExpirationTime: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  resetLinkToken: {
    type: String,
    default: "",
    expiresIn: "5m",
  },
  
},
{
  timestamps:true,
  versionKey:false,
  
});

contestantSchema.pre("save", async function (next) {
  const contestant = this;
  if (contestant.isModified("password")) {
    contestant.password = await bcrypt.hash(contestant.password, 10);
  }
  next();
});

contestantSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default model("Contestant", contestantSchema);
