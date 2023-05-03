import { Link } from "react-router-dom";
import parentt from "../images/parents.jpg";
import HomeworkModal from "../components/creatHomeworkModal";
const Details = () => {
  return (
    <div className="body d-flex flex-column min-vh-100 ">
      <div className="container-fluid">
        <div className="row">
          <div className="sideBar col-auto col-md-2 min-vh-100 text-white shadow-lg p-3 mb-5 bg-body-tertiary rounded ms-1 mt-3 ">
            <button
              className="btn"
              type="button"
              data-toggle="collapse"
              data-target="#parentsList"
              aria-controls="parentsList"
              aria-expanded="false"
            ></button>

            <div
              className="parentList mt-4 collapse collapse-horizontal "
              id="parentsList"
            >
              <div className="container oneParent mb-3">
                <div className=" parent d-flex align-items-center">
                  <div className="circle-container me-3">
                    <img src={parentt} className="profile-image" />
                  </div>
                  <div className="d-flex flex-column justify-content-center">
                    <Link
                      className="text-decoration-none text-dark text-white"
                      to="/profile"
                    >
                      Parent Name
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col mt-5 ms-4">
            <div className="row creat-homework shadow-lg p-3 mb-4 bg-body-tertiary rounded me-3">
              <div className="card w-100 h-25 mb-3 ">
                <div className="card-body d-flex justify-content-between fs-3">
                  <p
                    className="card-text fs-6  align-self-center"
                    data-bs-toggle="modal"
                    data-bs-target="#creatCours"
                  >
                    Ajouter un devoir{" "}
                  </p>{" "}
                  <ion-icon name="add-circle-outline"></ion-icon>
                  {/*<button type="button" className="btn " data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
  </button>*/}
                  <HomeworkModal targetId="creatCours" />
                </div>
              </div>
            </div>
            <div className="row posts shadow-lg p-3 mb-5 bg-body-tertiary rounded me-3">
              <div className="card  mb-3 border-none">
                <div className="card-header bg-transparent ">
                  <div className="d-flex align-items-center">
                    <div className="circle-container me-3">
                      <img src={parentt} className="profile-image" />
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                      <Link
                        className="text-decoration-none text-dark"
                        to="/profile"
                      >
                        Teacher Name
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body text-secondary ">
                  <h5 className="card-title">deadline et matiere </h5>
                  <p className="card-text">contenu du post</p>
                </div>
                <div className="card-footer bg-transparent shadow-sm p-3 mt-2 mb-1 bg-body-tertiary rounded ">
                  <div className="form-floating fs-7 text-secondary">
                    <textarea
                      className="form-control"
                      placeholder="Leave a comment here"
                      id="floatingTextarea"
                    ></textarea>
                    <label className="" htmlFor="floatingTextarea">
                      Ajouter un commentaire privée{" "}
                    </label>
                  </div>
                  <div className="accordion mt-3" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Commentaires
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        data-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <strong>
                            This is the first item's accordion body.
                          </strong>{" "}
                          It is shown by default, until the collapse plugin adds
                          the appropriate classes that we use to style each
                          element. These classes control the overall appearance,
                          as well as the showing and hiding via CSS transitions.
                          You can modify any of this with custom CSS or
                          overriding our default variables. It's also worth
                          noting that just about any HTML can go within the{" "}
                          <code>.accordion-body</code>, though the transition
                          does limit overflow.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Details;
