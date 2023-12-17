const { Signup, Login, Logout } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/userVerification", userVerification);
router.post("/signup", Signup);
router.post("/login", Login);
router.get("/logout", Logout);

module.exports = router;
