import CommentBox from "../components/commentbox";
import TitleBar from "../components/titleBar";
import { useState } from "react";
import { X } from "lucide-react";

const Comment = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [title] = useState("My Comments");

  const closePopup = () => {
    setShowPopup(false);
    // setTimeout(() => Navigate("/login"), 500);
  };

  const handleAppraisal = () => {
    setShowPopup(true);
  };

  return (
    <>
      <div className="grid gap-8 ">
        <div className="flex justify-between items-center md:my-5">
          <TitleBar title={title} />
          <div>
            <button
              onClick={handleAppraisal}
              className="text-sm md:text-xl font-semibold md:font-bold px-4 py-2 md:px-8 md:py-3 text-white bg-color-2 rounded-full hover:bg-color-1 focus:outline-none focus:ring-2 focus:ring-color-1"
            >
              Send Comment
            </button>
          </div>
        </div>
      </div>
      {showPopup && (
        <>
          <div
            className="fixed space-y-5  w-[350px] md:min-w-[550px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white shadow-md rounded-lg z-50"
            role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <div className="flex items-center justify-end">
              <X onClick={closePopup} />
              {/* <button
                
                className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
              >
                Close
              </button> */}
            </div>
            <CommentBox />
          </div>
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
            onClick={closePopup}
          />
        </>
      )}
    </>
  );
};

export default Comment;
