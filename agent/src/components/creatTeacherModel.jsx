import { useClassesContext } from "../hooks/useClassesContext";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const CreatTeacherModel = ({ id, targetId, onError }) => {
  const [cin, setCin] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const { dispatch } = useClassesContext();
  const API_Base = "http://localhost:3002";
  const { user } = useAuthContext();
  const [matiéres, setMatieres] = useState([]);
  const [error, setError] = useState(null);
  const createTeacher = async () => {
    if (!user) {
      setError("you must be logged in");
      return;
    }
    const response = await fetch(API_Base + "/admin/newTeacher/" + id, {
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
      onError(json.error);
    } else if (response.ok) {
      setCin("");
      setNom("");
      setPrenom("");
      dispatch({
        type: "ADD_TEACHER",
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
    setCin("");
    setNom("");
    setPrenom("");
  };

  return (
    <div
      className="modal fade"
      id={targetId}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog  modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              créer un Enseignant
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleCloseClick}
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingCinT"
                placeholder="12345678"
                onChange={(e) => setCin(e.target.value)}
                value={cin}
              />
              <label htmlFor="floatingCinT">cin</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingNomT"
                placeholder="Ali"
                onChange={(e) => setNom(e.target.value)}
                value={nom}
              />
              <label htmlFor="floatingNomT">nom</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingPrenomT"
                placeholder="ben foulen"
                onChange={(e) => setPrenom(e.target.value)}
                value={prenom}
              />
              <label htmlFor="floatingPrenomT">prénom</label>
            </div>
            <p>{error}</p>
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

                <label className="form-check-label" htmlFor="flexCheckChecked">
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
                <label className="form-check-label" htmlFor="flexCheckChecked">
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
                <label className="form-check-label" htmlFor="flexCheckChecked">
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
                <label className="form-check-label" htmlFor="flexCheckChecked">
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
                <label className="form-check-label" htmlFor="flexCheckChecked">
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
                <label className="form-check-label" htmlFor="flexCheckChecked">
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
                <label className="form-check-label" htmlFor="flexCheckChecked">
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
                <label className="form-check-label" htmlFor="flexCheckChecked">
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
                <label className="form-check-label" htmlFor="flexCheckChecked">
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
                <label className="form-check-label" htmlFor="flexCheckChecked">
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
                <label className="form-check-label" htmlFor="flexCheckChecked">
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
              id="submitBtn"
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={createTeacher}
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatTeacherModel;
