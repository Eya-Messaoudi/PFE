import "./login.css";
import background from "../images/backgroundLogin.jpg";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
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
  const API_BASE = "http://localhost:3002";
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const response = await fetch(API_BASE + "/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cin: cin,
        nom: nom,
        prenom: prenom,
        tel: tel,
        email: email,
        password: password,
        confirmPass: confirmPass,
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

      if (json.role === "parent") {
        navigate("/AcceuilP");
      }
      if (json.role === "teacher") {
        navigate("/AcceuilE");
      }
    }
  };

  return (
    <div className="container loginContainer signup d-flex flex-column min-vh-100  justify-content-cente align-items-center">
      <img src={background} alt="" />
      <div
        className="card mb-3 mt-3 shadow-lg p-3 mb-5 bg-body-white rounded"
        width={"18rem"}
      >
        <div className="card-body">
          <h5 className="card-title">se connecter</h5>

          <form className=" " onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingCin"
                  placeholder="cin"
                  onChange={(e) => setCin(e.target.value)}
                  value={cin}
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
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <label htmlFor="floatingPassword">Mot de passe</label>

                <div className="form-check form-switch mt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    afficher mot de passe
                  </label>
                </div>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingConfirmPassword"
                  placeholder="Confirmer mot de passe"
                  onChange={(e) => setConfirmPass(e.target.value)}
                  value={confirmPass}
                />
                <label htmlFor="floatingConfirmPassword">
                  Confirmer mot de pass
                </label>
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

              <button className="btn " type="submit" disabled={isLoading}>
                connexion
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
