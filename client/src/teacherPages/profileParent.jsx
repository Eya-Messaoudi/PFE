import { useEffect, useState } from "react";
import parentt from "../images/parents.jpg";
import "./Style.css";
import { useParams } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext";
import TextBox from "../components/textingModel";
const Profile = () => {
  const { id } = useParams();
  const [parent, setParent] = useState(null);
  const [error, setError] = useState(null);
  const API_BASE = "http://localhost:3002/teacher";
  const { user } = useAuthContext();
  useEffect(() => {
    const parentProfile = async () => {
      const response = await fetch(API_BASE + "/parentProfile/" + id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setParent(json);
      }
      if (!response.ok) {
        setError(json.error);
      }
    };
    parentProfile();
  });

  return (
    <div className=" body d-flex flex-column min-vh-100 ms-3">
      {parent && parent !== null ? (
        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src={parentt}
                    alt="Admin"
                    className="rounded-circle p-1 bg-primary"
                    width="110"
                  />
                  <h5 className="my-3">
                    {parent.nom} {parent.prenom}
                  </h5>
                  <p className="text-muted mb-1"></p>
                  <p className="text-muted mb-4"></p>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      type="button"
                      className="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#textBox"
                    >
                      Message
                    </button>
                    <TextBox targetId={"textBox"} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8 ">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {parent.nom}
                        {""} {parent.prenom}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Enfant(s)</p>
                    </div>
                    <div className="col-sm-9">
                      <div className="text-muted mb-0">
                        {parent.childs.map((child) => (
                          <p key={child._id}>
                            {child.name} {parent.prenom}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{parent.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{parent.tel}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        error && <p>{error}</p>
      )}
    </div>
  );
};
export default Profile;
