import { TeacherContext } from "../context/teacherContext";
import { useContext } from "react";

export const useTeacherContext = () => {
  const context = useContext(TeacherContext);
  if (!context) {
    throw Error(
      "useTeacherContext must be used inside an teacherContextProvider"
    );
  }

  return context;
};
