import "./App.css";
import { useAuthContext } from "./hooks/useAuthContext";
import { Route, Routes } from "react-router-dom";
import NavFoot from "./components/Navbar";
import Footer from "./components/Footer";
import AcceuilE from "./teacherPages/pageAccuiel";
import Home from "./pages/Home";
import About from "./pages/About";
import Gallerie from "./pages/Gallerie";
import Details from "./teacherPages/classeDetails";
import AcceuilP from "./parentPages/acceuilP";
import Cours from "./parentPages/cours";
import ProfileParent from "./teacherPages/profileParent";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import { useEffect } from "react";
import ProfileTeacher from "./parentPages/profileTeacher";
import ForgetPass from "./pages/forgetPass";
import VerificationCode from "./pages/verifacationCode";
import ChangePass from "./pages/changePass";
import MyProfile from "./teacherPages/myProfile";
import MonProfile from "./parentPages/myProfile";
const App = () => {
  const { user } = useAuthContext();
  useEffect(() => {}, [user]);

  return (
    <div className="App">
      <NavFoot />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/AcceuilP" element={user ? <AcceuilP /> : <Login />} />
          <Route path="/AcceuilE" element={user ? <AcceuilE /> : <Login />} />
          <Route
            path="/coursChild/:id"
            element={user ? <Cours /> : <Login />}
          />
          <Route path="/cours/:id" element={user ? <Details /> : <Login />} />
          <Route path="/About" element={<About />} />
          <Route path="/gallerie" element={<Gallerie />} />
          <Route path="/forgetPass" element={<ForgetPass />} />
          <Route path="/code" element={<VerificationCode />} />

          <Route path="/nouveau" element={<ChangePass />} />
          <Route
            path="/profileParent/:id"
            element={user ? <ProfileParent /> : <Login />}
          />
          <Route
            path="/profileTeacher/:id"
            element={user ? <ProfileTeacher /> : <Login />}
          />
          <Route path="/myProfile" element={user ? <MyProfile /> : <Login />} />
          <Route
            path="/monProfile"
            element={user ? <MonProfile /> : <Login />}
          />
          <Route path="/login" element={!user ? <Login /> : <Home />} />
          <Route path="/signup" element={!user ? <Signup /> : <Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
