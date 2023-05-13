import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import background from "../images/backgroundLogin.jpg";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

const Login = () => {
  const { user, dispatch } = useAuthContext();
  const [cin, setCin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const API_BASE = "http://localhost:3002";
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(API_BASE + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cin: cin,
        password: password,
      }),
    });
    const json = await response.json();
    if (response.ok) {
      setCin("");
      setPassword("");
      setError(null);
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      if (json.role === "parent") {
        navigate("/AcceuilP");
      }
      if (json.role === "teacher") {
        navigate("/AcceuilE");
      }
    }
    if (!response.ok) {
      setError(json.error);
    }
  };

  return (
    <div className="container loginContainer d-flex flex-column min-vh-100  justify-content-cente align-items-center">
      <img src={background} alt="" />
      <div className="connexion-type row mt-4 form">
        <Link to="/signup" className="btn text-white">
          se connecter pour la premiére fois
        </Link>
      </div>
      <div className="login row m-4 form">
        <div className="card mb-3" width={"18rem"}>
          <div className="card-body">
            <h5 className="card-title">se connecter</h5>
            <form onSubmit={handleSubmit}>
              <div className="card-body mt-5">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="********"
                    onChange={(e) => setCin(e.target.value)}
                    value={cin}
                  />
                  <label htmlFor="floatingInput">cin</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <label htmlFor="floatingPassword">Mot de passe</label>
                </div>
                {error && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {error}
                  </div>
                )}
                <button className="btn mt-3 ms-2">connexion</button>
              </div>{" "}
            </form>
          </div>

          <div className="card-footer bg bg-white container">
            <div className="row mt-3 mb-3 mx-4">
              <Link>Mot de passe oublié</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
