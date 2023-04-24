import { useClassesContext } from "../hooks/useClassesContext";
import { useNavigate } from "react-router-dom";

const DeletionModel = ({ id, targetId }) => {
  const navigate = useNavigate();
  const { dispatch } = useClassesContext();
  const API_Base = "http://localhost:3002";
  const deleteClasse = async () => {
    const response = await fetch(API_Base + "/admin/deleteC/" + id, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_CLASSE", payload: json });
      navigate(-1);
    }
  };
  return (
    <div
      className="modal fade"
      id={targetId}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
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
            <p className="fs-4">
              est ce que vous êtes sûr ,vous voulez supprimer cette classe
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
              onClick={deleteClasse}
              data-bs-dismiss="modal"
            >
              Oui
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeletionModel;
