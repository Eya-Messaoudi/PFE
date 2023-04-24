import p1 from "../images/p1.jpg";
import p2 from "../images/p2.jpg";
import p3 from "../images/p3.jpg";
import p4 from "../images/p4.png";
import p7 from "../images/p7.jpg";
import p8 from "../images/p8.jpg";
import p9 from "../images/p9.jpg";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="body d-flex flex-column min-vh-100 ">
        <div className="slides">
          <div
            id="carouselExampleCaptions"
            className="carousel carousel-dark slide "
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="10000">
                <img src={p7} className="d-block w-100" alt="..." />
                <div className="carousel-caption  d-md-block">
                  <h5>First slide label</h5>
                  <p>
                    Some representative placeholder content for the first slide.
                  </p>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <img src={p8} className="d-block w-100" alt="..." />
                <div className="carousel-caption  d-md-block">
                  <h5>Second slide label</h5>
                  <p>
                    Some representative placeholder content for the second
                    slide.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img src={p9} className="d-block w-100" alt="..." />
                <div className="carousel-caption  d-md-block">
                  <h5>Third slide label</h5>
                  <p>
                    Some representative placeholder content for the third slide.
                  </p>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
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
              data-bs-target="#carouselExampleCaptions"
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
        <div className="whyParadis mt-3 mb-2">
          <div className="intro text-white text-center m-3">
            <h5 className="display-5">Why Paradis ?</h5>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. A
              pariatur ex expedita, ea cupiditate perspiciatis enim rem voluptas
              illo? Corporis at minima dicta suscipit, aspernatur, nobis maiores
              dolore natus dolor numquam delectus sed totam eum atque rem quia
              in aut
            </p>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="col">
              <div className="card card1 h-100">
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card card2 h-100">
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This card has supporting text below as a natural lead-in to
                    additional content.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card card3 h-100">
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This card has even longer
                    content than the first to show that equal height action.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Activities mt-4 container text-center">
          <div className="intro text-white m-3">
            <h5 className="display-5">Our Clubs</h5>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. A
              pariatur ex expedita, ea cupiditate perspiciatis enim rem voluptas
              illo? Corporis at minima dicta suscipit, aspernatur, nobis maiores
              dolore natus dolor numquam delectus sed totam eum atque rem quia
              in aut
            </p>
          </div>
          <div className="row row-cols-1 row-cols-sm-3 row-cols-md-3 g-1">
            <div className="col">
              <div className="card card1">
                <img src={p1} alt="..." className="card-img-top m-0 " />
                <div className="card-body">
                  <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Temporibus alias placeat quam dicta illum sapiente,
                    deleniti, aliquid voluptate nostrum reiciendis autem
                  </p>
                </div>
              </div>
            </div>
            <div className="col ">
              <div className="card card2">
                <img src={p2} alt="..." className="card-img-top m-0" />
                <div className="card-body">
                  <p className="card-text">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Magnam impedit reiciendis, quidem illum quae, quia, fuga
                    voluptatibus recusandae magni corrupti
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card card3">
                <img src={p3} alt="..." className="card-img-top m-0 " />
                <div className="card-body">
                  <p className="card-text">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Magnam impedit reiciendis, quidem illum quae, quia, fuga
                    voluptatibus recusandae magni corrupti
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="quotes mt-2 text-white text-center mb-5">
          <div
            id="carouselExampleCaptions1"
            className="carousel slide "
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions1"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions1"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions1"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="5000">
                <img src={p4} alt="..." className="d-block w-100" />
                <div className="carousel-caption  d-md-block">
                  <figure className="text-center">
                    <blockquote className="blockquote">
                      <p>A well-known quote, contained in a blockquote .</p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                      Someone famous in{" "}
                      <cite title="Source Title">Source Title</cite>
                    </figcaption>
                  </figure>
                </div>
              </div>
              <div className="carousel-item " data-bs-interval="2000">
                <img src={p4} alt="..." className="d-block w-100" />
                <div className="carousel-caption  d-md-block">
                  <figure className="text-center">
                    <blockquote className="blockquote">
                      <p>
                        A well-known quote, contained in a blockquote element.
                      </p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                      Someone famous in{" "}
                      <cite title="Source Title">Source Title</cite>
                    </figcaption>
                  </figure>
                </div>
              </div>
              <div className="carousel-item " data-bs-interval="1000">
                <img src={p4} alt="..." className="d-block w-100" />
                <div className="carousel-caption  d-md-block">
                  <figure className="text-center">
                    <blockquote className="blockquote">
                      <p>
                        A well-known quote, contained in a blockquote element.
                      </p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                      Someone famous in{" "}
                      <cite title="Source Title">Source Title</cite>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
