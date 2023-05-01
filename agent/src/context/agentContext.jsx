import { createContext, useReducer } from "react";

export const AgentContext = createContext();

export const agentReducer = (state, action) => {
  switch (action.type) {
    case "SET_AGENT":
      return {
        agents: action.payload,
      };
    case "CREATE_AGENT":
      return {
        agents: [...state.agents, action.payload],
      };
    case "DELETE_AGENT":
      return {
        agents: state.agents.filter((a) => a._id !== action.payload._id),
      };
    default:
      return state;
  }
};
export const AgentContextProvider = ({ children }) => {
  const [state, dispatchA] = useReducer(agentReducer, {
    agents: null,
  });

  return (
    <AgentContext.Provider value={{ dispatchA, ...state }}>
      {children}
    </AgentContext.Provider>
  );
};
