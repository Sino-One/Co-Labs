const router = require("express").Router();
const { getAllStructures } = require("../Controllers/StructuresController");
const { protect, isLoggedIn } = require("../Controllers/AuthController");

//router.get("/getStructures", protect, getAllStructures); route protégée auth validation
router.use(isLoggedIn); // TODO
router.get("/getStructures", getAllStructures);

module.exports = router;
