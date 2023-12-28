const Structure = require("../models/StructureModel");

module.exports.CreationStructure = async (req, res, next) => {
  try {
    const { nom, type, adresse, effectif, secteur } = req.body;
    const existingStructure = await Structure.findOne({ nom });
    if (existingStructure) {
      return res.json({ message: "Structure already exists" });
    }
    const newStructure = await Structure.create({
      nom,
      type,
      adresse,
      effectif,
      secteur,
      createdAt: new Date(),
    });

    if (newStructure) {
      res.status(201).json({
        message: "Structure created successfully",
        success: true,
        newStructure,
      });
    }

    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.getAllStructures = async (req, res, next) => {
  try {
    const allStructures = await Structure.find({});

    if (allStructures) {
      res.send(allStructures);
    }

    next();
  } catch (error) {
    console.error(error);
  }
};
