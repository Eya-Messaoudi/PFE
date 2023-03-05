import React from "react";
import logoParadis from "./images/logo.png";

const Footer = () => {
  return (
    <div>
      <footer className="footer ">
        <div className="waves ">
          <div className="wave" id="wave1"></div>
          <div className="wave" id="wave2"></div>
          <div className="wave" id="wave3"></div>
          <div className="wave" id="wave4"></div>
        </div>
        <div className="container">
          <div className="row">
            <div className="footer-col">
              <h4>Links</h4>
              <ul>
                <li>
                  <a href="">Home</a>
                </li>
                <li>
                  <a href="">About</a>
                </li>
                <li>
                  <a href="">Blog</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact Us</h4>
              <ul>
                <li>Adresse: 12 Avenue de l'Environnement , 2010 Manouba</li>
                <li>Tel: +216 22 55 27 04 / 71 60 79 11</li>
                <li>
                  Email: <br></br> ecoleprimaire.leparadis@topnet.tn
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Follow us</h4>

              <div className="social-links">
                <a href="">
                  <ion-icon name="logo-facebook"></ion-icon>
                </a>

                <a href="">
                  <ion-icon name="logo-youtube"></ion-icon>
                </a>

                <a href="">
                  <ion-icon name="logo-google"></ion-icon>
                </a>
              </div>
            </div>
            <div className="footer-col">
              <ul>
                <li>
                  {" "}
                  <img
                    src={logoParadis}
                    alt=""
                    width={"200px"}
                    className="mx-4 my-5 "
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
