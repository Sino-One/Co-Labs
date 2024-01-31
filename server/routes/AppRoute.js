const router = require("express").Router();
const {
  getAllStructures,
  addProject,
} = require("../Controllers/StructuresController");
const { protect, isLoggedIn } = require("../Controllers/AuthController");

//router.get("/getStructures", protect, getAllStructures); route protégée auth validation
router.use(isLoggedIn);
router.get("/getStructures", getAllStructures);
router.post("/addProject", addProject);

module.exports = router;
