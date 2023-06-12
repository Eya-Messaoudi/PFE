import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
const Home = () => {
  const { user } = useAuthContext();
  return (
    <div className="">
      <div className="container  fs-5 text-secondary shadow p-3 mb-5 bg-body-tertiary rounded mt-3">
        <div className="d-flex align-items-center justify-content-between">
          <p className="fw-semibold m-0">WELCOME!</p>
          <ion-icon name="notifications-outline"></ion-icon>
        </div>
      </div>
      {!user && (
        <div className="alert alert-info" role="alert">
          Votre session a été expirée ! veuillez se connecter
          <Link
            role="button"
            className="btn btn-outline-primary mt-3"
            to="/login"
          >
            se connecter
          </Link>
        </div>
      )}
    </div>
  );
};
export default Home;
