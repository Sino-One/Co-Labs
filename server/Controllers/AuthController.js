const User = require("../models/UserModel");
const { createSecretToken } = require("../utils/SecretToken");
const AppError = require("../utils/appError");
const CatchAsync = require("../utils/CatchAsync");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const createSendToken = (user, statusCode, res) => {
  const token = createSecretToken(user._id);
  const cookieOptions = {
    expiresIn: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ), // on convertit en heures, puis en minutes, puis en secondes, puis en millisecondes
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true; // set cookie only on https connection

  console.log("token", token);
  console.log("cookieOptions", cookieOptions);

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
      token,
    },
  });
};

module.exports.Login = CatchAsync(async (req, res, next) => {
  // TODO verify if it works (catchAsync)

  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Tous les champs sont requis !", 400)); // TODO send json
  }

  const user = await User.findOne({ email }).select("+password");

  // Check if user exists and password is correct
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({ message: "Email ou mot de passe incorrect" });
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
    } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "L'utilisateur existe déjà" });
    }
    console.log({
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

module.exports.protect = CatchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; // Bearer TOKEN
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({
      message:
        "Vous n'êtes pas connecté ! Veuillez vous connecter pour obtenir l'accès.",
    });
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.status(401).json({
      message: "The user belonging to this token does no longer exist.",
    });
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

// Only for rendered pages, no errors!
module.exports.isLoggedIn = CatchAsync(async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      // 2) Verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 3) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
    }
    // Whether there's a token or not, continue to the next middleware
    next();
  } catch (error) {
    // Handle any potential errors during token verification or user retrieval
    console.error(error);
    next(error); // Pass the error to the error handling middleware
  }
});

module.exports.UpdateUser = CatchAsync(async (req, res, next) => {
  try {
    const {
      id,
      username,
      email,
      password,
      confirmPassword,
      preferences,
      availability,
      profession,
    } = req.body;

    if (username) {
      User.updateOne({ _id: id }, { username })
        .then((obj) => {
          res.status(200).json({ message: "Utilisateur modifié" });
          next();
        })
        .catch((err) => {
          console.log("Error: " + err);
        });
    }
    if (email) {
      User.updateOne({ _id: id }, { email })
        .then((obj) => {
          res.status(200).json({ message: "Utilisateur modifié" });
          next();
        })
        .catch((err) => {
          console.log("Error: " + err);
        });
    }
    if (password && password === confirmPassword) {
      User.updateOne({ _id: id }, { password, confirmPassword })
        .then((obj) => {
          res.status(200).json({ message: "Utilisateur modifié" });
          next();
        })
        .catch((err) => {
          console.log("Error: " + err);
        });
    }
    if (preferences) {
      User.updateOne({ _id: id }, { preferences })
        .then((obj) => {
          res.status(200).json({ message: "Utilisateur modifié" });
          next();
        })
        .catch((err) => {
          console.log("Error: " + err);
        });
    }
    if (availability != undefined) {
      console.log("availability", availability);
      User.updateOne({ _id: id }, { availability })
        .then((obj) => {
          res.status(200).json({ message: "Utilisateur modifié" });
          next();
        })
        .catch((err) => {
          console.log("Error: " + err);
        });
    }
    if (profession) {
      User.updateOne(
        { _id: id },
        {
          profession,
        }
      )
        .then((obj) => {
          res.status(200).json({ message: "Utilisateur modifié" });
          next();
        })
        .catch((err) => {
          console.log("Error: " + err);
        });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports.GetUser = CatchAsync(async (req, res, next) => {
  try {
    const { id } = req.body;
    await User.findById(id)
      .then((user) => {
        res.status(200).json({ user });
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
    next();
  } catch (error) {
    console.error(error);
  }
});
