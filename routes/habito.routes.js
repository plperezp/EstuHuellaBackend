const verifyToken = require('../middlewares/auth.middlewares')
const Habito = require('../models/Habito.model')
const express = require('express')

const router = express.Router()

router.post('/transporte', verifyToken, async (req, res, next) => {
  const { transporte } = req.body
  const { vehiculo, tiempo, motor } = transporte
  console.log(req.body)
  console.log(vehiculo, tiempo, motor)

  if (!vehiculo || !tiempo) {
    res.status(400).json({ message: 'Campos obligatorios' })
  }
  if (vehiculo === 'coche' && !motor) {
    res.status(400).json({ message: 'Motor es obligatorio' })
  }
  try {
    const response = await Habito.create({
      transporte: {
        vehiculo,
        tiempo,
        motor,
      },
      user: req.payload._id,
    })

    res.status(201).json(response)
  } catch (error) {
    next(error)
    console.log(error)
  }
})

router.post('/otros', verifyToken, async (req, res, next) => {
  const { otros } = req.body
  const { consumoEnergetico, esRenovable, recicla, user } = otros
  if (!consumoEnergetico) {
    res.status(400).json({ message: 'elige una energia' })
  }
  try {
    const response = await Habito.create({
      otros: {
        consumoEnergetico,
        esRenovable,
        recicla,
      },
      user: req.payload._id,
    })
    res.status(201).json(response)
  } catch (error) {
    next(error)
    console.log(error)
  }
})
router.post('/alimentacion', verifyToken, async (req, res, next) => {
  const { alimentacion } = req.body
  const { alimento, cantidad, esDeProximidad } = alimentacion
  if (!alimento) {
    res.status(400).json({ message: 'elige un alimento' })
  }
  try {
    const response = await Habito.create({
      alimentacion: {
        alimento,
        cantidad,
        esDeProximidad,
      },
      user: req.payload._id,
    })
    res.status(201).json(response)
  } catch (error) {
    next(error)
    console.log(error)
  }
})

/*router.get("/:id", async(req, res, next) =>{
  console.log(req)
  try {
    
    const response = await Habito.findById(req.params.id).populate("user")
    res.status(200).json(response)
  } catch (error) {
    next (error)
    console.log(error)
  }

})*/

router.get('/user', verifyToken, async (req, res, next) => {
  try {
    const habits = await Habito.find({ user: req.payload._id })
    if (!habits) {
      return res
        .status(404)
        .json({ message: 'No se encontraron hábitos para este usuario.' })
    }
    res.status(200).json(habits)
  } catch (error) {
    next(error)
  }
})

module.exports = router
