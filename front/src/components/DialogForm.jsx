import { useEffect, useRef, useState } from "react";

const DialogForm = ({ header, footer, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    window.onclick = function (event) {
      if (event.target == modalRef.current) {
        modalRef.current.style.display = "none";
      }
    };
  });

  return (
    <>
      <div id="myModal" className="modal" ref={modalRef}>
        <div className="modal-content">
          <div className="modal-header">
            <span
              className="close"
              onClick={() => (modalRef.current.style.display = "none")}
            >
              &times;
            </span>
            <h2>{header}</h2>
          </div>
          <div className="modal-body">
            <p>Some text in the Modal Body</p>
            <p>Some other text...</p>
            {children}
          </div>
          <div className="modal-footer">
            <h3>{footer}</h3>
          </div>
        </div>
      </div>
      <button onClick={() => (modalRef.current.style.display = "block")}>
        open
      </button>
    </>
  );
};

export default DialogForm;
