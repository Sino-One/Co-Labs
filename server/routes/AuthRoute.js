const { Signup, Login, Logout } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const { bases } = require("../Controllers/AuthController");
const router = require("express").Router();

router.post("/userVerification", userVerification);
router.post("/signup", Signup);
router.post("/login", Login);
router.get("/logout", Logout);

router.post("/bases", bases);
router.post("/CreationStructure");
router.post("/UserPrefs");

module.exports = router;
