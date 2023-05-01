import { useEffect, useState } from "react";
import { useParentContext } from "../hooks/useParentContext";
import { useClassesContext } from "../hooks/useClassesContext";
import profile from "../pages/Style/parents.jpg";

import { useAuthContext } from "../hooks/useAuthContext";

const AddParent = ({ targetId, idC }) => {
  const { parents, dispatchP } = useParentContext();
  const { dispatch } = useClassesContext();
  const API_Base = "http://localhost:3002";
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [error, setError] = useState(null);
  const [selectedParent, setSelectedParent] = useState(null);
  const [childs, setChilds] = useState([{ enfant: "", classe: idC }]);
  const childData = childs.map((child) => ({
    name: child.enfant,
    classe: child.classe,
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
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
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
      // onError(json.error);
      console.log("error:", json.error);
    }
  };
  const handleParentSelection = () => {
    const parent = parents.find((p) => p._id === selectedParentId);
    setSelectedParent(parent);
    console.log(selectedParent);
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
                          <p
                            className="text-info fs-6"
                            data-bs-target="#profile"
                            data-bs-toggle="modal"
                          >
                            {parent.lastName} {parent.firstName}
                          </p>
                        </td>
                        <td className="text-end fs-5  ">
                          <div>
                            <input
                              className="form-check-input"
                              type="radio"
                              name="radioNoLabel"
                              id={`radioNoLabel-${parent._id}`}
                              onChange={() => setSelectedParent(parent)}
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
                onClick={handleParentSelection}
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
              {selectedParent && (
                <div className="text-danger">
                  {selectedParent.childs.length > 0 ? (
                    selectedParent.childs.map((child) => {
                      console.log(child.enfant); // add this line to check if child information is properly displayed
                      return (
                        <div className="" key={child}>
                          {child.enfant}
                        </div>
                      );
                    })
                  ) : (
                    <p>No child elements found.</p>
                  )}
                </div>
              )}
              yohoo!
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                data-bs-target={`#${targetId}`}
                data-bs-toggle="modal"
              >
                précédent
              </button>
              <button className="btn btn-primary" data-bs-toggle="modal">
                enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="profile"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">
                Profile
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body"></div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target={`#${targetId}`}
              >
                Back to first
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddParent;
