import { useClassesContext } from "../hooks/useClassesContext";
import { useState } from "react";

const CreatModel = ({ id, targetId }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [cin, setCin] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const { dispatch } = useClassesContext();
  const API_Base = "http://localhost:3002";

  const creatParent = async () => {
    try {
      const response = await fetch(API_Base + "/admin/newParent/" + id, {
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
        setError(json.error);
        setSuccess(false);
      } else {
        handleCloseClick();
        dispatch({
          type: "ADD_PARENT",
          payload: {
            cin: json.cin,
            firstName: json.firstName,
            lastName: json.lastName,
          },
        });
        setError(null);
        setSuccess(true);
      }
    } catch (error) {
      setError("Une erreur s'est produite.");
      setSuccess(false);
    }
  };

  const handleCloseClick = () => {
    setCin("");
    setNom("");
    setPrenom("");
    setError(null); // Reset error state
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
              Ajouter un parent
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
              type="button"
              className="btn btn-primary"
              data-bs-dismiss={success ? "modal" : ""}
              onClick={creatParent}
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatModel;
