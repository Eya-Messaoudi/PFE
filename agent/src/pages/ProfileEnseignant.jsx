import { useEffect, useState } from "react";
import image from "./Style/teacher.jpg";
import { useTeacherContext } from "../hooks/useTeacherContext";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const ProfileEnseignant = () => {
  const [userData, setUserData] = useState(null);

  const [newCin, setNewCin] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { id } = useParams();
  const { user } = useAuthContext();
  const API_Base = "http://localhost:3002";

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
                          {userData.firstName} {userData.lastName}
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
                          value={`${userData.firstName} ${userData.lastName} `}
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
                        <h6 className="mb-0">Address</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="text"
                          className="form-control"
                          value={userData.address}
                          disabled
                        />
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
        </div>
      )}
    </div>
  );
};
export default ProfileEnseignant;
