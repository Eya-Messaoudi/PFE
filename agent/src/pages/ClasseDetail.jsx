import "./Style/ClasseDetail.css";
import parentt from "./Style/parents.jpg";
import teacheer from "./Style/teacher.jpg";
import { useEffect, useState } from "react";
import RemoveTeacher from "../components/removeTeacherModal";
import DeletionModel from "../components/deletionModal";
import CreatTeacherModel from "../components/creatTeacherModel";
import CreatParentModel from "../components/creatParentModel";
import { useClassesContext } from "../hooks/useClassesContext";
import { useParams } from "react-router-dom";
import { useTeacherContext } from "../hooks/useTeacherContext";
import RemoveParent from "../components/removeParentModel";
import AddTeacher from "../components/addTeacherModel";
import { Link } from "react-router-dom";
import AddParent from "../components/addParentModel";
import { useAuthContext } from "../hooks/useAuthContext";

const ClasseDetail = () => {
  const { id } = useParams();
  const { classes } = useClassesContext();
  const [classeDetails, setClasseDetails] = useState();
  const API_Base = "http://localhost:3002";
  const { teachers } = useTeacherContext();
  const [error, setError] = useState(null);
  const [errorP, setErrorP] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const getDetails = async () => {
      const response = await fetch(API_Base + "/admin/classe/" + id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      setClasseDetails(json);
    };
    if (user) {
      getDetails();
    }
  }, [id, classes, user]);

  return (
    <div className="container">
      {classeDetails ? (
        <div>
          <h1 className="text-center mt-3">{classeDetails.name}</h1>
          <div className="tabeles">
            <div className="row mt-3">
              <div className="col teachers rounded">
                <table className="table table-hover caption-top">
                  <caption>Liste des Enseignants</caption>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nom et Prenom</th>

                      <th colSpan="4" className="text-end">
                        Editer
                      </th>
                    </tr>
                  </thead>
                  {classeDetails.teachers.map((teacher) => (
                    <tbody key={teacher._id}>
                      <tr>
                        <th scope="row">
                          <div className="circle-container">
                            <img
                              src={teacheer}
                              alt=""
                              className="profile-image"
                            />
                          </div>
                        </th>
                        <td colSpan="4">
                          <Link
                            to={`/profileEnseignant/${teacher._id}`}
                            className="text-decoration-none text-secondary"
                          >
                            {teacher.nom} {teacher.prenom}
                          </Link>
                        </td>
                        <td className="text-end ">
                          <div className="fs-4" key={teacher._id}>
                            <ion-icon
                              name="remove-circle-outline"
                              data-bs-toggle="modal"
                              data-bs-target={`#removeModal${teacher._id}`}
                            ></ion-icon>
                            <RemoveTeacher
                              targetId={`removeModal${teacher._id}`}
                              idC={classeDetails._id}
                              idT={teacher._id}
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
                {error ? (
                  <div
                    className="alert alert-danger text-center alert-dismissible fade show"
                    role="alert"
                    onClick={() => {
                      setError(null);
                    }}
                  >
                    {error}
                  </div>
                ) : (
                  ""
                )}

                <div className="text-end mt-4">
                  <button
                    className="btn btn-primary mx-2 "
                    data-bs-toggle="modal"
                    data-bs-target="#addTeacher"
                    onClick={() => {
                      setError(null);
                    }}
                  >
                    Ajouter
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal1"
                    onClick={() => {
                      setError(null);
                    }}
                  >
                    Créer
                  </button>
                  <CreatTeacherModel
                    id={classeDetails._id}
                    targetId="exampleModal1"
                    onError={setError}
                  />
                  <AddTeacher
                    targetId="addTeacher"
                    idC={classeDetails._id}
                    onError={setError}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-3 bg bg-white rounded">
              <div className="col parents">
                <table className="table table-hover  caption-top ">
                  <caption>Liste des Parents</caption>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nom et Prenom</th>
                      <th scope="col" colSpan="4" className="text-end ">
                        Editer
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {classeDetails.parents.map((parent) => (
                      <tr key={parent._id}>
                        <th scope="row">
                          <div className="circle-container">
                            <img
                              src={parentt}
                              alt=""
                              className="profile-image"
                            />
                          </div>
                        </th>
                        <td colSpan="4">
                          <Link
                            to={`/profileParent/${parent._id}`}
                            className="text-decoration-none text-secondary"
                          >
                            {parent.nom} {parent.prenom}
                          </Link>
                        </td>
                        <td className="text-end ">
                          <div className="fs-4">
                            <ion-icon
                              name="remove-circle-outline"
                              data-bs-toggle="modal"
                              data-bs-target={`#removeModal${parent._id}`}
                            ></ion-icon>
                          </div>
                          <RemoveParent
                            targetId={`removeModal${parent._id}`}
                            idC={classeDetails._id}
                            idP={parent._id}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {errorP ? (
                  <div
                    className="alert alert-danger text-center alert-dismissible fade show"
                    role="alert"
                    onClick={() => {
                      setErrorP(null);
                    }}
                  >
                    {errorP}
                  </div>
                ) : (
                  ""
                )}
                <div className="text-end mt-4 ">
                  <button
                    type="button"
                    className="btn btn-primary mx-2"
                    data-bs-toggle="modal"
                    data-bs-target="#addParent"
                    onClick={() => {
                      setErrorP(null);
                    }}
                  >
                    Ajouter
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => {
                      setErrorP(null);
                    }}
                  >
                    Créer
                  </button>
                  <AddParent
                    targetId={"addParent"}
                    idC={classeDetails._id}
                    onError={setErrorP}
                  />
                  <CreatParentModel
                    id={classeDetails._id}
                    targetId={"exampleModal"}
                    onError={setErrorP}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="d-grid gap-2 col-6 mx-auto">
                <button
                  className="btn btn-danger"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal3"
                >
                  Supprimer cette classe{" "}
                  <span className="icon fs-4">
                    <ion-icon name="trash-outline"></ion-icon>
                  </span>
                </button>
                <DeletionModel
                  id={classeDetails._id}
                  targetId="exampleModal3"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>...loading</p>
      )}
    </div>
  );
};
export default ClasseDetail;
