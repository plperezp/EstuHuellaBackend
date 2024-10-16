const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const commentSchema = new Schema(
{
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  post: {type: mongoose.Schema.Types.ObjectId, ref: "Post"},
 
  text:{
    type: String,
    required: [true, "TextArea is required"]
  },
  
}

)






const Comment = model("Comment", userSchema);

module.exports = Comment ;
