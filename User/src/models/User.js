// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      trim: true,
    },
    DisplayName: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      alphanumeric: true,
      trim: true,
      minLength: 6,
    },
    email: {
      type: String,
      unique: true,
      required: true, 
      trim: true,
      lowercase: true,
    },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    isVoted: {
      type: Boolean,
      default: false,
    },
    resetLinkToken: {
      type: String,
      default: "",
      expiresIn: "5m",
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Hash the password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

// Compare passwords for login
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
