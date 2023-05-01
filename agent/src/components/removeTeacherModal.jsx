import { useClassesContext } from "../hooks/useClassesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

const RemoveTeacher = ({ targetId, idC, idT }) => {
  const { dispatch } = useClassesContext();
  const API_Base = "http://localhost:3002";
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const removeTeacher = async () => {
    if (!user) {
      setError("you must be logged in");
      return;
    }
    const response = await fetch(
      API_Base + "/admin/removeT/" + idC + "/" + idT,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (response.ok) {
      dispatch({
        type: "REMOVE_TEACHER",
        payload: { classId: idC, teacherId: idT },
      });
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
            <p className="fs-4 text-start">
              est ce que vous êtes sûr ,vous voulez retirer cet enseignant
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
              onClick={removeTeacher}
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
export default RemoveTeacher;
