import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { AiFillCloseCircle } from "react-icons/ai";
const Modal = ({ show, onClose, children, title, secondTitle }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => setIsBrowser(true));

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className="bg-blend-screen h-screen fixed top-0 left-0 bg-gray-100  w-full p-10 flex">
      <div className="text-center bg-white w-max m-auto">
        <div className="h-2 bg-blue-600 rounded-t-md"></div>
        <div className="p-6 font-light">
          <button
            onClick={onClose}
            className="flex justify-end text-right text-white items-center text-2xl cursor-pointer transition   "
          >
            <AiFillCloseCircle size="32" color="#2563EB" />
          </button>
          <div className="grid grid-cols-4 gap-4 mb-3">
            <div className="col-span-3">
              <h1 className=" text-3xl text-right">{title}</h1>
              <h2 className=" text-2xl text-right">{secondTitle}</h2>
            </div>
          </div>

          <div className=" grid place-items-center">{children}</div>
        </div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

export default Modal;
