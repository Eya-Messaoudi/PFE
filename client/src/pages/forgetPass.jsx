import { useState } from "react";
import "./forgetPass.css";
import { useNavigate } from "react-router";
const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const API_BASE = "http://localhost:3002";
  const navigate = useNavigate();
  const sendCode = async () => {
    const response = await fetch(API_BASE + "/sendCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const json = await response.json();
    if (response.ok) {
      setSuccess(true);
      setError(null);
      navigate("/code");
    }
    if (!response.ok) {
      setError(json.error);
      setSuccess(false);
    }
  };
  return (
    <div className="container  d-flex flex-column min-vh-100 justify-content-center align-items-center ">
      <div className="form forgetPass  shadow-lg p-3  bg-body-tertiary rounded ">
        <div className="">
          <p>Entrer votre Email</p>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <label htmlFor="floatingInput">Email </label>
        </div>
        {error && (
          <div className="">
            <p className="text-danger my-3 text-center">{error}</p>
          </div>
        )}

        <div className="btn text-white" type="button" onClick={sendCode}>
          envoyer un code
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
