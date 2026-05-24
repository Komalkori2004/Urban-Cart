const user = require("../models/userModel");
const crypto = require("crypto")

const ErrorHandler = require("../utils/errorHandler");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const asyncHandler = require("../middleware/asyncHandler");
const transporter = require("../config/mailer");


// Register User
const registerUser = asyncHandler(async (req, res, next) => {

  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return next(
      new ErrorHandler(400, "Please enter all fields")
    );
  }

  // Check existing user
  const userExists = await user.findOne({ email });

  if (userExists) {
    return next(
      new ErrorHandler(400, "User already exists")
    );
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // verify email
  const verifyToken = crypto.randomBytes(32).toString("hex")



  // Create user
  const User = await user.create({
    name,
    email,
    password: hashedPassword,
    verifyToken,
    verifyTokenExpiry: Date.now() + 10 * 60 * 1000
  });

  const verifyUrl = `${process.env.FRONTEND_URL}/verify/${verifyToken}`


  await transporter.sendMail({
    from: "urbancart@test.com",
    to: email,
    subject: "urbanCart Test",
    html: `

<h2>
Welcome to UrbanCart
</h2>

<p>
Hello ${name},
</p>

<p>
Please click below to verify your account:
</p>

<a href="${verifyUrl}">
Verify Account
</a>

`
  })



  User.password = undefined;

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user: User,
  });

});


// Login User
const LoginUser = asyncHandler(async (req, res, next) => {

  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return next(
      new ErrorHandler(400, "Please enter email and password")
    );
  }

  // Check user
  const existingUser = await user.findOne({ email });

  if (!existingUser) {
    return next(
      new ErrorHandler(401, "User not found")
    );
  }

  // Compare password
  const isMatch = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isMatch) {
    return next(
      new ErrorHandler(401, "Invalid password")
    );
  }

  // Generate token
  const token = jwt.sign(
    {
      id: existingUser._id,
      role: existingUser.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  existingUser.password = undefined;
  res.status(200).json({
    success: true,
    message: "User login successfully",
    token,
    user: existingUser,
  });

});




// Get Profile
const getProfile = asyncHandler(async (req, res, next) => {

  res.status(200).json({
    success: true,
    user: req.user,
  });

});



// Admin Dashboard
const AdminDashboard = asyncHandler(async (req, res, next) => {

  res.status(200).json({
    success: true,
    message: "Welcome to Admin Dashboard",
  });

});




module.exports = {
  registerUser,
  LoginUser,
  getProfile,
  AdminDashboard,
};