import * as Api from "../Utils/Api";

const getAllStructures = async () => {
  try {
    const { data } = await Api.get("getStructures");
    const { success, message } = data;
    if (data) {
      return data;
    } else {
      console.log(message);
    }
  } catch (error) {
    console.log(error);
  }
};

const addProject = async (project) => {
  try {
    const { data } = await Api.post("addProject", project);
    const { success, message } = data;
    if (data) {
      return data;
    } else {
      console.log(message);
    }
  } catch (error) {
    console.log(error);
  }
};

const StructureService = {
  getAllStructures: getAllStructures,
  addProject: addProject,
};

export default StructureService;
