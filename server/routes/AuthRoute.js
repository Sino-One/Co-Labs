const {
  Signup,
  Login,
  Logout,
  UpdateUser,
  GetUser,
} = require("../Controllers/AuthController");
const { CreationStructure } = require("../Controllers/StructuresController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/userVerification", userVerification); // TODO
router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/creationStructure", CreationStructure);
router.post("/updateUser", UpdateUser);
router.post("/getUser", GetUser);

module.exports = router;
