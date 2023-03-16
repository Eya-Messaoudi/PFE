import React from "react";
import paradisimg from "../images/paradis.png";
import logoParadis from "../images/logo.png";
import "./About.css";

const About = () => {
  return (
    <>
      <section>
        <div className="section body d-flex flex-column min-vh-100">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="title">
                  <h1>About us</h1>
                </div>
                <div className="content">
                  <div className="article">
                    <h3>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Obcaecati eligendi, enim, illo voluptatibus tempore
                      perspiciatis recusandae quod commodi maxime dolorum omnis
                      placeat. Quae, excepturi nobis iusto voluptate porro modi
                      adipisci.
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Assumenda excepturi unde sint, eligendi labore soluta
                      nesciunt at! Natus possimus magni autem laborum, modi ab
                      aliquid eos vitae alias id nesciunt?
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="image-section">
                  <img
                    src={paradisimg}
                    alt=""
                    width={"200px"}
                    className="mx-4 my-5 "
                  />
                </div>
              </div>
            </div>
            <div className="row row-cols_1 row-cols-md-2 g-4">
              <div className="col">
                <div className="card">
                  <img src={paradisimg} className="card-img-top" alt="" />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card">
                  <img src={paradisimg} className="card-img-top" alt="" />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card">
                  <img src={paradisimg} className="card-img-top" alt="" />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card">
                  <img src={paradisimg} className="card-img-top" alt="" />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
