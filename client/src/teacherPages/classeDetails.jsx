import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import parentt from "../images/teacher.jpg";
import parentss from "../images/parents.jpg";
import HomeworkModal from "../components/creatHomeworkModal";
import { useCoursContext } from "../hooks/useCoursContext";
import { useAuthContext } from "../hooks/useAuthContext";
const Details = () => {
  const [parents, setParents] = useState([]);
  const { id } = useParams();
  const [error, setError] = useState(null);
  const API_BASE = "http://localhost:3002/teacher";
  const { cours, dispatchC } = useCoursContext();
  const { user } = useAuthContext();
  const [newText, setNewText] = useState(" ");
  const [display, setDisplay] = useState("d-none");
  const [editingPostId, setEditingPostId] = useState(null);

  useEffect(() => {
    const getParents = async () => {
      const response = await fetch(API_BASE + "/parentsList/" + id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setParents(json);
      }
    };
    if (user) {
      getParents();
    }
    const getCours = async () => {
      const response = await fetch(API_BASE + "/cours/" + id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatchC({ type: "SET_COURS", payload: json.cours });
      }
    };

    if (user) {
      getCours();
    }
  }, [id, dispatchC]);
  const deleteCours = async (idC) => {
    const response = await fetch(API_BASE + "/deleteCours/" + idC, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatchC({ type: "DELETE_COURS", payload: json.cours });
      setError("");
    }
    if (!response.ok) {
      setError(json.error);
    }
  };
  const modifyCours = async (idC) => {
    if (!user) {
      return;
    }
    const response = await fetch(API_BASE + "/changeText/" + idC, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        newText: newText,
      }),
    });
    const json = await response.json();
    if (response.ok) {
      setDisplay("d-none");
      window.location.reload();
    }
  };
  return (
    <div className="body d-flex flex-column min-vh-100 ">
      <div className="container-fluid">
        <div className="row teacher">
          <div className="sideBar  col-auto col-md-2 min-vh-100 text-white shadow-lg p-3 mb-5 bg-body-tertiary rounded ms-1 mt-3 ">
            <button
              className="btn sticky"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithBothOptions"
              aria-controls="offcanvasWithBothOptions"
            >
              <ion-icon name="menu-outline"></ion-icon>
            </button>

            <div
              className="offcanvas offcanvas-start"
              data-bs-scroll="true"
              tabIndex="-1"
              id="offcanvasWithBothOptions"
              aria-labelledby="offcanvasWithBothOptionsLabel"
            >
              <div className="offcanvas-header text-white">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                  List des parents
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <div className="parentList mt-4">
                  {parents &&
                    parents.map((parent) => (
                      <div
                        className="container oneParent mb-3"
                        key={parent._id}
                      >
                        <div className=" parent d-flex align-items-center">
                          <div className="circle-container me-3">
                            <img
                              src={parentss}
                              alt=""
                              className="profile-image"
                            />
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <Link
                              className="text-decoration-none text-dark text-white"
                              to={`/profileParent/${parent._id}`}
                            >
                              {parent.nom} {parent.prenom}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
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
                  <HomeworkModal
                    targetId="creatCours"
                    idC={id}
                    onError={setError}
                  />
                </div>
                {error && (
                  <div
                    className="alert alert-danger"
                    role="alert"
                    onClick={() => {
                      setError(null);
                    }}
                  >
                    {error}
                  </div>
                )}
              </div>
            </div>

            {cours &&
              cours.map((cours, index) => (
                <div
                  className="row posts shadow-lg p-3 mb-5 bg-body-tertiary rounded me-3"
                  key={index}
                >
                  <div className=" card  mb-3 border-none">
                    <div className="card-header bg-transparent d-flex justify-content-between ">
                      <div className="d-flex align-items-center">
                        <div className="circle-container me-3">
                          <img src={parentt} alt="" className="profile-image" />
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <Link
                            className="text-decoration-none text-dark"
                            to="/myProfile"
                          >
                            {cours.teacher.nom} {cours.teacher.prenom}
                          </Link>
                        </div>
                      </div>
                      <div className="btn-group">
                        <button
                          className="btn btn-sm bg bg-white"
                          type="button"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <ion-icon name="ellipsis-vertical"></ion-icon>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <button
                              className="btn bg bg-white"
                              onClick={() => {
                                setDisplay("");
                                setEditingPostId(cours._id);
                              }}
                            >
                              {" "}
                              modifier
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn bg bg-white"
                              onClick={() => {
                                deleteCours(cours._id);
                              }}
                            >
                              supprimer
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card-body text-secondary ">
                      <div className="container">
                        <p className="card-title text-danger">
                          {" "}
                          à faire pour le :{" "}
                          {new Date(cours.toDoBefore).toLocaleString("fr-FR", {
                            day: "numeric",
                            month: "long",
                          })}
                        </p>

                        <p className="text-danger">{cours.matiere}</p>

                        <div className="row g-0">
                          {editingPostId === cours._id ? (
                            <>
                              <p
                                className="card-text p-3 fs-4"
                                style={{ wordWrap: "break-word" }}
                              >
                                {cours.content.text}
                              </p>
                              <textarea
                                type="text"
                                className={`form-control mb-2  ${display}`}
                                value={newText}
                                onChange={(e) => {
                                  setNewText(e.target.value);
                                }}
                              />

                              <div className="d-flex justify-content-between">
                                <div className="">
                                  <button
                                    className={`btn btn text-white ${display} mb-3`}
                                    onClick={() => {
                                      modifyCours(cours._id);
                                    }}
                                  >
                                    Enregistrer
                                  </button>
                                </div>
                                <div className="col">
                                  <button
                                    className={`btn text-white ${display} ms-2`}
                                    onClick={() => {
                                      setDisplay("d-none");
                                    }}
                                  >
                                    Annuler
                                  </button>
                                </div>
                              </div>
                            </>
                          ) : (
                            <p
                              className="card-text p-3 fs-5 d-inline"
                              style={{ overflowWrap: "break-word" }}
                            >
                              {cours.content.text}
                            </p>
                          )}

                          {cours.content.fileUrl && (
                            <div className="fileName">
                              <p className="">
                                <a
                                  href={`http://localhost:3002/${cours.content.fileUrl}`}
                                  download
                                  className="link-underline-light text-info fs-5 p-3"
                                >
                                  {cours.content.fileUrl.substring(
                                    cours.content.fileUrl.lastIndexOf("-") + 1
                                  )}
                                </a>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-transparent shadow-sm p-3 mt-2 mb-1 bg-body-tertiary rounded ">
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
                            {cours.comments &&
                              cours.comments.map((comment, index) => (
                                <div className="accordion-body">
                                  <div className="card  mb-3 " key={index}>
                                    <div className="card-header bg-transparent ">
                                      <div className="d-flex align-items-center">
                                        <div className="circle-container me-3">
                                          <img
                                            src={parentss}
                                            className="profile-image"
                                            alt=""
                                          />
                                        </div>
                                        <div className="d-flex flex-column justify-content-center"></div>
                                      </div>
                                    </div>
                                    <div className="card-body text-secondary ">
                                      <p className="card-text">
                                        {comment.content}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Details;
