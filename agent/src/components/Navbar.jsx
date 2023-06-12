import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../pages/Style/logo_le_paradis.jpg";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ height: "100%" }}
    >
      <div>
        <div className="circle-container mt-4">
          <img src={logo} className="profile-image " />
        </div>
        <ul className="navbar-nav mt-5 fs-5">
          <li className="nav-item px-1 mt-1  ">
            <Link className="nav-link  text-white mt-2" to="/">
              <ion-icon
                name="home-outline"
                className="text-white fw-bold "
              ></ion-icon>
              <span className="ms-3 d-none d-md-inline   ">Acceuil</span>
            </Link>
          </li>
          <li className="nav-item px-1 mt-1">
            <Link className="nav-link mt-2" to="/classesList">
              <ion-icon
                name="list-outline"
                className="text-white fw-bold "
              ></ion-icon>
              <span className="ms-3 d-none d-md-inline  ">
                Liste des classes
              </span>
            </Link>
          </li>
          <li className="nav-item px-1 mt-1">
            <Link className="nav-link mt-2" to="/teachers">
              <ion-icon
                name="people-outline"
                className="text-white fw-bold "
              ></ion-icon>
              <span className="ms-3 d-none d-md-inline  ">
                Liste des enseignants
              </span>
            </Link>
          </li>
          <li className="nav-item px-1 mt-1">
            <Link className="nav-link mt-2" to="/parents">
              <ion-icon
                name="people-circle-outline"
                className="text-white fw-bold  "
              ></ion-icon>
              <span className="ms-3 d-none d-md-inline  ">
                Liste des parents
              </span>
            </Link>
          </li>
          {user.email === "admin@gmail.com" && (
            <li className="nav-item px-1 mt-1  ">
              <Link className="nav-link  text-white mt-2" to="/agentsList">
                <ion-icon
                  name="body-outline"
                  className="text-white fw-bold "
                ></ion-icon>
                <span className="ms-3 d-none d-md-inline   ">
                  Liste des agents
                </span>
              </Link>
            </li>
          )}
        </ul>
      </div>
      {user && (
        <div className="mt-auto mb-4 fs-5" onClick={handleClick}>
          {/* Logout Link */}
          <Link className="nav-link d-flex align-items-center" to="">
            <ion-icon name="log-out-outline"></ion-icon>
            <span className="ms-3 d-none d-md-inline ">{user.email}</span>
          </Link>
        </div>
      )}
    </div>
  );
};
export default Navbar;
