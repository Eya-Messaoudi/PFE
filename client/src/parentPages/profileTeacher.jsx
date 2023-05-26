import teacherr from "../images/teacher.jpg";
import TextBox from "../components/parentTextingModel";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext";
const ProfileTeacher = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [error, setError] = useState(null);
  const API_BASE = "http://localhost:3002/parent";
  const { user } = useAuthContext();
  useEffect(() => {
    const teacherProfile = async () => {
      const response = await fetch(API_BASE + "/teacherProfile/" + id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setTeacher(json);
      }
      if (!response.ok) {
        setError(json.error);
      }
    };
    teacherProfile();
  });
  return (
    <div className=" body d-flex flex-column min-vh-100 ms-3">
      {teacher && teacher !== null ? (
        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src={teacherr}
                    alt="Admin"
                    className="rounded-circle p-1 bg-primary"
                    width="110"
                  />
                  <h5 className="my-3">
                    {" "}
                    {teacher.nom} {teacher.prenom}
                  </h5>
                  <p className="text-muted mb-1"></p>
                  <p className="text-muted mb-4"></p>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      type="button"
                      className="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#textBox2"
                    >
                      Message
                    </button>
                    <TextBox targetId={"textBox2"} idT={teacher._id} />
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
                      <p className="text-muted mb-0">
                        {teacher.nom} {teacher.prenom}
                      </p>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{teacher.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{teacher.tel}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};
export default ProfileTeacher;
