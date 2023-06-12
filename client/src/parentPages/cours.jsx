import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import parentt from "../images/teacher.jpg";
import { useAuthContext } from "../hooks/useAuthContext";

const Cours = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);
  const [cours, setCours] = useState([]);
  const [comment, setComment] = useState("");
  const API_BASE = "http://localhost:3002/parent";
  useEffect(() => {
    const getTeachers = async () => {
      const response = await fetch(API_BASE + "/details/" + id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setTeachers(json);
      }
    };
    if (user) {
      getTeachers();
    }
  });
  const teacherCours = async (idT) => {
    const response = await fetch(API_BASE + "/teacherCours/" + idT + "/" + id, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      setCours(json.cours);
      setError(null);
    }
    if (!response.ok) {
      setError(json.error);
    }
  };
  const addAcomment = async (idC) => {
    const response = await fetch(API_BASE + "/addAcomment/" + idC, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        content: comment,
      }),
    });
    const json = await response.json();
    if (response.ok) {
      setComment(" ");
      setError(null);
      window.location.reload();
    }
    if (!response.ok) {
      setError(json.error);
    }
  };

  return (
    <div className="body d-flex flex-column min-vh-100 ">
      <div className="container-fluid">
        <div className="row parent">
          <div className="sideBar col-auto col-md-2 min-vh-100 text-white shadow-lg p-3 mb-5 bg-body-tertiary rounded ms-1 mt-3  ">
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
              tabndex="-1"
              id="offcanvasWithBothOptions"
              aria-labelledby="offcanvasWithBothOptionsLabel"
            >
              <div className="offcanvas-header text-white">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                  List des enseignants
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <div className="teacherList mt-4">
                  {teachers &&
                    teachers.map((teacher, index) => (
                      <div className="container oneTeacher mb-3" key={index}>
                        <div className=" teacher d-flex align-items-center">
                          <div className="circle-container me-3">
                            <img src={parentt} className="profile-image" />
                          </div>
                          <div
                            className="d-flex flex-column justify-content-center"
                            onClick={() => {
                              teacherCours(teacher._id);
                            }}
                            data-bs-dismiss="offcanvas"
                          >
                            <div className="text-decoration-none text-dark text-white cursor-pointer">
                              {teacher.nom} {teacher.prenom}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            {cours &&
              cours.map((cours, index) => (
                <div
                  className="row postsParent shadow-lg p-3 mb-5 bg-body-tertiary rounded me-3 mt-3 ms-3"
                  key={cours._id}
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
                            to={`/profileTeacher/${cours.teacher._id}`}
                          >
                            {cours.teacher.nom} {cours.teacher.prenom}
                          </Link>
                        </div>
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
                      </div>

                      <p className="card-text">{cours.content.text}</p>
                    </div>
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
                    <div className="card-footer bg bg-white  ">
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
                              Ajouter un commentaire privée
                            </button>
                          </h2>

                          <div
                            id="collapseOne"
                            className="accordion-collapse collapse show"
                            data-parent="#accordionExample"
                          >
                            <div className="d-flex align-items-center mt-3 mb-3 me-5 ms-1">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                              ></label>
                              <textarea
                                className="form-control form-control-sm flex-grow-1 me-2"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                style={{ width: "98%" }}
                                onChange={(e) => {
                                  setComment(e.target.value);
                                }}
                                value={comment}
                              ></textarea>
                              <ion-icon
                                name="send-sharp"
                                onClick={() => {
                                  addAcomment(cours._id);
                                }}
                              ></ion-icon>
                            </div>

                            {cours.comments &&
                              cours.comments.map((comment, index) => (
                                <div className="accordion-body">
                                  <div className="card  mb-3 " key={index}>
                                    <div className="card-body text-secondary ">
                                      <div className="d-flex align-items-center">
                                        <div className="circle-container me-3">
                                          <img
                                            src={parentt}
                                            className="profile-image"
                                            alt=""
                                          />
                                        </div>
                                        <div className="d-flex flex-column justify-content-center">
                                          <p className="card-text">
                                            {comment.content}
                                          </p>
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
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cours;
