// import { Navigate } from "react-router-dom";
import AppraisalBox from "../components/appraisalBox";
import RatingSystem from "../components/ratingSystem";
import TitleBar from "../components/titleBar";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAppraisalByUser } from "../stores/staffAppraisalStore";
import { X } from "lucide-react";

const Appraisal = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [title] = useState("My Apprisals");
  const { user } = useSelector((state) => state.auth);
  const { appraisalByUser } = useSelector((state) => state.staffAppraisal);

  const dispatch = useDispatch();

  const closePopup = () => {
    setShowPopup(false);
    // setTimeout(() => Navigate("/login"), 500);
  };

  useEffect(() => {
    dispatch(getAppraisalByUser(user._id));
    // console.log(appraisalByUser);
  }, [dispatch]);

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
              className="md:text-base font-normal px-4 py-1 md:px-5 md:py-3 text-white bg-color-2 rounded-full hover:bg-color-1 focus:outline-none focus:ring-2 focus:ring-color-1"
            >
              Appriase
            </button>
          </div>
        </div>
        <AppraisalBox appraisals={appraisalByUser} />
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
              <X onClick={closePopup} className="cursor-pointer" />
            </div>
            <RatingSystem closePopup={closePopup} />
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

export default Appraisal;
