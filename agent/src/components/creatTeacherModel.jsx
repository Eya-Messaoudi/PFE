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
            <div className="form-floating mb-3">
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
            <p>{error}</p>
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
