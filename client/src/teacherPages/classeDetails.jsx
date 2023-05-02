import { Link } from "react-router-dom";
import parentt from "../images/parents.jpg";
import HomeworkModal from "../components/creatHomeworkModal";
const Details = () => {
  return (
    <div className="body d-flex flex-column min-vh-100 ">
      <div className="container-fluid">
        <div className="row">
          <div className="sideBar col-auto col-md-2 min-vh-100 text-white shadow-lg p-3 mb-5 bg-body-tertiary rounded ms-1 mt-3">
            <div className="title fs-5 mt-3"></div>
            <div className="parentList mt-4 ">
              <div className="container oneParent mb-3">
                <div className="row g-0  ">
                  <div className="col-4">
                    <div className="circle-container">
                      <img src={parentt} className="profile-image" />
                    </div>
                  </div>
                  <div className="col-8">
                    <Link
                      className="text-decoration-none text-white"
                      to="/profile"
                    >
                      Parent Name
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col mt-5 ms-4">
            <div className="row creat-homework shadow-lg p-3 mb-5 bg-body-tertiary rounded me-3">
              <div className="card w-100 h-25 mb-3 ">
                <div
                  className="card-body d-flex justify-content-between"
                  data-bs-toggle="modal"
                  data-bs-target="#creatHomework"
                >
                  <p className="card-text  align-self-center">
                    Ajouter un devoir
                  </p>
                  <span className="fs-4 text-end align-self-start">
                    <ion-icon name="add-circle-outline"></ion-icon>
                  </span>
                  <HomeworkModal targetId={"creatHomework"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Details;
