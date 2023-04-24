import "./Style/list.css";
import profile from "./Style/teacher.jpg";
import { useEffect, useState } from "react";
import { useTeacherContext } from "../hooks/useTeacherContext";
import { Link } from "react-router-dom";

const TeacherList = () => {
  const [error, seterror] = useState(null);
  const [cin, setCin] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const { teachers, dispatch } = useTeacherContext();
  const [created, setCreated] = useState("");
  const [teacherCreated, setTeacherCreated] = useState(false);
  const API_Base = "http://localhost:3002";
  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await fetch(API_Base + "/admin/teachers");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TEACHER", payload: json });
      }
    };
    fetchTeachers();
  }, [teachers]);
  const createTeacher = async (e) => {
    e.preventDefault();
    const response = await fetch(API_Base + "/admin/newTeacher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cin: cin,
        firstName: nom,
        lastName: prenom,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      seterror(json.error);
      setTeacherCreated(false);
      setCreated("");
    }
    if (response.ok) {
      setCin("");
      setNom("");
      setPrenom("");
      setCreated("enseignant crée avec succé!");
      seterror(null);
      console.log("new teacher added", json.firstName);
      dispatch({
        type: "CREATE_TEACHER",
        payload: {
          cin: json.cin,
          firstName: json.firstName,
          lastName: json.lastName,
        },
      });

      setTeacherCreated(true);
    }
  };

  const deleteTeacher = async (id) => {
    const response = await fetch(API_Base + "/admin/delete/" + id, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_TEACHER", payload: json });
    }
  };
  const handleCloseClick = () => {
    seterror(null);
    setCin("");
    setNom("");
    setPrenom("");
    setCreated("");
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
            teachers.map((teacher) => (
              <tr key={teacher._id}>
                <th scope="row">
                  <div className="circle-container">
                    <img src={profile} alt="" className="profile-image" />
                  </div>
                </th>
                <td colSpan="4">
                  <Link
                    to={`/profile/${teacher._id}`}
                    className="text-decoration-none text-secondary"
                  >
                    {teacher.lastName} {teacher.firstName}
                  </Link>
                </td>
                <td className="text-end fs-5  ">
                  <ion-icon
                    name="trash-outline"
                    className=""
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  ></ion-icon>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            confirmation
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <p className="text-start">
                            est ce que vous êtes sûr ? vous voulez supprimer cet
                            personne{" "}
                          </p>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                          >
                            Non
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => deleteTeacher(teacher._id)}
                            data-bs-dismiss="modal"
                          >
                            Oui
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="text-end mt-4">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal1"
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
        <div className="modal-dialog  modal-dialog-scrollable">
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
                {error && (
                  <div
                    className="error alert alert-danger mt-2 text-center"
                    role="alert"
                  >
                    {error}
                  </div>
                )}
                {created && (
                  <div
                    className="error alert alert-success mt-2 text-center"
                    role="alert"
                  >
                    {created}
                  </div>
                )}
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
                  data-bs-dismiss={error ? "" : teacherCreated ? "modal" : ""}
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
