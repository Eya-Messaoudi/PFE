import { createContext, useReducer } from "react";

export const ClassesContext = createContext();

export const classesReducer = (state, action) => {
  switch (action.type) {
    case "SET_CLASSES":
      return {
        classes: action.payload,
      };
    case "CREATE_CLASSES":
      return {
        classes: [...state.classes, action.payload],
      };
    case "DELETE_CLASSE":
      return {
        classes: state.classes.filter((c) => c._id !== action.payload._id),
      };
    case "ADD_TEACHER":
      return {
        classes: state.classes.map((classe) => {
          if (classe._id === action.payload.classId) {
            return {
              ...classe,
              teachers: [...classe.teachers, action.payload.teacher],
            };
          }
          return classe;
        }),
      };
    case "ADD_PARENT":
      return {
        classes: state.classes.map((classe) => {
          if (classe._id === action.payload.classId) {
            return {
              ...classe,
              parents: [...classe.parents, action.payload.parent],
            };
          }
          return classe;
        }),
      };
    case "REMOVE_TEACHER":
      return {
        classes: state.classes.map((classe) => {
          if (classe._id === action.payload.classId) {
            return {
              ...classe,
              teachers: classe.teachers.filter(
                (teacher) => teacher._id !== action.payload.teacherId
              ),
            };
          }
          return classe;
        }),
      };
    case "REMOVE_PARENT":
      return {
        classes: state.classes.map((classe) => {
          if (classe._id === action.payload.classId) {
            return {
              ...classe,
              parents: classe.parents.filter(
                (parent) => parent._id !== action.payload.parentId
              ),
            };
          }
          return classe;
        }),
      };

    default:
      return state;
  }
};
export const ClassesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(classesReducer, {
    classes: [],
  });

  return (
    <ClassesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ClassesContext.Provider>
  );
};
