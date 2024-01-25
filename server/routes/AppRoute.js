const router = require("express").Router();
const { getAllStructures } = require("../Controllers/StructuresController");
const { protect } = require("../Controllers/AuthController");

//router.get("/getStructures", protect, getAllStructures); route protégée auth validation
router.get("/getStructures", getAllStructures);

module.exports = router;
