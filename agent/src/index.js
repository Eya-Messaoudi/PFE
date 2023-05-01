import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ClassesContextProvider } from "./context/classesContext";
import { AgentContextProvider } from "./context/agentContext";
import { TeacherContextProvider } from "./context/teacherContext";
import { ParentContextProvider } from "./context/parentContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <TeacherContextProvider>
          <ParentContextProvider>
            <ClassesContextProvider>
              <AgentContextProvider>
                <App />
              </AgentContextProvider>
            </ClassesContextProvider>
          </ParentContextProvider>
        </TeacherContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
