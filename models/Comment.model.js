const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const commentSchema = new Schema(
{
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  postId: {type: mongoose.Schema.Types.ObjectId, ref: "Post"},
 
  textArea:{
    type: String,
    required: [true, "TextArea is required"]
  },

  CheckUser: {
    type:Boolean,
    default:false
  }
  
}

)






const Comment = model("Comment", userSchema);

module.exports = Comment ;
