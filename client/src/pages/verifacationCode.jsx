import { useState } from "react";
import "./forgetPass.css";
import { useNavigate } from "react-router";
const VerificationCode = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const verifyCode = async () => {
    const response = await fetch("http://localhost:3002/verifyCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
      }),
    });
    const data = await response.json(); // Parse the response body as JSON
    if (response.ok) {
      if (data.verified) {
        setCode("");
        navigate("/nouveau");
        setError(null);
      }
      if (!data.verified) {
        setError("code incorrect !");
      }
    }
  };
  return (
    <div className="container  d-flex flex-column min-vh-100 justify-content-center align-items-center ">
      <div className="form forgetPass  shadow-lg p-3  bg-body-tertiary rounded ">
        <div className="">
          <p className="text-primary">Code de verification </p>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="123456"
            value={code} // Add this line
            onChange={(e) => setCode(e.target.value)}
          />
          <label htmlFor="floatingInput">code </label>
        </div>
        {error && (
          <div className="">
            <p className="text-danger my-3 text-center">{error}</p>
          </div>
        )}
        <div className="btn text-white" type="button" onClick={verifyCode}>
          verifier
        </div>
      </div>
    </div>
  );
};
export default VerificationCode;
