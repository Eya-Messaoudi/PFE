import { createContext, useReducer } from "react";

export const NotificationContext = createContext();

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return {
        notifications: [...state.notifications, action.payload],
      };
    case "REMOVE_NOTIFICATION":
      return {
        notifications: state.notifications.filter(
          (n) => n.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export const NotificationContextProvider = ({ children }) => {
  const [state, dispatchN] = useReducer(notificationReducer, {
    notifications: [],
  });

  return (
    <NotificationContext.Provider value={{ dispatchN, ...state }}>
      {children}
    </NotificationContext.Provider>
  );
};
