const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport')

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'api/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      req.session.accessToken = accessToken
      req.session.refreshToken = refreshToken
      done(null, profile)
    }
  )
)
passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser(id, (user, done) => {
  done(null, user)
})
const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport')
const User = require('../models/User.model') // Asegúrate de que el modelo está importado

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback', // Asegúrate de que coincide con tu ruta
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Busca si el usuario ya existe en la base de datos
        let user = await User.findOne({ googleId: profile.id })

        if (user) {
          return done(null, user)
        } else {
          // Si no existe, crea un nuevo usuario
          user = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
          })
          await user.save()
          return done(null, user)
        }
      } catch (error) {
        return done(error, false)
      }
    }
  )
)

// Serializa solo el ID del usuario
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// Deserializa buscando al usuario en la base de datos
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})
