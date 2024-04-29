// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  FullName: { type: String, unique: true, required: [true,"Please provide a Full name"],trim: true },
  PhoneNumber:{type:String,unique: true,required:[true,"Please provide a valid Phone number"]},
  password: { type: String, required: [true,"Please provide a password"],alphanumeric:true,trim: true,minLength:6},
  email:{type:String,unique: true, required:[true,'Please provide a valid email address'],trim: true,
  lowercase: true,},
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  isVoted: {
    type: Boolean,
    default: false
},
  resetLinkToken:{
    type: String,
    default:"",
    expiresIn:"5m"
  }
  
},
{
  timestamps:true,
  versionKey:false,
  
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

// Compare passwords for login
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);

