import { createContext, useReducer } from "react";

export const CoursContext = createContext();

export const coursReducer = (state, action) => {
  switch (action.type) {
    case "SET_COURS":
      return {
        cours: action.payload,
      };
    case "CREATE_COURS":
      return {
        cours: [action.payload, ...state.cours],
      };
    case "DELETE_COURS":
      return {
        cours: state.cours.filter((c) => c._id !== action.payload._id),
      };
    default:
      return state;
  }
};
export const CoursContextProvider = ({ children }) => {
  const [state, dispatchC] = useReducer(coursReducer, {
    cours: [],
  });

  return (
    <CoursContext.Provider value={{ dispatchC, ...state }}>
      {children}
    </CoursContext.Provider>
  );
};
