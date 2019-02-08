const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
//ottuk wzimam moqt model users,koito sum dobawil sled kato sum suzdal mongoose.model('user',imeNaSchema)
const User = mongoose.model("users");
//towa prewrushta usera w cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//towa prewrushta cookie w usera
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
//tuk se swurzwam s google api i dawam moite danni i callbacka kude da otide slad kato polucha danni ot google
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
      //neobhodimi e za da raboti dobre herokuto
      // proxy: true
    },
    //tochno ot tuk wzimam infoto za daden user i prawq neshto s neq
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }
      //dobawqm now user w baza danni
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
