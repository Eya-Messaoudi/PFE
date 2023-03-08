import React, { Fragment } from "react";

import p1 from "../images/p1.jpg";
import p2 from "../images/p2.jpg";
import p3 from "../images/p3.jpg";
import p4 from "../images/p4.jpg";
import p5 from "../images/p5.jpg";
import p6 from "../images/insc.png";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="body d-flex flex-column min-vh-100 ">
        <div className="top text-center top mb-2 min-vh-50">
          <div className="row g-0">
            <div className="col ">
              <h4>Why paradis?</h4>
              <p className="m-3 ">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Perspiciatis odit similique inventore perferendis corrupti
                dignissimos sequi, possimus quas dolore, pariatur amet nihil
                alias, maiores accusantium quidem harum voluptates. Incidunt,
                veniam?
              </p>
            </div>
            <div className="col ">
              <img src={p4} className="w-100" />
            </div>
          </div>
        </div>
        <div className="middle mt-5">
          <h3>Our Activities</h3>
          <div
            id="carouselExampleInterval"
            className="carousel slide m-5"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="1000">
                <img src={p1} className="d-block w-100" />
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <img src={p3} className="d-block w-100" />
              </div>
              <div className="carousel-item">
                <img src={p2} className="d-block w-100" />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
