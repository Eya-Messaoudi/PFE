import "./Style/list.css";
import { Link } from "react-router-dom";
import parentt from "./Style/parents.jpg";
import { useEffect, useState } from "react";
import { useParentContext } from "../hooks/useParentContext";

const ParentsList = () => {
  const { dispatch, parents } = useParentContext();
  const [dismissModal, setDismissModal] = useState(true);
  const API_Base = "http://localhost:3002";
  useEffect(() => {
    const fetchParents = async () => {
      const response = await fetch(API_Base + "/admin/parents");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PARENT", payload: json });
        setDismissModal(true);
      }
    };
    fetchParents();
  }, [parents]);
  const deleteParent = async (id) => {
    const response = await fetch(API_Base + "/admin/deleteP/" + id, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_PARENT", payload: json });
      setDismissModal(false);
    }
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
            parents.map((parent) => (
              <tr key={parent._id}>
                <th scope="row">
                  <div className="circle-container">
                    <img src={parentt} alt="" className="profile-image" />
                  </div>
                </th>
                <td colSpan="4">
                  <Link
                    to={`/profile/${parent._id}`}
                    className="text-decoration-none text-secondary"
                  >
                    {parent.lastName} {parent.firstName}
                  </Link>
                </td>
                <td className="text-end fs-5   ">
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
                            Message de confirmation
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <p className="text-start ">
                            est ce que vous êtes sûr ? vous voulez supprimer cet
                            personne
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
                            onClick={() => deleteParent(parent._id)}
                            data-bs-dismiss={dismissModal ? "modal" : ""}
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
    </div>
  );
};
export default ParentsList;
