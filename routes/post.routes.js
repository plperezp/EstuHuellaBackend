const router = require("express").Router()
const verifyToken = require("../middlewares/auth.middlewares")
const Post = require("../models/Post.model")
const express = require("express")

router.post("/", verifyToken,async (req, res, next) =>{
  const {title, text, user} = req.body
  if(!title || !text){
    res.status(400).json({message: "Campos obligatorios"})
  }

  try {
    const response = await Post.create(
     {title,
      text,
      user:req.payload._id}
    )
    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
})

router.get ("/", async (req, res, next) =>{
try {
  const response = await Post.find().populate("user")
  res.status(200).json(response)
} catch (error) {
  next(error)
}

})



router.put("/:id",verifyToken, async (req, res, next)=>{

  try {
    const response = await Post.findByIdAndUpdate(req.payload._id, {title,text},{new:true})
    res.status(200).json(response)
  } catch (error) {
   next(error) 
  }
})


router.delete("/:id",verifyToken, async (req, res, next)=>{
  try {
   const response =  await Post.findByIdAndDelete(req.payload._id)
   if (response) {
    res.json({mesage:"Element Deleted"})
    console.log("Se elimino")
  } else {
    res.json("Element not found")
    console.log("No lo encontro")
  }
  
  } catch (error) {
    next(error)
  }
})
module.exports=router
