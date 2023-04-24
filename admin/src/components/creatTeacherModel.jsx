import { useClassesContext } from "../hooks/useClassesContext";
import { useState } from "react";
const CreatModel = ({ id, targetId }) => {
  const [childs, setChilds] = useState([{ enfant: "" }]);
  const [error, seterror] = useState();
  const [cin, setCin] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const { dispatch } = useClassesContext();
  const API_Base = "http://localhost:3002";
  const createTeacher = async () => {
    const response = await fetch(API_Base + "/admin/newTeacher/" + id, {
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
    let result;
    const json = await response.json();
    if (!response.ok) {
      seterror(json.error);
      result = "";
      return result;
    } else if (response.ok) {
      setCin("");
      setNom("");
      setPrenom("");
      seterror(null);
      console.log("new teacher added", json.firstName);
      dispatch({
        type: "ADD_TEACHER",
        payload: {
          cin: json.cin,
          firstName: json.firstName,
          lastName: json.lastName,
        },
      });
      result = "modal";
    } else {
      result = "";
    }
    if (result === "modal") {
      document
        .getElementById("submitBtn")
        .setAttribute("data-bs-dismiss", "modal");
    } else {
      document.getElementById("submitBtn").removeAttribute("data-bs-dismiss");
    }
  };

  const handleCloseClick = () => {
    seterror();
    setCin("");
    setNom("");
    setPrenom("");
    setChilds([{ enfant: "" }]);
  };
  const addChild = () => {
    setChilds([...childs, { enfant: "" }]);
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
            {childs.map((child, index) => (
              <div className="d-flex align-items-center" key={index}>
                <div className="form-floating flex-grow-1 me-2 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id={`enfant-${index}`}
                    placeholder="Enfant"
                    value={child.enfant}
                    onChange={(e) => {
                      const updatedChilds = [...childs];
                      updatedChilds[index].enfant = e.target.value;
                      setChilds(updatedChilds);
                    }}
                    style={{ width: "98%" }}
                  />
                  <label htmlFor={`enfant-${index}`}>Enfant</label>
                </div>
                {childs.length - 1 === index && childs.length < 3 && (
                  <span className="text-end fs-3">
                    <ion-icon
                      name="add-circle-outline"
                      onClick={addChild}
                    ></ion-icon>
                  </span>
                )}
              </div>
            ))}

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
              id="submitBtn"
              type="button"
              className="btn btn-primary"
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
export default CreatModel;
