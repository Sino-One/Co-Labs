const mongoose = require("mongoose");

const StructureSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, "Your nom is required"],
  },
  type: {
    type: String,
    required: [true, "Your type is required"],
  },
  adresse: {
    type: String,
    required: [true, "Your adresse is required"],
  },
  effectif: {
    type: String,
    required: [true, "Your effectif is required"],
  },
  structureType: {
    type: String,
    required: [true, "Your structureType is required"],
  },
  secteur: {
    type: String,
    required: [true, "Your secteur is required"],
  },
  projets: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Structure", StructureSchema);
