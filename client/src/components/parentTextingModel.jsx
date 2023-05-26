import parentt from "../images/parents.jpg";
import teacher from "../images/teacher.jpg";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
const TextBox = ({ targetId, idT }) => {
  const { user } = useAuthContext();
  const [contenu, setContenu] = useState("");
  const [discussion, setDiscussion] = useState("");
  const [error, setError] = useState(null);
  const API_BASE = "http://localhost:3002/parent";
  useEffect(() => {
    const fetchDiscussion = async () => {
      const response = await fetch(API_BASE + "/discussion/" + idT, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setDiscussion(json.messages);
        setError(null);
      }
      if (!response.ok) {
        setError(json.error);
      }
    };
    if (user) {
      fetchDiscussion();
    }
  }, [discussion]);
  const sendMessage = async () => {
    const response = await fetch(API_BASE + "/sendMessage/" + idT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        contenu: contenu,
      }),
    });
    const json = await response.json();
    if (response.ok) {
      setContenu(" ");
      setError(null);
    }
    if (!response.ok) {
      setError(json.error);
    }
  };
  return (
    <div
      className="modal fade textBox"
      id={targetId}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollabl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Conversation
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body ">
            {discussion &&
              discussion.map((message, index) => (
                <div className="container" key={index}>
                  {!(message.sender === idT) && (
                    <div className="row g-0 text-white">
                      <div className="col-4">
                        <div className="circle-container me-3">
                          <img src={parentt} alt="" className="profile-image" />
                        </div>
                      </div>
                      <div className="col-8 text-start  ">
                        <p
                          className="p-3 bg bg-warning rounded"
                          style={{ display: "inline-block", width: "auto" }}
                        >
                          {message.contenu}
                        </p>
                      </div>
                    </div>
                  )}
                  {message.sender === idT && (
                    <div className="row g-1 mt-3 text-white">
                      <div className="col-8 text-end">
                        <p
                          className="p-3 bg bg-warning rounded"
                          style={{ display: "inline-block", width: "auto" }}
                        >
                          {message.contenu}
                        </p>
                      </div>
                      <div className="col-4 ">
                        <div className="circle-container ms-3">
                          <img src={teacher} alt="" className="profile-image" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
          <div className="modal-footer">
            <div className="row w-100">
              <div className="col-8">
                <div className="mb-2 ">
                  <textarea
                    className="form-control form-control-sm"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    onChange={(e) => {
                      setContenu(e.target.value);
                    }}
                    value={contenu}
                  ></textarea>
                </div>
              </div>
              <div className="col-4">
                <button className="btn bg bg-white">
                  <ion-icon name="send" onClick={sendMessage}></ion-icon>{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TextBox;
