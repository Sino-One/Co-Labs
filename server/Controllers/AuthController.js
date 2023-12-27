const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Logout = async (req, res, next) => {
  try {
    res.cookie("token", "", {
      withCredentials: true,
      httpOnly: false,
      expires: new Date(0),
    });
    res.status(201).json({ message: "User logged out successfully" });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Signup = async (req, res, next) => {
  try {
    const {
      email,
      password,
      username,
      profession,
      structure,
      social,
      culturel,
      sportif,
      nature,
      mediation,
      animation,
      sante,
    } = req.body.user;
    console.log(req.body);
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
      social,
      culturel,
      sportif,
      nature,
      mediation,
      animation,
      sante,
      createdAt: new Date(),
    });
    const token = createSecretToken(newUser._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    if (newUser) {
      res.status(201).json({
        message: "User signed in successfully",
        success: true,
        newUser,
      });
    }

    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.bases = async (req, res, next) => {
  try {
    const { email, profession, structure } = req.body;

    const updatedUser = await User.updateOne(
      { email: email },
      { profession: profession, structure: structure },
      { new: true, runValidators: true }
    );

    res.status(202).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.CreationStructure = async (req, res, next) => {};

module.exports.UserPrefs = async (req, res, next) => {};

// TODO : Suite à la création avec signup, les routes bases creation et user prefs doivent modifer l'utilisateur crée et crée une structure
