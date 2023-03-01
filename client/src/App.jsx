import "./App.css";
import logoParadis from "./logo.png";
import paradis from "./paradis.png";

function App() {
  return (
    <div className="App">
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
              <li className="nav-item active">
                <a className="nav-link" href="">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="#">
                  Blog
                </a>
              </li>
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
      <section className="body d-flex flex-column min-vh-100 "></section>
      {/*footer*/}
      <section className="FOOTER">
        <footer className="footer mt-auto ">
          <div className="waves">
            <div className="wave" id="wave1"></div>
            <div className="wave" id="wave2"></div>
            <div className="wave" id="wave3"></div>
            <div className="wave" id="wave4"></div>
          </div>
          <ul className="social_icon">
            <li>
              <a href="">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>
            <li>
              <a href="">
                <ion-icon name="logo-google"></ion-icon>
              </a>
            </li>
            <li>
              <a href="">
                <ion-icon name="logo-youtube"></ion-icon>
              </a>
            </li>
          </ul>
          <ul className="menu">
            <li>
              <a href="#">Home</a>{" "}
            </li>
            <li>
              <a href="#">Blog</a>{" "}
            </li>
            <li>
              <a href="#">About</a>{" "}
            </li>
          </ul>
          <p>©2023 Ecole Paradis |All Rights Reserved </p>
        </footer>
      </section>
    </div>
  );
}

export default App;
