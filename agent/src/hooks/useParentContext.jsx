import { ParentContext } from "../context/parentContext";
import { useContext } from "react";

export const useParentContext = () => {
  const context = useContext(ParentContext);
  if (!context) {
    throw Error(
      "useParentContext must be used inside an parentContextProvider"
    );
  }

  return context;
};
