const asyncHandler = require("express-async-handler");
const User = require("../models/authModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const e = require("express");

//@desc Register a user
//@route POST /api/users
//@body firstName, lastName, email, password
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("A user with that email already exists");
  }

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc Login a user
//@route POST /api/users/login
//@body email, password
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials, please try again");
  }
});

//@desc Get user data by JWT
//@route GET /api/users/me
//@access Private
const getUser = asyncHandler(async (req, res) => {
  const user = req.user;
  res.status(200).json({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
});

//@desc Edit Basic User Info
//@route PUT /api/users/me
//@access Private
const editUser = asyncHandler(async (req, res) => {
  const { newFirstName, newLastName, email, newEmail } = req.body;

  if (!email || !newEmail || !newFirstName || !newLastName) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Invalid user data! Please try again");
  }

  const conditions = {
    _id: user._id,
  };

  const update = {
    firstName: newFirstName,
    lastName: newLastName,
    email: newEmail,
  };

  const updatedUser = User.findOneAndUpdate(
    conditions,
    update,
    (error, result) => {
      if (error) {
        res.status(400);
        throw new Error(error);
      } else {
        res.status(200).json({
          firstName: newFirstName,
          lastName: newLastName,
          email: newEmail,
        });
      }
    }
  );
});

//@desc Edit User Avatar Image
//@route POST /api/users/me/avatar
//@access Private
const editUserAvatar = asyncHandler(async (req, res) => {
  const photo = req.file.filename;

  console.log('asd');

  res.status(200).json({
    message: 'success'
  })
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  editUser,
  editUserAvatar
};
