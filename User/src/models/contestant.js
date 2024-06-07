import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
const contestantSchema = new Schema({
  FullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true, 
    alphanumeric: true,
    trim: true,
    minLength: 6,
  },
  DisplayName: {
    type: String,
    trim: true,
  },
  age: {
    type: Number,
  },
  sex: {
    type: String,
  },
  hobby: {
    type: String,
  },
  location: {
    type: String,
  },
  occupation: {
    type: String,
  },
  AboutMe: {
    type: String,
  },
  image:{
    type: String,
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
