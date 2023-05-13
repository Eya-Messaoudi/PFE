import { useState } from "react";
import { useCoursContext } from "../hooks/useCoursContext";
import { useAuthContext } from "../hooks/useAuthContext";

const HomeworkModal = ({ targetId, onError, idC }) => {
  const [selectedFile, setSelectedFile] = useState("");
  const [date, setDate] = useState("");
  const [text, setText] = useState("");
  //const [error, setError] = useState(null);
  const { dispatchC } = useCoursContext();
  const { user } = useAuthContext();
  const API_BASE = "http://localhost:3002/teacher";
  const creatCours = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(API_BASE + "/creatCours/" + idC, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        content: {
          text: text,
        },
        toDoBefore: date,
      }),
    });
    const json = await response.json();
    if (response.ok) {
      onError(null);
      setDate("");
      setText("");
      dispatchC({
        type: "CREATE_COURS",
        payload: {
          content: json.content,
          toDoBefore: json.toDoBefore,
        },
      });
    }
    if (!response.ok) {
      onError(json.error);
    }
  };

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  return (
    <div
      className="modal fade"
      id={targetId}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel"></h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label mb-3"
              >
                Ajouter un devoir
              </label>
              <select
                className="form-select  mb-2"
                aria-label=".form-select-lg example"
              >
                <option defaultValue>Choisir une matiére</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <label htmlFor="date" className="form-label fs-6">
                A faire pour le :
              </label>
              <input
                type="date"
                className="form-control mbt-3 mb-3"
                id="date"
                aria-label="dateLimite"
                onChange={(e) => setDate(e.target.value)}
                value={date}
              ></input>{" "}
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={(e) => setText(e.target.value)}
                value={text}
              ></textarea>
            </div>

            {/* <div className="file-input">
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.rtf,.ppt,.pptx,.zip,.rar"
                onChange={handleFileSelect}
                hidden
              />
              <label htmlFor="file-upload" className="file-upload-label fs-6">
                <ion-icon name="cloud-upload-outline"></ion-icon> Importer un
                fichier
              </label>
              {selectedFile && (
                <div
                  className="alert alert-primary alert-dismissible fade show"
                  role="alert"
                >
                  {selectedFile.name}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() => {
                      setSelectedFile(null);
                    }}
                  ></button>
                </div>
              )}
            </div>*/}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn " data-bs-dismiss="modal">
              Annuler
            </button>
            <button
              type="button"
              className="btn "
              onClick={creatCours}
              data-bs-dismiss="modal"
            >
              Publier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeworkModal;
