import { createContext, useReducer } from "react";

export const UserContext = createContext({
  user: null,
  setUser: () => {},
});

function userReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    default:
      return state;
  }
}

export default function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, null);

  function setUser(user) {
    dispatch({
      type: "SET_USER",
      payload: user,
    });
  }

  const ctxValue = {
    user: state,
    setUser,
  };

  return (
    <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>
  );
}
