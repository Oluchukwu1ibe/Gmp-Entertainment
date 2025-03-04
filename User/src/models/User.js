const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      trim: true,
    },
    displayName: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
    },
    password: {
      type: String,
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

module.exports = mongoose.model("User", userSchema);
