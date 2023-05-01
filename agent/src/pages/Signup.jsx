import "./Style/Login.css";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Signup = () => {
  const [cin, setCin] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const API_BASE = "http://localhost:3002/admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const response = await fetch(API_BASE + "/signUpAgent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cin: cin,
        nom: nom,
        prenom: prenom,
        tel: tel,
        email: email,
        password: password,
        confirmPassword: confirmPass,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setCin("");
      setNom("");
      setPrenom("");
      setTel("");
      setEmail("");
      setPassword("");
      setConfirmPass("");
      setError(null);
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <form
        className="signup shadow-lg p-3 mb-5 bg-body-tertiary rounded m-5 "
        onSubmit={handleSubmit}
      >
        <h3>Sign up</h3>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingCin"
            placeholder="cin"
            onChange={(e) => setCin(e.target.value)}
            value={cin}
            required
          />
          <label htmlFor="floatingCin">Cin</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingName"
            placeholder="nom"
            onChange={(e) => setNom(e.target.value)}
            value={nom}
            required
          />
          <label htmlFor="floatingName">nom</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingPrenom"
            placeholder="prenom"
            onChange={(e) => setPrenom(e.target.value)}
            value={prenom}
            required
          />
          <label htmlFor="floatingPrenom">prenom</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingTel"
            placeholder="Telephone"
            onChange={(e) => setTel(e.target.value)}
            value={tel}
            required
          />
          <label htmlFor="floatingPassword">Tel</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingEmail"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <label htmlFor="floatingEmail">email</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <label htmlFor="floatingPassword">mot de passe</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingConfirmPassword"
            placeholder="Confirmer mot de passe"
            onChange={(e) => setConfirmPass(e.target.value)}
            value={confirmPass}
            required
          />
          <label htmlFor="floatingConfirmPassword">Confirmer mot de pass</label>
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

        <button className="btn btn-primary" type="submit" disabled={isLoading}>
          Sign up
        </button>
      </form>
    </div>
  );
};
export default Signup;
