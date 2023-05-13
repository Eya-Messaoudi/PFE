import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import parentt from "../images/parents.jpg";
import { useAuthContext } from "../hooks/useAuthContext";

const Cours = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);
  const [cours, setCours] = useState([]);
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
                  className="row posts shadow-lg p-3 mb-5 bg-body-tertiary rounded me-3 mt-3 ms-3"
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
                            to={`/profileTeacher/${cours.teacher._id}`}
                          >
                            {cours.teacher.nom} {cours.teacher.prenom}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="card-body text-secondary ">
                      <h5 className="card-title">
                        {" "}
                        à faire pour le :{" "}
                        {new Date(cours.toDoBefore).toLocaleString("fr-FR", {
                          day: "numeric",
                          month: "long",
                        })}
                      </h5>

                      <p className="card-text">{cours.content.text}</p>
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
                                  <div
                                    className="card border border-secondary mb-3 "
                                    key={index}
                                  >
                                    <div className="card-header bg-transparent ">
                                      <div className="d-flex align-items-center">
                                        <div className="circle-container me-3">
                                          <img
                                            src={parentt}
                                            className="profile-image"
                                            alt=""
                                          />
                                        </div>
                                        <div className="d-flex flex-column justify-content-center">
                                          <Link
                                            className="text-decoration-none text-dark"
                                            to="/profile"
                                          >
                                            Parent Name
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="card-body text-secondary ">
                                      <p className="card-text">
                                        contenu du commentaire
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

export default Cours;
