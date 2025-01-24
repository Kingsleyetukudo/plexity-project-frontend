import { useDispatch } from "react-redux";
import { openPopup } from "../stores/userStateStore";
const PopUpBox = () => {
  const dispatch = useDispatch();

  const closePopup = () => {
    dispatch(openPopup(true));
  };
  return (
    <>
      <div
        className="fixed space-y-5 text-center w-[300px] md:min-w-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white shadow-md rounded-lg z-50"
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <h2 id="modal-title" className="font-bold">
          Thank You!
        </h2>
        <p id="modal-description">
          Your registration was successful. <br /> Welcome aboard!
        </p>
        <div className="mt-6">
          <button
            onClick={closePopup}
            className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
        onClick={closePopup}
      />
    </>
  );
};

export default PopUpBox;
