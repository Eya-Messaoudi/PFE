import { useEffect, useState } from "react";
import { useTeacherContext } from "../hooks/useTeacherContext";
import { useClassesContext } from "../hooks/useClassesContext";
import profile from "../pages/Style/teacher.jpg";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const AddTeacher = ({ targetId, idC, onError }) => {
  const { teachers, dispatchT } = useTeacherContext();
  const { dispatch } = useClassesContext();
  const [error, setError] = useState(null);
  const API_Base = "http://localhost:3002";
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await fetch(API_Base + "/admin/teachers", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatchT({ type: "SET_TEACHER", payload: json });
      }
    };
    if (user) {
      fetchTeachers();
    }
  }, [teachers, user]);

  const addTeacher = async (idT) => {
    if (!user) {
      setError("you must be logged in");
      return;
    }
    const response = await fetch(
      API_Base + "/admin/addteacher/" + idC + "/" + idT,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      //setError(null);
      dispatch({
        type: "ADD_TEACHER",
        payload: {
          cin: json.cin,
          firstName: json.nom,
          lastName: json.prenom,
        },
      });
    } else if (!response.ok) {
      onError(json.error);
      console.log("error:", json.error);
    }
  };
  const handleCloseClick = () => {
    setSelectedTeacherId("");
  };
  return (
    <div className="">
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
              <h1 className="modal-title fs-5" id={targetId}>
                selectionnez un enseignant
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={handleCloseClick}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <table className="table table-hover  mt-5">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  {teachers &&
                    teachers.map((teacher) => (
                      <tr key={teacher._id}>
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
                          <Link
                            to={`/profile/${teacher._id}`}
                            className="text-decoration-none text-secondary"
                          >
                            {teacher.nom} {teacher.prenom}
                          </Link>
                        </td>
                        <td className="text-end fs-5  ">
                          <div>
                            <input
                              className="form-check-input"
                              type="radio"
                              name="radioNoLabel"
                              id="radioNoLabel1"
                              onChange={(e) =>
                                setSelectedTeacherId(e.target.value)
                              }
                              value={teacher._id}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <p>{error}</p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                data-bs-target="#exampleModalToggle2"
                data-bs-toggle="modal"
              >
                enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">
                confirmation
              </h1>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseClick}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Ajouter cet enseignant à la liste des enseignants de cette classe?
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                data-bs-target={`#${targetId}`}
                data-bs-toggle="modal"
              >
                Précédent
              </button>

              <button
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  addTeacher(selectedTeacherId);
                }}
              >
                confirmer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddTeacher;
