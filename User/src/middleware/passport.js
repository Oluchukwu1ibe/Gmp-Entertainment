const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const Contestant = require("../models/contestant");
const {createJwtToken} = require("./token")

const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://gmp-entertainment-fcjd.onrender.com"
    : "http://localhost:2024";


passport.use(
  "google-user",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${SERVER_URL}/api/auth/google/callback`,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // If the user doesn't exist, check if the email already exists in the DB
          user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            // If email exists but not linked to Google, update user with googleId
            user.googleId = profile.id;
            await user.save();
          } else {
            // If user completely new, create a new account
            user = await User.create({
              googleId: profile.id,
              email: profile.emails[0].value,
              displayName: profile.displayName,
              isVerified: true,
            });
          }
        }

        const token = createJwtToken({ id: user._id,email: user.email,
          role: user.role, });

          const userResponse = {
            _id: user._id,
            googleId: user.googleId,
            email: user.email,
            displayName: user.displayName,
            isVerified: user.isVerified,
          };

        return done(null, { userResponse, token });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.use(
  "google-contestant",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${SERVER_URL}/api/contestant/auth/google/callback`,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let contestant = await Contestant.findOne({ googleId: profile.id });
        console.log("Google contestant:", contestant); 
        
        if (!contestant) {
          contestant = await Contestant.findOne({ email: profile.emails[0].value });
          
          if (contestant) {
            contestant.googleId = profile.id;
            await contestant.save();
          } else {
            contestant = await Contestant.create({
              googleId: profile.id,
              email: profile.emails[0].value,
              displayName: profile.displayName,
              fullName: profile.displayName,
              isVerified: true,
            });
          }
        }
        
        const token = createJwtToken({
          id: contestant._id,
          email: contestant.email,
          role: contestant.role,
        });

        const contestantResponse = {
          _id: contestant._id,
          googleId: contestant.googleId,
          email: contestant.email,
          displayName: contestant.displayName,
          fullName: contestant.fullName,
          isVerified: contestant.isVerified,
        };

        return done(null, { contestantResponse, token });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
