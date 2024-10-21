const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    title: {
      type: String,
      required: [true, 'Title is required'],
    },

    text: {
      type: String,
      required: [true, 'TextArea is required'],
    },

    // this second object adds extra properties: `createdAt` and `updatedAt`
  },
  { timestamps: true }
)

const Post = model('Post', postSchema)

module.exports = Post
