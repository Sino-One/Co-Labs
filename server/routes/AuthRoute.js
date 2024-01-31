const { Signup, Login, Logout } = require("../Controllers/AuthController");
const { CreationStructure } = require("../Controllers/StructuresController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const { bases } = require("../Controllers/AuthController");
const router = require("express").Router();

router.post("/userVerification", userVerification); // TODO
router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/creationStructure", CreationStructure);

module.exports = router;
