const router = require("express").Router()
const Post = require("../models/Post.model")
const express = require("express")

router.post("/", async (req, res, next) =>{
  const {title, text} = req.body
  if(!title || !text){
    res.status(400).json({message: "Campos obligatorios"})
  }

  try {
    const response = await Post.create(
      req.body
    )
    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
})

router.get ("/", async (req, res, next) =>{
try {
  const response = await Post.find()
  res.status(200).json(response)
} catch (error) {
  next(error)
}

})



router.put("/:id", async (req, res, next)=>{

  try {
    const response = await Post.findByIdAndUpdate(req.params.id, req.body,{new:true})
    res.status(200).json(response)
  } catch (error) {
   next(error) 
  }
})


router.delete("/:id", async (req, res, next)=>{
  try {
    const response = await Post.findByIdAndDelete(req.params.id)
    res.status(200).json({message: "Post eliminado"})
  } catch (error) {
    next(error)
  }
})
module.exports=router
