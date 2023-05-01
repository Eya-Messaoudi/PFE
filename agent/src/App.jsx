import Classes from "./pages/Classes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";

import TeacherList from "./pages/TeachersList";
import ParentList from "./pages/ParentsList";
import ClasseDetail from "./pages/ClasseDetail";
import ProfileParent from "./pages/ProfileParent";
import ProfileEnseignant from "./pages/ProfileEnseignant";
import { Route, Routes, Navigate } from "react-router-dom";
import Agents from "./pages/agentsList";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          {user && (
            <div className="sideBar col-auto col-md-2 min-vh-100 text-white">
              <Navbar />
            </div>
          )}

          <div className="col">
            <Routes>
              <Route
                exact
                path="/"
                element={user ? <Home /> : <Navigate to="/login" />}
              ></Route>
              <Route
                exact
                path="/teachers"
                element={user ? <TeacherList /> : <Navigate to="/login" />}
              ></Route>
              <Route
                exact
                path="/parents"
                element={user ? <ParentList /> : <Navigate to="/login" />}
              ></Route>
              <Route
                exact
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              ></Route>
              <Route
                exact
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
              ></Route>
              <Route
                exact
                path="/classesList"
                element={user ? <Classes /> : <Navigate to="/login" />}
              ></Route>
              <Route
                exact
                path="/details/:id"
                element={user ? <ClasseDetail /> : <Navigate to="/login" />}
              ></Route>
              <Route
                exact
                path="/profileParent/:id"
                element={user ? <ProfileParent /> : <Navigate to="/login" />}
              ></Route>
              <Route
                exact
                path="/profileEnseignant/:id"
                element={
                  user ? <ProfileEnseignant /> : <Navigate to="/login" />
                }
              ></Route>
              <Route
                exact
                path="/agentsList"
                element={user ? <Agents /> : <Navigate to="/login" />}
              ></Route>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
