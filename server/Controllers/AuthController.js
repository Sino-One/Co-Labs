const User = require("../models/UserModel");
const { createSecretToken } = require("../utils/SecretToken");
const AppError = require("../utils/appError");
const CatchAsync = require("../utils/CatchAsync");

const createSendToken = (user, statusCode, res) => {
  const token = createSecretToken(user._id);
  const cookieOptions = {
    expiresIn: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ), // on convertit en heures, puis en minutes, puis en secondes, puis en millisecondes
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true; // set cookie only on https connection

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

module.exports.Login = CatchAsync(async (req, res, next) => {
  // TODO verify if it works (catchAsync)

  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("All fields are required ! ", 400)); // TODO send json
  }

  const user = await User.findOne({ email }).select("+password");

  // Check if user exists and password is correct
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({ message: "Incorrect password or email" });
  }

  createSendToken(user, 200, res);
  next();
});

module.exports.Logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

module.exports.Signup = async (req, res, next) => {
  try {
    // TODO general catchAsync Function
    const {
      email,
      password,
      username,
      profession,
      structure,
      preferences,
      availability,
      confirmPassword,
    } = req.body.user;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const newUser = await User.create({
      email,
      password,
      username,
      profession,
      structure,
      preferences,
      availability,
      confirmPassword,
      createdAt: new Date(),
    });

    createSendToken(newUser, 201, res);
    next();
  } catch (error) {
    console.error(error);
  }
};
