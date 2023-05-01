import { useClassesContext } from "../hooks/useClassesContext";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const CreatParentModel = ({ id, targetId, onError }) => {
  const [childs, setChilds] = useState([{ enfant: "", classe: id }]);
  const [cin, setCin] = useState("");
  const [nom, setNom] = useState("");
  const [error, setError] = useState(null);
  const [prenom, setPrenom] = useState("");
  const { dispatch } = useClassesContext();
  const API_Base = "http://localhost:3002";
  const childData = childs.map((child) => ({
    name: child.enfant,
    classe: child.classe,
  }));
  const { user } = useAuthContext();
  const creatParent = async () => {
    if (!user) {
      setError("you must be logged in");
      return;
    }
    const response = await fetch(API_Base + "/admin/newParent/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        cin: cin,
        firstName: nom,
        lastName: prenom,
        childs: childData,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      onError(json.error);
    } else {
      handleCloseClick();
      dispatch({
        type: "ADD_PARENT",
        payload: {
          cin: json.cin,
          firstName: json.firstName,
          lastName: json.lastName,
          childs: json.childs,
        },
      });
    }
  };

  const handleCloseClick = () => {
    setCin("");
    setNom("");
    setPrenom("");
    setChilds([{ enfant: "" }]);
  };
  const addChild = () => {
    setChilds([...childs, { enfant: "" }]);
  };
  const removeChild = (index) => {
    const list = [...childs];
    list.splice(index, 1);
    setChilds(list);
  };
  const handleChildChange = (index, classe, e) => {
    const newChildren = [...childs];
    newChildren[index] = { enfant: e.target.value, classe };
    setChilds(newChildren);
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
            <div className="alert alert-warning text-start" role="alert">
              Merci d'entrer seulement les enfants enrollés dans cette classe !
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
                    onChange={(e) => handleChildChange(index, id, e)}
                    style={{ width: "98%" }}
                  />
                  <label htmlFor={`enfant-${index}`}>Enfant(s)</label>
                </div>
                {childs.length - 1 === index && childs.length < 3 && (
                  <span className="text-end fs-3 text-success">
                    <ion-icon
                      name="add-circle-outline"
                      onClick={addChild}
                    ></ion-icon>
                  </span>
                )}
                {childs.length > 1 && (
                  <span className="text-end fs-3 text-danger">
                    <ion-icon
                      name="close-circle-outline"
                      onClick={() => {
                        removeChild(index);
                      }}
                    ></ion-icon>
                  </span>
                )}
              </div>
            ))}
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
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
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
export default CreatParentModel;
