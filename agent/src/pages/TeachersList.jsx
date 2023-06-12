import "./Style/list.css";
import profile from "./Style/teacher.jpg";
import { useEffect, useState } from "react";
import { useTeacherContext } from "../hooks/useTeacherContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const TeacherList = () => {
  const [error, setError] = useState(null);
  const [cin, setCin] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const { teachers, dispatchT } = useTeacherContext();
  const { user } = useAuthContext();
  const [matiéres, setMatieres] = useState([]);

  const API_Base = "http://localhost:3002";
  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await fetch(API_Base + "/admin/teachers", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatchT({ type: "SET_TEACHER", payload: json });
      }
    };
    if (user) {
      fetchTeachers();
    }
  }, [teachers, user]);
  const createTeacher = async (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    const response = await fetch(API_Base + "/admin/newTeacher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        cin: cin,
        nom: nom,
        prenom: prenom,
        matiéres: matiéres,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setCin("");
      setNom("");
      setPrenom("");
      setError(null);
      dispatchT({
        type: "CREATE_TEACHER",
        payload: {
          cin: json.cin,
          nom: json.nom,
          prenom: json.prenom,
          matieres: json.matiéres,
        },
      });
    }
  };

  const handleCloseClick = () => {
    setError(null);
    setCin("");
    setNom("");
    setPrenom("");
  };

  return (
    <div>
      <table className="table table-hover caption-top mt-5">
        <caption>Liste des Enseignants</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom et Prenom</th>
            <th colSpan="4" className="text-end">
              Handle
            </th>
          </tr>
        </thead>
        <tbody>
          {teachers &&
            teachers.map((teacher, index) => (
              <tr key={index}>
                <th scope="row">
                  <div className="circle-container">
                    <img src={profile} alt="" className="profile-image" />
                  </div>
                </th>
                <td colSpan="4">
                  <Link
                    to={`/profileEnseignant/${teacher._id}`}
                    className="text-decoration-none text-secondary"
                  >
                    {teacher.nom} {teacher.prenom}
                  </Link>
                </td>
                <td className="text-end fs-5  ">
                  <ion-icon name="eye-outline"></ion-icon>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {error && (
        <div
          className="row  error alert alert-danger mt-2 mx-2 text-center "
          role="alert"
        >
          {error}
        </div>
      )}
      <div className=" text-end mt-4">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal1"
          onClick={() => {
            setError(null);
          }}
        >
          Créer
        </button>
      </div>
      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                ajouter un Enseignant
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseClick}
              ></button>
            </div>
            <form onSubmit={createTeacher}>
              <div className="modal-body">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="12345678"
                    onChange={(e) => setCin(e.target.value)}
                    value={cin}
                  />
                  <label htmlFor="floatingInput">cin</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Ali"
                    onChange={(e) => setNom(e.target.value)}
                    value={nom}
                  />
                  <label htmlFor="floatingInput">nom</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="ben foulen"
                    onChange={(e) => setPrenom(e.target.value)}
                    value={prenom}
                  />
                  <label htmlFor="floatingInput">prénom</label>
                </div>
                <div className="matieres text-start">
                  <div className="alert alert-info" role="alert">
                    Les matieres qu'il ensigne
                  </div>
                  <h3 className="text-secondary">Matiére(s)</h3>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setMatieres((prevMatieres) => [
                            ...prevMatieres,
                            e.target.value,
                          ]);
                        } else {
                          setMatieres((prevMatieres) =>
                            prevMatieres.filter(
                              (matiere) => matiere !== e.target.value
                            )
                          );
                        }
                      }}
                      value="Arabe"
                      id="flexCheckChecked"
                    />

                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      Arabe
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setMatieres((prevMatieres) => [
                            ...prevMatieres,
                            e.target.value,
                          ]);
                        } else {
                          setMatieres((prevMatieres) =>
                            prevMatieres.filter(
                              (matiere) => matiere !== e.target.value
                            )
                          );
                        }
                      }}
                      value="Français"
                      id="flexCheckChecked"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      Français
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setMatieres((prevMatieres) => [
                            ...prevMatieres,
                            e.target.value,
                          ]);
                        } else {
                          setMatieres((prevMatieres) =>
                            prevMatieres.filter(
                              (matiere) => matiere !== e.target.value
                            )
                          );
                        }
                      }}
                      value="Anglais"
                      id="flexCheckChecked"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      Anglais
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setMatieres((prevMatieres) => [
                            ...prevMatieres,
                            e.target.value,
                          ]);
                        } else {
                          setMatieres((prevMatieres) =>
                            prevMatieres.filter(
                              (matiere) => matiere !== e.target.value
                            )
                          );
                        }
                      }}
                      value="Math"
                      id="flexCheckChecked"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      Math
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setMatieres((prevMatieres) => [
                            ...prevMatieres,
                            e.target.value,
                          ]);
                        } else {
                          setMatieres((prevMatieres) =>
                            prevMatieres.filter(
                              (matiere) => matiere !== e.target.value
                            )
                          );
                        }
                      }}
                      value="Éducation islamique"
                      id="flexCheckChecked"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      Éducation islamique
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setMatieres((prevMatieres) => [
                            ...prevMatieres,
                            e.target.value,
                          ]);
                        } else {
                          setMatieres((prevMatieres) =>
                            prevMatieres.filter(
                              (matiere) => matiere !== e.target.value
                            )
                          );
                        }
                      }}
                      value="Sport"
                      id="flexCheckChecked"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      Sport
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setMatieres((prevMatieres) => [
                            ...prevMatieres,
                            e.target.value,
                          ]);
                        } else {
                          setMatieres((prevMatieres) =>
                            prevMatieres.filter(
                              (matiere) => matiere !== e.target.value
                            )
                          );
                        }
                      }}
                      value="Musique"
                      id="flexCheckChecked"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      Musique
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setMatieres((prevMatieres) => [
                            ...prevMatieres,
                            e.target.value,
                          ]);
                        } else {
                          setMatieres((prevMatieres) =>
                            prevMatieres.filter(
                              (matiere) => matiere !== e.target.value
                            )
                          );
                        }
                      }}
                      value="Dessin"
                      id="flexCheckChecked"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      Dessin
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setMatieres((prevMatieres) => [
                            ...prevMatieres,
                            e.target.value,
                          ]);
                        } else {
                          setMatieres((prevMatieres) =>
                            prevMatieres.filter(
                              (matiere) => matiere !== e.target.value
                            )
                          );
                        }
                      }}
                      value="Histoire et Géographie"
                      id="flexCheckChecked"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      Histoire et Géographie
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setMatieres((prevMatieres) => [
                            ...prevMatieres,
                            e.target.value,
                          ]);
                        } else {
                          setMatieres((prevMatieres) =>
                            prevMatieres.filter(
                              (matiere) => matiere !== e.target.value
                            )
                          );
                        }
                      }}
                      value="Education civile"
                      id="flexCheckChecked"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      Education civile
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setMatieres((prevMatieres) => [
                            ...prevMatieres,
                            e.target.value,
                          ]);
                        } else {
                          setMatieres((prevMatieres) =>
                            prevMatieres.filter(
                              (matiere) => matiere !== e.target.value
                            )
                          );
                        }
                      }}
                      value="Sciences"
                      id="flexCheckChecked"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      Sciences
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleCloseClick}
                >
                  Fermer
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TeacherList;
