const Oauth2Strategy =require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../model/user_model');
passport.use(
    new Oauth2Strategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
        scope: ['profile', 'email']
      },
      async (accessToken, refreshToken, profile, done) => {
        if (accessToken.error) {
          console.error('Error:', accessToken.error);
          return done(null, false, { message: accessToken.error_description });
        }
        try {
          const existingUser = await User.findOne({ googleId: profile.id });
          if (existingUser) {
            return done(null, existingUser);
          }
          const newUser = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            picture:profile.photos[0].value
          });
          await newUser.save();
          return done(null, newUser);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
  passport.serializeUser((user, done) => done(null, user.id));
  
  passport.deserializeUser(async(id, done) => {
   try {
     const user  = await User.findById(id);
     done(null,user);
   } catch (error) {
     done(err);
   }
  });
