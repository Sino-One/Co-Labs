import { createContext, useReducer } from "react";

export const StructuresContext = createContext({
  structures: [],
  setStructures: () => {},
  addProjectToStructure: () => {},
});

function structuresReducer(state, action) {
  switch (action.type) {
    case "SET_STRUCTURES":
      return action.payload;
    case "ADD_PROJECT_TO_STRUCTURE":
      return state.map((structure) => {
        if (structure._id === action.payload._id) {
          return action.payload;
        }
        return structure;
      });
    default:
      return state;
  }
}

export default function StructuresContextProvider({ children }) {
  const [state, dispatch] = useReducer(structuresReducer, []);

  function setStructures(structures) {
    dispatch({
      type: "SET_STRUCTURES",
      payload: structures,
    });
  }

  function addProjectToStructure(newStructure) {
    dispatch({
      type: "ADD_PROJECT_TO_STRUCTURE",
      payload: newStructure,
    });
  }

  const ctxValue = {
    structures: state,
    setStructures,
    addProjectToStructure,
  };

  return (
    <StructuresContext.Provider value={ctxValue}>
      {children}
    </StructuresContext.Provider>
  );
}
