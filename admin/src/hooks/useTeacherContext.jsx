import { TeacherContext } from "../context/teacherContext";
import { useContext } from "react";

export const useTeacherContext = () => {
  const context = useContext(TeacherContext);
  if (!context) {
    throw Error("blah blah blah!");
  }

  return context;
};
