import { CoursContext } from "../context/coursContext";
import { useContext } from "react";

export const useCoursContext = () => {
  const context = useContext(CoursContext);
  if (!context) {
    throw Error("useCoursContext must be used inside an coursContextProvider");
  }

  return context;
};
