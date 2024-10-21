const express = require('express')
const User = require('../models/User.model')
const passport = require('passport')
const router = express.Router()
const mongoose = require('mongoose')

router.get(
  '/',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    try {
      const existingUser = await User.findOne({ googleId: req.user.id })

      if (existingUser) {
        req.logIn(existingUser, (err) => {
          if (err) return next(err)
          res.redirect('/')
        })
      } else {
        //si no existe crea el usuario

        const newUser = new User({
          googleId: req.user.id,
          email,
          name,
          password,
          huella,
          mediHuella,
          img,
          username,
        })
        await newUser.create()
        req.login(newUser, (err) => {
          if (err) return next(err)
          res.redirect('/')
        })
      }
    } catch (error) {}
  }
)
module.exports = router
