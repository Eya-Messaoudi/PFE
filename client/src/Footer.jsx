import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer ">
        <div className="waves container">
          <div className="wave" id="wave1"></div>
          <div className="wave" id="wave2"></div>
          <div className="wave" id="wave3"></div>
          <div className="wave" id="wave4"></div>
        </div>
        <ul className="social_icon">
          <li>
            <a href="https://www.facebook.com/Ecole.Le.Paradis.Manouba/?locale=fr_FR">
              <ion-icon name="logo-facebook"></ion-icon>
            </a>
          </li>
          <li>
            <a href="">
              <ion-icon name="logo-google"></ion-icon>
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/channel/UC_Nztb61vfx2ICPFbx7X8Kw/discussion">
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
    </div>
  );
};
export default Footer;
