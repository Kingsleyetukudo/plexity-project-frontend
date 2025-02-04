// import { useDispatch } from "react-redux";
// import { openPopup } from "../stores/userStateStore";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import icon from "../assets/images/successful-icon.svg";
// import { useState } from "react";
const PopUpBox = ({ note, closePopupNote }) => {
  // const dispatch = useDispatch();

  const closePopup = () => {
    // dispatch(openPopup());
    closePopupNote();
  };
  return (
    <>
      <div
        className="fixed space-y-5 text-center w-[300px] md:min-w-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white shadow-md rounded-lg z-50"
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="flex justify-end">
          <X onClick={closePopup} />
        </div>
        <div className="flex justify-center items-center">
          <img src={icon} alt="" className="w-16" />
        </div>
        <h2 id="modal-title" className="font-bold">
          Thank You!
        </h2>
        <p id="modal-description">{note}</p>
      </div>
      <div className="mt-6"></div>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
        onClick={closePopup}
      />
    </>
  );
};

PopUpBox.propTypes = {
  note: PropTypes.string.isRequired,
  closePopupNote: PropTypes.func.isRequired,
};

export default PopUpBox;
