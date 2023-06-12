import parentt from "../images/parents.jpg";
import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
const MonProfile = () => {
  const [me, setMe] = useState(null);
  const [error, setError] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorTel, setErrorTel] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [newTel, setNewTel] = useState("");
  const [profileImg, setProfileImg] = useState({ myFile: "" });
  const API_BASE = "http://localhost:3002/parent";
  const { user } = useAuthContext();
  useEffect(() => {
    const myProfile = async () => {
      const response = await fetch(API_BASE + "/myProfile", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setMe(json.me);
      }
      if (!response.ok) {
        setError(json.error);
      }
    };
    myProfile();
  }, [user]);
  const changeEmail = async () => {
    const response = await fetch(API_BASE + "/changeEmail", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        newEmail: newEmail,
      }),
    });
    const json = await response.json();
    if (response.ok) {
      setMe(json.updatedMe);
      setNewEmail("");
      setErrorEmail(null);
    }
    if (!response.ok) {
      setErrorEmail(json.error);
    }
  };
  const changeTel = async () => {
    const response = await fetch(API_BASE + "/changeTel", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        newTel: newTel,
      }),
    });
    const json = await response.json();
    if (response.ok) {
      setNewTel(" ");
      setMe(json.updatedMe);
      setErrorTel(null);
    }
    if (!response.ok) {
      setErrorTel(json.error);
    }
  };

  return (
    <div className=" body d-flex flex-column min-vh-100 ms-3">
      {me && me !== null ? (
        <div className="container mt-5">
          <div className="row mt-5">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src={parentt}
                    alt="Admin"
                    className="rounded-circle p-1 bg-primary mb-3"
                    width="110"
                  />

                  <p className="text-muted mb-1">
                    {me && `${me.prenom} ${me.nom}`}{" "}
                  </p>
                  <p className="text-muted mb-4"></p>
                </div>
              </div>
            </div>

            <div className="col-lg-8 ">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Nom complet</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {me.prenom} {me.nom}
                      </p>
                    </div>
                  </div>

                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9 d-flex justify-content-between fs-6">
                      <p className="text-muted mb-0">{me.email}</p>
                      <input
                        type="text"
                        className="border border-secondary text-secondary rounded "
                        onChange={(e) => {
                          setNewEmail(e.target.value);
                        }}
                        value={newEmail}
                      />
                      <br />
                      <button
                        className="btn btn-sm text-white"
                        onClick={changeEmail}
                      >
                        changer
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Tel</p>
                    </div>
                    <div className="col-sm-9 d-flex justify-content-between fs-6">
                      <p className="text-muted mb-0">{me.tel}</p>
                      <input
                        type="text"
                        className="border border-secondary text-secondary rounded"
                        onChange={(e) => {
                          setNewTel(e.target.value);
                        }}
                        value={newTel}
                      />
                      <button
                        className="btn btn-sm text-white "
                        onClick={changeTel}
                      >
                        changer
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Enfant(s)</p>
                    </div>
                    <div className="col-sm-9">
                      <div className="text-muted mb-0">
                        {me.childs.map((child) => (
                          <p key={child._id}>
                            {child.name} {me.prenom}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {errorEmail && (
            <div className="alert alert-danger" role="alert">
              {errorEmail}
            </div>
          )}
          {errorTel && (
            <div className="alert alert-danger" role="alert">
              {errorTel}
            </div>
          )}
        </div>
      ) : (
        error && <p>{error}</p>
      )}
    </div>
  );
};
export default MonProfile;
