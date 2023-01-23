const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  likes: {
    type: Array
  },
  comments: {
    type: Array
  }
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema)
