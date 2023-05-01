import { createContext, useReducer } from "react";

export const TeacherContext = createContext();

export const teacherReducer = (state, action) => {
  switch (action.type) {
    case "SET_TEACHER":
      return {
        teachers: action.payload,
      };
    case "CREATE_TEACHER":
      return {
        teachers: [action.payload, ...state.teachers],
      };
    case "DELETE_TEACHER":
      return {
        teachers: state.teachers.filter((t) => t._id !== action.payload._id),
      };
    default:
      return state;
  }
};
export const TeacherContextProvider = ({ children }) => {
  const [state, dispatchT] = useReducer(teacherReducer, {
    teachers: null,
  });

  return (
    <TeacherContext.Provider value={{ dispatchT, ...state }}>
      {children}
    </TeacherContext.Provider>
  );
};
