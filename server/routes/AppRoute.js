const router = require("express").Router();
const { getAllStructures } = require("../Controllers/StructuresController");

router.get("/getStructures", getAllStructures);

module.exports = router;
