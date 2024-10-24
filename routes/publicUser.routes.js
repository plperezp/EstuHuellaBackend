const router = require('express').Router()
const User = require('../models/User.model')

router.get('/user', async (req, res) => {
  try {
    const response = await User.find().select('username', 'img')
    return res.status(200).json(response)
  } catch (error) {
    next(error)
  }
})
module.exports = router
