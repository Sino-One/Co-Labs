const {
  Signup,
  Login,
  Logout,
  CreationStructure,
} = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const { bases } = require("../Controllers/AuthController");
const router = require("express").Router();

router.post("/userVerification", userVerification); // TODO
router.post("/signup", Signup);
router.post("/login", Login);
router.get("/logout", Logout);
router.post("/creationStructure", CreationStructure);

module.exports = router;
