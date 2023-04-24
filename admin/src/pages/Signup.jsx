import "./Style/Login.css";
import { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password);
  };
  return (
    <div className="container">
      <form
        className="signup shadow-lg p-3 mb-5 bg-body-tertiary rounded m-5 "
        onSubmit={handleSubmit}
      >
        <h3>Sign Up</h3>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingName"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <label htmlFor="floatingName">Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => setName(e.target.value)}
            value={email}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => setName(e.target.value)}
            value={password}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button className="btn ">Log In</button>
      </form>
    </div>
  );
};
export default Signup;
