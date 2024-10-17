const router = require("express").Router()
const User = require("../models/User.model")

router.get("/:id", async (req, res, next)=>{

  try {
    const response = await User.findById(req.params.id)
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }  
})

router.patch("/:id", async (req, res, next) =>{

  const { mediHuella } = req.body
  try {
    const response = await User.findByIdAndUpdate(req.params.id,{
      mediHuella
    },{new:true})

    res.status(200).json(response)

  } catch (error) {
    next(error)
  }
  

})

router.patch("/huella/:id", async (req, res, next)=>{
  const {huella} = req.body

  try {
    const response = await User.findByIdAndUpdate(req.params.id,{$push:{huella:huella}}, {new:true})
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
})

module.exports = router