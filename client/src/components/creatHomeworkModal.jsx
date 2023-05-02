const HomeworkModal = ({ targetId }) => {
  return (
    <div className="">
      <div
        className="modal fade"
        id={targetId}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Ajouter un devoir
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body"></div>
            <div className="modal-footer">
              <button type="button" className="btn " data-bs-dismiss="modal">
                Annuler
              </button>
              <button type="button" className="btn ">
                Publier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeworkModal;
