
const Habito = require("../models/Habito.model")
const express = require("express");

const router = express.Router();


router.post("/transporte", async (req, res,next)=>{

  const{ transporte} = req.body
  const {vehiculo, tiempo, motor}= transporte
console.log(req.body)
console.log(vehiculo, tiempo, motor)
  
  
  if(!vehiculo || !tiempo){
    res.status(400).json({message: "Campos obligatorios"})
  }
  if( vehiculo === "coche" && !motor){
     res.status(400).json({message: "Motor es obligatorio"}) 
    
  }
 try {
  const response = await Habito.create(
    req.body
  )

  res.status(201).json(response)
 } catch (error) {
  next(error)
  console.log(error)
 }
})

router.post("/otros", async (req, res ,next)=>{
  const {otros}=req.body
  const {consumoEnergetico, esRenovable}= otros
  if(!consumoEnergetico){
    res.status(400).json({message:"elige una energia"})
  }
  try {
    const response = await Habito.create(req.body)
    res.status(201).json(response)
  } catch (error) {
    next(error)
  console.log(error)
  }
})
router.post("/alimentacion", async(req, res, next)=>{
  const {alimentacion}=req.body
  const {alimento, cantidad,esDeProximidad}= alimentacion
  if(!alimento){
    res.status(400).json({message:"elige un alimento"})
  }
  try {
    const response= await Habito.create(req.body)
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

router.get("/user/:userId", async (req, res, next) => {
  const { userId } = req.params;

  try {
      const habits = await Habito.find({ user: userId })
      if (!habits) {
          return res.status(404).json({ message: "No se encontraron hábitos para este usuario." });
      }
      res.status(200).json(habits);
  } catch (error) {
    next (error)
  }
});


module.exports = router




