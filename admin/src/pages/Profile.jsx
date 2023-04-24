import { useEffect, useState } from "react";
import image from "./Style/teacher.jpg";
import { useTeacherContext } from "../hooks/useTeacherContext";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [teacherData, setTeacherData] = useState(null);
  const { teachers, dispatch } = useTeacherContext();
  const { id } = useParams();
  const API_Base = "http://localhost:3002";
  useEffect(() => {
    const getProfile = async () => {
      const response = await fetch(API_Base + "/admin/user/" + id);
      if (response.ok) {
        const json = await response.json();
        setTeacherData(json);
      }
    };
    getProfile();
  }, [id]);

  return (
    <div className="profile mt-5 shadow-lg p-3 mb-5 bg-body-tertiary rounded">
      {teacherData && (
        <div className="container">
          {" "}
          <div className="row my-4 mb-5 border border-primary-subtle">
            <div className="col-4">
              <div className="circle-container mt-1">
                <img src={image} alt="" className="profile-image" />
              </div>
            </div>

            <div className="col-8">
              <h3 className="display-5">
                {teacherData.lastName} {teacherData.firstName}
              </h3>
            </div>
          </div>
          <div className="info border border-primary-subtle">
            <div className="row p-2 ">
              <h4 className="display-6">Téléphone:</h4>
              <br /> <p className="text-secondary">21466694</p>
            </div>
            <div className="row p-2">
              <h4 className="display-6">Email:</h4>
              <br /> <p className="text-secondary">email.123@gmail.com</p>
            </div>
            <div className="row p-2">
              <h4 className="display-6">Enfants</h4>
              <br />
              {teacherData.matieres &&
                teacherData.matieres.map((matiere) => (
                  <p
                    className="text-secondary"
                    key={teacherData.matieres.indexOf(matiere)}
                  >
                    {matiere}
                  </p>
                ))}
            </div>
            <div className="row">
              <h4 className="display-6">Classes</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;
