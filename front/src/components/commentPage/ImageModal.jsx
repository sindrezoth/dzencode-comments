import { useEffect, useRef, useState } from "react";

const ImageModal = ({ children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const closeHandleCopy = (e) => e.key === "Escape" && closeHandle();
    document.addEventListener("keyup", closeHandleCopy);
    return () => document.removeEventListener("keyup", closeHandleCopy);
  }, []);

  function closeHandle() {
    modalRef.current.style.display = "none";
  }

  function openHandle() {
    modalRef.current.style.display = "block";
  }

  return (
    <>
      <div id="myModal" className="modal" ref={modalRef}>
        <div className="modal-content">
          <div className="modal-header">
            <button onClick={() => closeHandle()}>X</button>
          </div>
          <div className="modal-body">{children("modal")}</div>
        </div>
      </div>
      {children("block", openHandle)}
    </>
  );
};

export default ImageModal;
