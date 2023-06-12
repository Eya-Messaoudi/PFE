import "./Style/list.css";
import { Link } from "react-router-dom";
import parentt from "./Style/parents.jpg";
import { useEffect, useState } from "react";
import { useParentContext } from "../hooks/useParentContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ParentsList = () => {
  const [childs, setChilds] = useState([{ enfant: "" }]);
  const [cin, setCin] = useState("");
  const [nom, setNom] = useState("");
  const [error, setError] = useState(null);
  const [prenom, setPrenom] = useState("");
  const childData = childs.map((child) => ({
    name: child.enfant,
    classe: child.classe,
  }));
  const { dispatchP, parents } = useParentContext();
  const { user } = useAuthContext();
  const API_Base = "http://localhost:3002";
  useEffect(() => {
    const fetchParents = async () => {
      const response = await fetch(API_Base + "/admin/parents", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatchP({ type: "SET_PARENT", payload: json });
      }
    };
    if (user) {
      fetchParents();
    }
  }, [parents, user]);

  const creatParent = async () => {
    if (!user) {
      setError("you must be logged in");
      return;
    }
    const response = await fetch(API_Base + "/admin/newParent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        cin: cin,
        nom: nom,
        prenom: prenom,
        childs: childData,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    } else {
      handleCloseClick();
      dispatchP({
        type: "CREATE_PARENT",
        payload: {
          cin: json.cin,
          nom: json.nom,
          prenom: json.prenom,
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
  const handleChildChange = (index, e) => {
    const newChildren = [...childs];
    newChildren[index] = { enfant: e.target.value };
    setChilds(newChildren);
  };

  return (
    <div>
      <table className="table table-hover caption-top mt-5">
        <caption>Liste des Parents</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom et Prenom</th>
            <th colSpan="4" className="text-end">
              Editer
            </th>
          </tr>
        </thead>
        <tbody>
          {parents &&
            parents.map((parent, index) => (
              <tr key={index}>
                <th scope="row">
                  <div className="circle-container">
                    <img src={parentt} alt="" className="profile-image" />
                  </div>
                </th>
                <td colSpan="4">
                  <Link
                    to={`/profileParent/${parent._id}`}
                    className="text-decoration-none text-secondary"
                  >
                    {parent.nom} {parent.prenom}
                  </Link>
                </td>
                <td className="text-end fs-5  ">
                  <ion-icon name="eye-outline"></ion-icon>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className=" text-end mt-4">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#creatParent"
        >
          Créer
        </button>
      </div>
      <div
        className="modal fade"
        id="creatParent"
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

              {childs.map((child, index) => (
                <div className="d-flex align-items-center" key={index}>
                  <div className="form-floating flex-grow-1 me-2 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id={`enfant-${index}`}
                      placeholder="Enfant"
                      value={child.enfant}
                      onChange={(e) => handleChildChange(index, e)}
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
    </div>
  );
};
export default ParentsList;
