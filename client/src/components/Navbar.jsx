import React from "react";
import logoParadis from "../images/logo.png";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const NavFoot = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="navFoot">
      {/*navbar*/}
      <section className="NAVBAR">
        <nav className="navbar navbar-expand-lg navbar-light  ">
          <div className="logo">
            <img
              src={logoParadis}
              alt=""
              width={"200px"}
              className="mx-3 my-2"
            />
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon text-white"></span>
          </button>

          <div
            className="listeItem collapse navbar-collapse justify-content-end align-center ms-3"
            id="navbarSupportedContent"
          >
            <ul className=" navbar-nav mr-auto">
              <CustomLink className="nav-link" to="/">
                Acceuil
              </CustomLink>

              <CustomLink className="nav-link" to="/About">
                A propos
              </CustomLink>

              <CustomLink className="nav-link " to="/gallerie">
                Gallerie
              </CustomLink>
              {!user && (
                <CustomLink className="nav-link " to="/login">
                  se connecter
                </CustomLink>
              )}

              {user && (
                <li className="nav-item dropdown">
                  <div
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.email}
                  </div>
                  <ul className="dropdown-menu">
                    <CustomLink
                      className="dropdown-item"
                      to={user.role === "teacher" ? "/AcceuilE" : "/AcceuilP"}
                    >
                      Acceuil
                    </CustomLink>

                    <CustomLink
                      className="dropdown-item"
                      to={
                        user.role === "teacher" ? "/myProfile" : "/monProfile"
                      }
                    >
                      profile
                    </CustomLink>

                    <li>
                      <div
                        className="dropdown-item logout"
                        onClick={handleClick}
                      >
                        se deconnecter
                      </div>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </section>
    </div>
  );
};
function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
export default NavFoot;
