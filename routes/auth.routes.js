const router = require('express').Router()
const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//falta verifyToken
const verifyToken = require('../middlewares/auth.middlewares')

router.post('/signup', async (req, res, next) => {
  const { username, password, email, name } = req.body

  if (!email || !password || !username || !name) {
    res.status(400).json({ message: 'Todos los campos son obligatorios' })
    return
  }

  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/gm
  if (regexPassword.test(password) === false) {
    res
      .status(406)
      .json({
        message:
          'La contaseña debe tener al menos una mayuscula, una minuscula, un número y entre 8 y 16 caracteres',
      })
  }

  try {
    const foundUser = await User.findOne({ email: email })
    if (foundUser) {
      res.status(400).json({ message: 'Usuario ya registrado con ese email' })
      return
    }

    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(password, salt)

    await User.create({
      email,
      password: hashPassword,
      username,
      name,
    })
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ message: 'Todos los campos son requeridos' })
    return
  }

  try {
    const foundUser = await User.findOne({ email: email })

    if (!foundUser) {
      res.status(400).json({ message: 'Usuario no encontrado con ese email' })
      return
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)

    if (!isPasswordCorrect) {
      res.status(400).json({ message: 'password incorrecto' })
      return
    }

    //PAYLOAD

    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      username: foundUser.username,
    }

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: '30d',
    })
    res.status(200).json({ authToken: authToken })
  } catch (error) {
    next(error)
  }
})

router.get('/verify', verifyToken, (req, res) => {
  res.status(200).json(req.payload)
})

module.exports = router
