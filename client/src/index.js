import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext";
import { CoursContextProvider } from "./context/coursContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <CoursContextProvider>
          <App />
        </CoursContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
