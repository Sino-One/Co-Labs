const Structure = require("../models/StructureModel");
const User = require("../models/UserModel");

module.exports.CreationStructure = async (req, res, next) => {
  try {
    const { nom, type, adresse, effectif, secteur, publicAcc } = req.body;
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
      public: publicAcc,
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
      user,
    } = req.body;
    const structure = await Structure.findById(idStructure);

    if (structure) {
      const newProject = {
        projectName,
        visible,
        tags,
        structureType,
        description,
        user,
      };
      // structure.projets = new Array();
      if (!structure?.projets) {
        structure.projets = [];
      }
      structure.projets.push(newProject);
      const query = {};
      Object.keys(tags).forEach((tag) => {
        if (tags[tag]) {
          query[`preferences.${tag}`] = true;
        }
      });

      const interestedUsers = await User.find(query);

      // Filtrer pour ne pas inclure l'utilisateur actuel
      const filteredUsers = interestedUsers.filter(
        (u) => u._id.toString() !== user._id.toString()
      );

      filteredUsers.forEach((u) => {
        if (!u?.notificationsProject) {
          u.notificationsProject = [];
        }
        u.notificationsProject.push({
          projectName,
          idStructure,
        });
      });

      for (const user of filteredUsers) {
        await User.updateOne({ _id: user._id }, { $set: user });
      }

      await Structure.updateOne({ _id: idStructure }, structure);
      res.status(201).json({
        message: "Project created successfully",
        success: true,
        structure,
      });
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

module.exports.deleteProject = async (req, res, next) => {
  try {
    const { idStructure, projectName } = req.body;

    const structure = await Structure.findById(idStructure);

    if (structure) {
      const project = structure.projets.find(
        (project) => project.projectName === projectName
      );
      if (project) {
        structure.projets = structure.projets.filter(
          (project) => project.projectName !== projectName
        );
        await Structure.updateOne({ _id: idStructure }, structure);

        const query = {};
        Object.keys(project.tags).forEach((tag) => {
          if (project.tags[tag]) {
            query[`preferences.${tag}`] = true;
          }
        });

        const interestedUsers = await User.find(query);

        // Filtrer pour ne pas inclure l'utilisateur actuel

        interestedUsers.forEach((u) => {
          const filteredNotifs = u.notificationsProject.filter(
            (notification) =>
              !(
                notification.projectName === projectName &&
                notification.idStructure === idStructure
              )
          );
          u.notificationsProject = filteredNotifs;
        });

        for (const user of interestedUsers) {
          await User.updateOne({ _id: user._id }, { $set: user });
        }

        res.status(201).json({
          message: "Projet supprimé",
          success: true,
          structure,
        });
        next();
      } else {
        res.status(404).json({
          message: "Projet non trouvé",
          success: false,
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports.askJoinProject = async (req, res, next) => {
  try {
    const { idStructure, projectName, user } = req.body;

    const structure = await Structure.findById(idStructure);

    if (structure) {
      const project = structure.projets.find(
        (project) => project.projectName === projectName
      );
      if (project) {
        if (!project?.waitingMembers) {
          project.waitingMembers = [];
        }
        const existsInWaiting = project.waitingMembers.some(
          (obj) => obj._id === user._id
        );
        if (!project?.members) {
          project.members = [];
        }
        const existsInMembers = project.members.some(
          (obj) => obj._id === user._id
        );
        if (existsInWaiting || existsInMembers) {
          res.status(404).json({
            message: "Vous avez déjà fait la demande pour ce projet",
            success: false,
          });
          return;
        }
        project.waitingMembers.push(user);
        await Structure.updateOne({ _id: idStructure }, structure);
        res.status(201).json({
          message: "Demande envoyée",
          success: true,
          structure,
          project,
        });
        next();
      } else {
        res.status(404).json({
          message: "Projet non trouvé",
          success: false,
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports.acceptJoinProject = async (req, res, next) => {
  try {
    const { idStructure, projectName, user } = req.body;

    const structure = await Structure.findById(idStructure);

    if (structure) {
      const project = structure.projets.find(
        (project) => project.projectName === projectName
      );
      if (project) {
        if (!project?.members) {
          project.members = [];
        }
        project.members.push(user);
        project.waitingMembers = project.waitingMembers.filter(
          (obj) => obj._id !== user._id
        );
        await Structure.updateOne({ _id: idStructure }, structure);
        res.status(201).json({
          message: "Demande acceptée",
          success: true,
          structure,
          project,
        });
        next();
      } else {
        res.status(404).json({
          message: "Projet non trouvé",
          success: false,
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};
