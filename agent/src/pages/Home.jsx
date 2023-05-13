import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="container  fs-5 text-secondary shadow p-3 mb-5 bg-body-tertiary rounded mt-3">
      {/*
      <div className="classes row p-3 g-3 text-white d-flex justify-content-center align-items-center">
        <div className=" classe col custom-col   m-3 mx-4 d-flex justify-content-center text-center">
          Liste des classes
        </div>

        <div className=" classe col custom-col   m-3 mx-4 d-flex justify-content-center text-center">
          Liste des classes
        </div>

        <div className=" classe col custom-col   m-3 mx-4 d-flex justify-content-center text-center">
          Liste des classes
        </div>
  </div>*/}
      <div className="d-flex align-items-center justify-content-between">
        <p className="fw-semibold m-0">WELCOME!</p>
        <ion-icon name="notifications-outline"></ion-icon>
      </div>
    </div>
  );
};
export default Home;
