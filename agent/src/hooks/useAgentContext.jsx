import { AgentContext } from "../context/agentContext";
import { useContext } from "react";

export const useAgentContext = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw Error("useAgentContext must be used inside an AgentContextProvider");
  }

  return context;
};
