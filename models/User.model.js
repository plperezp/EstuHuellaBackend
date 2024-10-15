const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {

    username: {
      type: String, 
      required: [true, "Usermane is required"]
    },

    name: {
      type:String,
      required: [true, "Name is required"]
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },

    huella:{
      type:[Number]
    },
    mediHuella:{
      type: Number,
      min: 0
    },
    img:{
      type:String
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true


  }
);

const User = model("User", userSchema);

module.exports = User;
