const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport')

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      req.session.accessToken = accessToken
      req.session.refreshToken = refreshToken
      done(null, profile)
    }
  )
)
passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})
