import parentt from "../images/parents.jpg";
import teacher from "../images/teacher.jpg";
const TextBox = ({ targetId }) => {
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
            <div className="container">
              <div className="row g-0">
                <div className="col-4">
                  <div className="circle-container me-3">
                    <img src={parentt} alt="" className="profile-image" />
                  </div>
                </div>
                <div className="col-8 rounded bg bg-warning text-white ">
                  <p className="p-3">hjjjjjjjjjjjjjjjjjjjjjj</p>
                </div>
              </div>
              <div className="row g-1 mt-4">
                <div className="col-8 rounded bg bg-warning text-white">
                  <p className="p-3">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>
                <div className="col-4 ">
                  <div className="circle-container ms-3">
                    <img src={teacher} alt="" className="profile-image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="row w-100">
              <div className="col-8">
                <div className="mb-2 ">
                  <textarea
                    className="form-control form-control-sm"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div className="col-4">
                <button className="btn bg bg-white">
                  <ion-icon name="send"></ion-icon>{" "}
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
