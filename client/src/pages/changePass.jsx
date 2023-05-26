import { useState } from "react";
import "./forgetPass.css";
const ChangePass = () => {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const changePass = async () => {
    const response = await fetch("http://localhost:3002/changePassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newPass: newPass,
        confirmNewPass: confirmPass,
      }),
    });
    const json = await response.json();
    if (response.ok) {
      setSuccess(json.success);
      setError(null);
    }
    if (!response.ok) {
      setSuccess(false);
      setError(json.error);
    }
  };
  return (
    <div className="container  d-flex flex-column min-vh-100 justify-content-center align-items-center ">
      <div className="form changePass  shadow-lg p-3  bg-body-tertiary rounded ">
        <div className="">
          <p className="text-primary">Entrer le nouveau mot de passe </p>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingInput"
            placeholder="*****"
            onChange={(e) => {
              setNewPass(e.target.value);
            }}
            value={newPass}
          />
          <label htmlFor="floatingInput">Nouveau mot de passe </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingInput"
            placeholder="*****"
            onChange={(e) => {
              setConfirmPass(e.target.value);
            }}
            value={confirmPass}
          />
          <label htmlFor="floatingInput">confirmer mot de passe </label>
        </div>
        {error && (
          <div className="">
            <p className="text-danger my-3 text-center">{error}</p>
          </div>
        )}
        {success && (
          <div className="">
            <p className="text-success my-3 text-center">
              mot de passe a été modifié avec succé
            </p>
          </div>
        )}
        <div className="btn text-white" type="button" onClick={changePass}>
          Enregistrer
        </div>
      </div>
    </div>
  );
};
export default ChangePass;
