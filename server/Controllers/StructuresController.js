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
module.exports.addProject = async (req, res, next) => {
  try {
    const {
      idStructure,
      projectName,
      visible,
      tags,
      structureType,
      description,
    } = req.body;
    const structure = await Structure.findById(idStructure);

    if (structure) {
      console.log(structure.nom);
      const newProject = {
        projectName,
        visible,
        tags,
        structureType,
        description,
      };
      // structure.projets = new Array();
      if (!structure?.projets) {
        structure.projets = [];
      }
      structure.projets.push(newProject);
      await Structure.updateOne({ _id: idStructure }, structure);
      res.status(201).json({
        message: "Project created successfully",
        success: true,
        structure,
      });
      console.log(structure);
      next();
    } else {
      res.status(404).json({
        message: "Structure not found",
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
  }
};
