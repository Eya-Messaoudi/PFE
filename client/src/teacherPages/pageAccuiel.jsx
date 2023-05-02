import { Link } from "react-router-dom";
import "./Style.css";
import tableau from "../images/tableau.jpg";

const Acceuil = () => {
  return (
    <div className="AcceuilE">
      <div className="body d-flex flex-column min-vh-100 ">
        {" "}
        <img src={tableau} />
        <div className="classList container mt-5">
          <div className="row ms-5 mb-3 g-5 me-5 mt-5">
            <div className="col ">
              <Link
                to="/cours"
                className="card text-center mb-3 text-decoration-none text-black w-100 d-flex align-items-center justify-content-center"
              >
                <div className="card-body -flex align-items-center justify-content-center">
                  <h5 className="card-title">1ére année</h5>
                </div>
              </Link>
            </div>
            <div className="col ">
              <Link
                to="/cours"
                className="card text-center mb-3 text-decoration-none text-black w-100"
              >
                <div className="card-body">
                  <h5 className="card-title">2éme année</h5>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Acceuil;
