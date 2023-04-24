import Classes from "./pages/Classes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import Navbar from "./components/Navbar";

import TeacherList from "./pages/TeachersList";
import ParentList from "./pages/ParentsList";
import ClasseDetail from "./pages/ClasseDetail";
import Profile from "./pages/Profile";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <div className="sideBar col-auto col-md-2 min-vh-100 text-white ">
            <Navbar />
          </div>

          <div className="col ">
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/teachers" element={<TeacherList />}></Route>
              <Route exact path="/parents" element={<ParentList />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/signup" element={<Signup />}></Route>
              <Route exact path="/classesList" element={<Classes />}></Route>
              <Route
                exact
                path="/details/:id"
                element={<ClasseDetail />}
              ></Route>
              <Route exact path="/profile/:id" element={<Profile />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
