
const Habito = require("../models/Habito.model")
const express = require("express");

const router = express.Router();


router.post("/transporte", async (req, res,next)=>{
  const{vehiculo, tiempo, motor} = req.body

  if(!vehiculo || !tiempo){
    res.status(400).json({message: "Campos obligatorios"})
  }
  if( vehiculo === "coche" && !motor){
     res.status(400).json({message: "Motor es obligatorio"}) 
    
  }
 try {
  const response = await Habito.create({
    vehiculo,
    tiempo,
    motor

  })

  res.sendStatus(201)
 } catch (error) {
  next(error)
  console.log(error)
 }
})
module.exports = router




