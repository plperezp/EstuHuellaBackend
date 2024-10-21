const router = require('express').Router()
const verifyToken = require('../middlewares/auth.middlewares')
const User = require('../models/User.model')
const calculahuella = require('../utils/Calculahuella')

const { huellaDiaria } = calculahuella

router.get('/', verifyToken, async (req, res, next) => {
  try {
    const response = await User.findById(req.payload._id)
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
})

router.patch('/', verifyToken, async (req, res, next) => {
  const { mediHuella, img } = req.body
  try {
    const response = await User.findByIdAndUpdate(
      req.payload._id,
      {
        img,
      },
      { new: true }
    )

    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
})

router.patch('/huella', verifyToken, async (req, res, next) => {
  try {
    const response = await User.findByIdAndUpdate(
      req.payload._id,
      { $push: { huella: { $each: [huellaDiaria], $position: 0 } } },
      { new: true }
    )
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
})

module.exports = router
