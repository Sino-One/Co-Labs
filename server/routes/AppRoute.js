const router = require("express").Router();
const {
  getAllStructures,
  addProject,
  askJoinProject,
  acceptJoinProject,
  deleteProject,
} = require("../Controllers/StructuresController");
const { protect, isLoggedIn } = require("../Controllers/AuthController");

//router.get("/getStructures", protect, getAllStructures); route protégée auth validation
//router.use(isLoggedIn);
router.get("/getStructures", getAllStructures);
router.post("/addProject", addProject);
router.post("/askJoinProject", askJoinProject);
router.post("/acceptJoinProject", acceptJoinProject);
router.post("/deleteProject", deleteProject);

module.exports = router;
