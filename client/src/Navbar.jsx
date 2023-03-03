import React from "react";
import logoParadis from "./images/logo.png";

import { Link, useMatch, useResolvedPath } from "react-router-dom";

const NavFoot = () => {
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
            className="listeItem collapse navbar-collapse justify-content-end align-center"
            id="navbarSupportedContent"
          >
            <ul className=" navbar-nav mr-auto">
              <CustomLink className="nav-link" to="/">
                Home
              </CustomLink>

              <CustomLink className="nav-link" to="/About">
                About
              </CustomLink>

              <CustomLink className="nav-link " to="/Blog">
                Blog
              </CustomLink>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <button
                className="btn btn-outline-light text-white my-2 my-sm-0 text-secondary "
                type="submit"
              >
                Sign In
              </button>
            </form>
          </div>
        </nav>
      </section>
      {/*body*/}
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
