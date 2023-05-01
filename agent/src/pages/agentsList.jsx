import "./Style/list.css";
import profile from "./Style/agent.jpg";
import { useEffect, useState } from "react";
import { useAgentContext } from "../hooks/useAgentContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Agents = () => {
  const [error, setError] = useState(null);
  const [cin, setCin] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const { agents, dispatchA } = useAgentContext();
  const { user } = useAuthContext();

  const API_Base = "http://localhost:3002";
  useEffect(() => {
    const fetchAgents = async () => {
      const response = await fetch(API_Base + "/admin/agents", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatchA({ type: "SET_AGENT", payload: json });
      }
    };
    if (user) {
      fetchAgents();
    }
  }, [agents, user]);
  const createAgent = async (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    const response = await fetch(API_Base + "/admin/creatAgent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        cin: cin,
        nom: nom,
        prenom: prenom,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setCin("");
      setNom("");
      setPrenom("");
      setError(null);
      dispatchA({
        type: "CREATE_AGENT",
        payload: {
          cin: json.cin,
          nom: json.nom,
          prenom: json.prenom,
        },
      });
    }
  };

  const deleteAgent = async (id) => {
    if (!user) {
      return;
    }
    const response = await fetch(API_Base + "/admin/deleteAgent/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatchA({ type: "DELETE_AGENT", payload: json });
    }
  };
  const handleCloseClick = () => {
    setError(null);
    setCin("");
    setNom("");
    setPrenom("");
  };
  return (
    <div>
      <table className="table table-hover caption-top mt-5">
        <caption>Liste des Agents</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom et Prenom</th>
            <th colSpan="4" className="text-end">
              Handle
            </th>
          </tr>
        </thead>
        <tbody>
          {agents &&
            agents.map((agent) => (
              <tr key={agent._id}>
                <th scope="row">
                  <div className="circle-container">
                    <img src={profile} alt="" className="profile-image" />
                  </div>
                </th>
                <td colSpan="4">
                  <Link
                    to={`/profileEnseignant/${agent._id}`}
                    className="text-decoration-none text-secondary"
                  >
                    {agent.nom} {agent.prenom}
                  </Link>
                </td>
                <td className="text-end fs-5  ">
                  <ion-icon
                    name="trash-outline"
                    className=""
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  ></ion-icon>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            confirmation
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <p className="text-start">
                            est ce que vous êtes sûr ? vous voulez supprimer cet
                            personne{" "}
                          </p>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                          >
                            Non
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => deleteAgent(agent._id)}
                            data-bs-dismiss="modal"
                          >
                            Oui
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {error && (
        <div
          className="row  error alert alert-danger mt-2 mx-2 text-center "
          role="alert"
        >
          {error}
        </div>
      )}
      <div className=" text-end mt-4">
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
      </div>
      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                ajouter un Enseignant
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseClick}
              ></button>
            </div>
            <form onSubmit={createAgent}>
              <div className="modal-body">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="12345678"
                    onChange={(e) => setCin(e.target.value)}
                    value={cin}
                  />
                  <label htmlFor="floatingInput">cin</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Ali"
                    onChange={(e) => setNom(e.target.value)}
                    value={nom}
                  />
                  <label htmlFor="floatingInput">nom</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="ben foulen"
                    onChange={(e) => setPrenom(e.target.value)}
                    value={prenom}
                  />
                  <label htmlFor="floatingInput">prénom</label>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleCloseClick}
                >
                  Fermer
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Agents;
