import "./Style/Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const API_BASE = "http://localhost:3002/admin";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(API_BASE + "/logIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setEmail("");
      setPassword("");
      setError(null);
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
    }
  };
  return (
    <div className="container">
      <form
        className="login shadow-lg p-3 mb-5 bg-body-tertiary rounded m-5 "
        onSubmit={handleSubmit}
      >
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingEmail"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label htmlFor="floatingEmail">Email</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <label htmlFor="floatingPassword">Mot de passe</label>
        </div>
        {error ? (
          <div
            className="alert alert-danger text-center alert-dismissible fade show"
            role="alert"
            onClick={() => {
              setError(null);
            }}
          >
            {error}
          </div>
        ) : (
          ""
        )}

        <button className="btn btn-primary ">se connecter</button>
        <Link to="/signup" className="ms-3">
          se connecter pour la premiére fois
        </Link>
      </form>
    </div>
  );
};
export default Login;
