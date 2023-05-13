import teacher from "../images/teacher.jpg";

const ProfileTeacher = () => {
  return (
    <div className=" body d-flex flex-column min-vh-100 ms-3">
      <div className="container">
        <div className="row mt-5">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src={teacher}
                  alt="Admin"
                  className="rounded-circle p-1 bg-primary"
                  width="110"
                />
                <h5 className="my-3"></h5>
                <p className="text-muted mb-1"></p>
                <p className="text-muted mb-4"></p>
                <div className="d-flex justify-content-center mb-2">
                  <button
                    type="button"
                    className="btn"
                    data-bs-toggle="modal"
                    data-bs-target="#textBox"
                  >
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8 ">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0"></p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Enfant(s)</p>
                  </div>
                  <div className="col-sm-9">
                    <div className="text-muted mb-0">
                      <p></p>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0"></p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileTeacher;
