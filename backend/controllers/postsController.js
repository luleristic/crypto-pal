const asyncHandler = require("express-async-handler");

const User = require("../models/authModel");
const { signedUrl } = require("../helpers/upload");

//@desc Get the signed URL from s3 for the user avatar
//@route POST /api/posts/getSignedUrl
//@access Private
const getSignedUrl = asyncHandler(async (req, res) => {
  const {imageKey} = req.body;
  if(!imageKey) {
    res.status(400);
    throw new Error("Please add all fields");
  } 

  const userExists = await User.findOne({ avatar:imageKey });

  if (!userExists) {
    res.status(400);
    throw new Error("A user with that Image Key does not exist");
  }

  const url = await signedUrl(imageKey);
  
  res.status(200).json({
    message: "Success",
    url
  });
});

module.exports = {
  getSignedUrl,
};
