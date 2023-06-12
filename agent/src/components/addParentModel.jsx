import { useEffect, useState } from "react";
import { useParentContext } from "../hooks/useParentContext";
import { useClassesContext } from "../hooks/useClassesContext";
import profile from "../pages/Style/parents.jpg";
import childss from "../pages/Style/childs.jpg";

import { useAuthContext } from "../hooks/useAuthContext";

const AddParent = ({ targetId, idC, onError }) => {
  const { parents, dispatchP } = useParentContext();
  const { dispatch } = useClassesContext();
  const API_Base = "http://localhost:3002";
  const [selectedParent, setSelectedParent] = useState("");
  const [error, setError] = useState(null);

  const [childs, setChilds] = useState([{ name: "" }]);
  const childData = childs.map((child) => ({
    name: child.name,
  }));
  const { user } = useAuthContext();
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
  }, [user]);

  const addParent = async (idP) => {
    if (!user) {
      setError("you must be logged in");
      return;
    }
    const response = await fetch(
      API_Base + "/admin/addParent/" + idC + "/" + idP,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          childs: childData,
        }),
      }
    );
    const json = await response.json();
    if (response.ok) {
      //setError(null);
      dispatch({
        type: "ADD_PARENT",
        payload: {
          cin: json.cin,
          firstName: json.firstName,
          lastName: json.lastName,
          childs: json.childs,
        },
      });
    } else if (!response.ok) {
      onError(json.error);
      console.log("error:", json.error);
    }
  };

  const addChild = () => {
    setChilds([...childs, { name: "" }]);
  };
  const removeChild = (index) => {
    const list = [...childs];
    list.splice(index, 1);
    setChilds(list);
  };
  const handleChildChange = (index, e) => {
    const newChildren = [...childs];
    newChildren[index] = { name: e.target.value };
    setChilds(newChildren);
  };

  return (
    <div className="container">
      <div
        className="modal fade"
        id={targetId}
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
                selectionnez un parent
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <table className="table table-hover  mt-5">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  {parents &&
                    parents.map((parent) => (
                      <tr key={parent._id}>
                        <th scope="row">
                          <div className="circle-container">
                            <img
                              src={profile}
                              alt=""
                              className="profile-image"
                            />
                          </div>
                        </th>
                        <td className="text-start">
                          <p>
                            {parent.nom} {parent.prenom}
                          </p>
                        </td>
                        <td className="text-end fs-5  ">
                          <div>
                            <input
                              className="form-check-input"
                              type="radio"
                              name="radioNoLabel"
                              id={`radioNoLabel-${parent._id}`}
                              onChange={(e) => {
                                setSelectedParent(parent);
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                data-bs-target="#childs"
                data-bs-toggle="modal"
              >
                suivant
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="childs"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">
                enfant(s)
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedParent.childs &&
                selectedParent.childs.map((child) => (
                  <div
                    className="d-flex justify-content-between bg bg-light hover rounded p-3 mb-3"
                    key={child._id}
                  >
                    <div className="d-flex align-items-center">
                      <div className="circle-container me-3">
                        <img src={childss} alt="" className="profile-image" />
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <p className="text-decoration-none text-dark">
                          {child.name} {selectedParent.prenom}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              <div className="alert alert-warning text-start" role="alert">
                Merci d'entrer seulement les enfants enrollés dans cette classe
                !
              </div>
              {childs.map((child, index) => (
                <div className="d-flex align-items-center" key={index}>
                  <div className="form-floating flex-grow-1 me-2 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id={`enfant-${index}`}
                      placeholder="Enfant"
                      value={child.name}
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
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                data-bs-target={`#${targetId}`}
                data-bs-toggle="modal"
              >
                Précédent
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  addParent(selectedParent._id);
                }}
                data-bs-dismiss="modal"
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
export default AddParent;
