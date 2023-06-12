import React from "react";
import paradisimg from "../images/paradis.png";

import P10 from "../images/P10.jpg";
import P11 from "../images/P11.jpg";
import P12 from "../images/P12.jpg";
import P13 from "../images/P13.jpg";
import P14 from "../images/P14.jpg";
import P15 from "../images/P15.jpg";
import P16 from "../images/P16.jpg";
import P17 from "../images/P17.jpg";
import P18 from "../images/P18.jpg";
import P19 from "../images/P19.jpg";
const Gallerie = () => {
  return (
    <div>
      <section className="body d-flex flex-column min-vh-100  ">
        <div className="card mb-3">
          <img src={paradisimg} className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p className="card-text">
              <small className="text-body-secondary">
                Last updated 3 mins ago
              </small>
            </p>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          <div className="col">
            <div className="card">
              <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={P13} className="card-img-top" alt="" />
                  </div>
                  <div className="carousel-item">
                    <img src={P14} className="card-img-top" alt="" />
                  </div>
                  <div className="carousel-item">
                    <img src={P15} className="card-img-top" alt="" />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExample"
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
                  data-bs-target="#carouselExample"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <div className="card-body">
                <h5 className="card-title">Séance de théatre</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div id="carouselExample2" className="carousel slide">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={P10} className="card-img-top" alt="" />
                  </div>
                  <div className="carousel-item">
                    <img src={P11} className="card-img-top" alt="" />
                  </div>
                  <div className="carousel-item">
                    <img src={P12} className="card-img-top" alt="" />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExample2"
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
                  data-bs-target="#carouselExample2"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div id="carouselExample3" className="carousel slide">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={P16} className="card-img-top" alt="" />
                  </div>
                  <div className="carousel-item">
                    <img src={P17} className="card-img-top" alt="" />
                  </div>
                  <div className="carousel-item">
                    <img src={P18} className="card-img-top" alt="" />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExample3"
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
                  data-bs-target="#carouselExample3"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div id="carouselExample4" className="carousel slide">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={P19} className="card-img-top" alt="" />
                  </div>
                  <div className="carousel-item">
                    <img src={paradisimg} className="card-img-top" alt="" />
                  </div>
                  <div className="carousel-item">
                    <img src={paradisimg} className="card-img-top" alt="" />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExample4"
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
                  data-bs-target="#carouselExample4"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content.
                </p>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
      </section>
    </div>
  );
};
export default Gallerie;
