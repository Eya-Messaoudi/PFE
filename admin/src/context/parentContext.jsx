import { createContext, useReducer } from "react";

export const ParentContext = createContext();

export const parentReducer = (state, action) => {
  switch (action.type) {
    case "SET_PARENT":
      return {
        parents: action.payload,
      };
    case "CREATE_PARENT":
      return {
        parents: [...state.parents, action.payload],
      };
    case "DELETE_PARENT":
      return {
        parents: state.parents.filter((p) => p._id !== action.payload._id),
      };
    default:
      return state;
  }
};
export const ParentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(parentReducer, {
    parents: null,
  });

  return (
    <ParentContext.Provider value={{ dispatch, ...state }}>
      {children}
    </ParentContext.Provider>
  );
};
