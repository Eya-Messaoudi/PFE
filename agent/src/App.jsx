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
                element={user ? <Home /> : <Login />}
              ></Route>
              <Route
                exact
                path="/teachers"
                element={user ? <TeacherList /> : <Login />}
              ></Route>
              <Route
                exact
                path="/parents"
                element={user ? <ParentList /> : <Login />}
              ></Route>
              <Route
                exact
                path="/login"
                element={!user ? <Login /> : <Home />}
              ></Route>
              <Route
                exact
                path="/signup"
                element={!user ? <Signup /> : <Home />}
              ></Route>
              <Route
                exact
                path="/classesList"
                element={user ? <Classes /> : <Login />}
              ></Route>
              <Route
                exact
                path="/details/:id"
                element={user ? <ClasseDetail /> : <Login />}
              ></Route>
              <Route
                exact
                path="/profileParent/:id"
                element={user ? <ProfileParent /> : <Login />}
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
                element={user ? <Agents /> : <Login />}
              ></Route>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
