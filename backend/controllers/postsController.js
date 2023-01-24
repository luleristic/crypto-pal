const asyncHandler = require("express-async-handler");
const crypto = require("crypto");

const User = require("../models/authModel");
const Post = require("../models/postModel");

const { signedUrl, uploadImage } = require("../helpers/upload");

//@desc Get the signed of an image from s3;
//@route POST /api/posts/getSignedUrl
//@access Private
const getSignedUrl = asyncHandler(async (req, res) => {
  const { imageKey } = req.body;
  const { _id } = req.user;
  if (!imageKey) {
    throw new Error("Please add all fields");
  }
  const userExists = await User.findOne({ _id });
  if (!userExists) {
    res.status(400);
    throw new Error("A user with that Image Key does not exist");
  }

  const url = await signedUrl(imageKey);

  res.status(200).json({
    message: "Success",
    url,
  });
});

//@desc Upload a post;
//@route POST /api/posts/upload
//@access Private
const addPost = asyncHandler(async (req, res) => {
  const { image, ext, type } = req.body;
  const { _id } = req.user;

  if (!image || !ext || !type) {
    res.status(400);
    throw new Error("Invalid body");
  }

  const imgId = crypto.randomBytes(16).toString("hex");
  const uploadedImage = await uploadImage(ext, image, imgId, type, _id);

  const post = await Post.create({
    user: _id,
    image: uploadedImage.Key,
    description: "",
    likes: [],
    comments: [],
  });

  if (post) {
    res.status(201).json({
      message: "Post Uploaded Successfully",
    });
  } else {
    res.status(400).json({
      message: "Something went wrong with the upload",
    });
  }
});

const fetchUserPosts = asyncHandler(async (req, res) => {
  const { username } = req.body;
  console.log(username);
  if( !username ) {
    res.status(400);
    throw new Error('Invalid body');
  }

  //Add a signed url to all posts, and send it to the frontend
  let posts = await Post.find({username}).select('-user -comments');
  posts = await Promise.all(posts.map(async (post) => {
    return {...post._doc, src: await signedUrl(post.image)}
  }));

  if(posts) {
    res.status(200).json({
      message: 'Posts sent succesfully',
      personalPosts: posts
    })
  } else {
    res.status(400).json({
      messsage: 'Something went wrong'
    })
  }
});

module.exports = {
  getSignedUrl,
  addPost,
  fetchUserPosts
};
