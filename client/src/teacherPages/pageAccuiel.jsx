import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Style.css";
import tableau from "../images/backgroundT.jpg";
import { useAuthContext } from "../hooks/useAuthContext";

const Acceuil = () => {
  const API_BASE = "http://localhost:3002/teacher";
  const [classes, setClasses] = useState([]);
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
      }
    };
    if (user) {
      fetchClasses(classes);
    }
  }, [classes, user]);

  return (
    <div className="AcceuilE">
      <div className="body d-flex flex-column min-vh-100 ">
        {" "}
        <img src={tableau} alt=" " />
        <div className="classList container mt-5">
          <div className="row ms-5 mb-3 g-5 me-5 mt-5">
            {classes && classes.length ? (
              classes.map((classe) => (
                <div className="col " key={classe._id}>
                  <Link
                    to={`/cours/${classe._id}`}
                    className="card text-center mb-3 text-decoration-none text-black w-100 d-flex align-items-center justify-content-center"
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
              </div>
            )}

            {/* <div className="col ">
              <Link
                to="/cours"
                className="card text-center mb-3 text-decoration-none text-black w-100"
              >
                <div className="card-body">
                  <h5 className="card-title">2éme année</h5>
                </div>
              </Link>
  </div>*/}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Acceuil;
