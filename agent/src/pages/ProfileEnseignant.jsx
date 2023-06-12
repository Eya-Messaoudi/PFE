import { useEffect, useState } from "react";
import image from "./Style/teacher.jpg";
import { useTeacherContext } from "../hooks/useTeacherContext";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
const ProfileEnseignant = () => {
  const [userData, setUserData] = useState(null);
  const { teachers, dispatchT } = useTeacherContext();
  const [newCin, setNewCin] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { id } = useParams();
  const { user } = useAuthContext();
  const API_Base = "http://localhost:3002";
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      const response = await fetch(API_Base + "/admin/user/" + id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        const json = await response.json();
        setUserData(json);
      }
    };
    if (user) {
      getProfile();
    }
  }, [id, user]);
  const modifyCin = async (userData) => {
    try {
      const response = await fetch(
        `${API_Base}/admin/modifierT/${userData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ cin: newCin }),
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }
      setUserData({
        ...userData,
        cin: newCin,
      });
      setNewCin("");
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };
  const deleteTeacher = async (id) => {
    if (!user) {
      return;
    }

    const response = await fetch(API_Base + "/admin/deleteTeacher/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatchT({ type: "DELETE_TEACHER", payload: json });
      navigate(-1);
    }
  };
  return (
    <div className="profile mt-5  p-3 mb-5 bg-body-tertiary rounded">
      {userData && (
        <div className="container">
          <div className="main-body">
            <div className="row">
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img
                        src={image}
                        alt="Admin"
                        className="rounded-circle p-1 bg-primary"
                        width="110"
                      />
                      <div className="mt-3">
                        <h4>
                          {userData.nom} {userData.prenom}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="card">
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Cin</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="text"
                          className="form-control"
                          value={userData.cin}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">modifier Cin</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="text"
                          className="form-control"
                          value={newCin}
                          onChange={(e) => setNewCin(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Nom et prénom</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="text"
                          className="form-control"
                          value={`${userData.nom} ${userData.prenom} `}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="text"
                          className="form-control"
                          value={userData.Email}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Phone</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="text"
                          className="form-control"
                          value={userData.tel}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Matiére(s)</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {userData.matiéres.join(", ")}
                      </div>
                    </div>
                    {error && (
                      <div
                        className="alert alert-danger alert-dismissible fade show text-center"
                        role="alert"
                      >
                        {error}
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="alert"
                          aria-label="Close"
                        ></button>
                      </div>
                    )}
                    {success && (
                      <div
                        className="alert alert-success alert-dismissible fade show text-center"
                        role="alert"
                      >
                        cin modifié avec succée
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="alert"
                          aria-label="Close"
                        ></button>
                      </div>
                    )}

                    <div className="row">
                      <div className="col-sm-3"></div>
                      <div className="col-sm-9 text-secondary">
                        <button
                          type="button"
                          className="btn btn-primary px-4"
                          onClick={() => {
                            modifyCin(userData);
                          }}
                        >
                          Enregistrer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="d-grid gap-2 col-6 mx-auto">
              <button
                className="btn btn-danger"
                type="button"
                data-bs-toggle="modal"
                data-bs-target={`#exampleModal${userData._id}`}
              >
                Supprimer cet Enseignant{" "}
                <span className="icon fs-4">
                  <ion-icon name="trash-outline"></ion-icon>
                </span>
              </button>
            </div>
            <div
              className="modal fade"
              id={`exampleModal${userData._id}`}
              tabIndex="-1"
              aria-labelledby={`exampleModalLabel${userData._id}`}
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
                    <p className="text-start">
                      est ce que vous êtes sûr ? vous voulez supprimer cet
                      personne{" "}
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
                      onClick={() => deleteTeacher(userData._id)}
                      data-bs-dismiss="modal"
                    >
                      Oui
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfileEnseignant;
