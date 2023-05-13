import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import background from "../images/background.jpg";
import "./Style.css";
import { useAuthContext } from "../hooks/useAuthContext";

const AcceuilP = () => {
  const [classes, setClasses] = useState([]);
  const API_BASE = "http://localhost:3002/parent";
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchClasses = async () => {
      const response = await fetch(API_BASE + "/classes", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setClasses(json);
        setError(null);
      }
      if (!response.ok) {
        setError(json.error);
      }
    };
    if (user) {
      fetchClasses();
    }
  });

  return (
    <div className="AcceuilP">
      <div className="body d-flex flex-column min-vh-100 ">
        {" "}
        <img src={background} />
        <div className="childsList container mt-5">
          <div className="row ms-5 mb-3 g-5 me-5 mt-5">
            {classes && classes.length ? (
              classes.map((classe, index) => (
                <div className="col" key={index}>
                  <Link
                    to={`/coursChild/${classe._id}`}
                    className="card text-center mb-3 text-decoration-none text-white  d-flex align-items-center justify-content-center border border-none"
                  >
                    <div className="card-body -flex align-items-center justify-content-center">
                      <h5 className="card-title">{classe.name}</h5>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="alert alert-warning" role="alert">
                vous n'êtes affecté à aucune classe. Contactez l'administrateur
                pour plus d'informations.
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AcceuilP;
