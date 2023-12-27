const { bases } = require("../Controllers/AuthController");

const router = require("express").Router();

router.post("/bases", bases);
router.post("/CreationStructure");
router.post("/UserPrefs");

module.exports = router;
