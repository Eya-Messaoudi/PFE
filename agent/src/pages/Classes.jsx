import "./Style/Classes.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useClassesContext } from "../hooks/useClassesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Classes = () => {
  const [error, seterror] = useState(null);
  const [newClass, setnewClass] = useState("");
  const [dismissModal, setDismissModal] = useState(true);
  const { classes, dispatch } = useClassesContext();
  const API_Base = "http://localhost:3002";
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchClasses = async () => {
      const response = await fetch(API_Base + "/admin/classes", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CLASSES", payload: json });
      }
    };
    if (user) {
      fetchClasses();
    }
  }, [classes, dispatch, user]);

  const addClass = async () => {
    if (!user) {
      seterror("you must be logged in");
      return;
    }
    const response = await fetch(API_Base + "/admin/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        name: newClass,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      seterror(json.error);
      setDismissModal(false);
    }
    if (response.ok) {
      setnewClass("");
      seterror(null);
      console.log("new class added", json.name);
      dispatch({ type: "CREATE_CLASSES", payload: { name: json.name } });
      setnewClass("");
      setDismissModal(true);
    }
  };
  const handleCloseClick = () => {
    seterror(null);
    setnewClass("");
  };
  return (
    <div
      className="container classe mt-5 text-end 
    "
    >
      <button
        type="button"
        className="btn btn-primary mb-3 "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        +NOUVELLE CLASSE
      </button>
      <div
        className="modal fade "
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog   modal-dialog-centered ">
          <div className="modal-content bg-light">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                AJOUTER UNE CLASSE
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
                  id="floatingPassword"
                  placeholder="1ere annee"
                  onChange={(e) => setnewClass(e.target.value)}
                  value={newClass}
                />
                <label htmlFor="floatingPassword">nom</label>
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
                className="btn btn-primary"
                onClick={addClass}
                data-bs-dismiss={dismissModal ? "" : "modal"}
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container classes row p-3 g-3   text-white d-flex justify-content-center align-items-center">
        <div className="row">
          {classes &&
            classes.map((classe) => (
              <div
                className=" classe col-3 custom-col   m-3 mx-4 d-flex justify-content-center "
                key={classe._id}
              >
                <Link
                  to={`/details/${classe._id}`}
                  className="d-flex align-items-center justify-content-center h-100 w-100"
                >
                  {classe.name}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Classes;
