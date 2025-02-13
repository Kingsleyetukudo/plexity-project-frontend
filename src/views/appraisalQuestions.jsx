import { useState } from "react";

import TitleBar from "../components/titleBar";
import AddAppraisalBox from "../components/addAppraisalBox";
import AppraisalQuestionsList from "../components/appraisalQuestionsList";

const AppraisalQuestionsView = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [title] = useState("Appraisal Questions");
  // const [isLoading, setIsLoading] = useState(true); // Added loading state

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleAppraisal = () => {
    setShowPopup(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-8">
        <div className="grid gap-8">
          <div className="flex justify-between items-center md:my-5">
            <TitleBar title={title} />
            <div>
              <button
                onClick={handleAppraisal}
                className="md:text-base font-normal px-4 py-1 md:px-5 md:py-3 text-white bg-color-2 rounded-full hover:bg-color-1 focus:outline-none focus:ring-2 focus:ring-color-1"
              >
                Add Appraisal
              </button>
            </div>
          </div>
        </div>

        {showPopup && (
          <>
            <AddAppraisalBox closeAddAppraisal={closePopup} />
          </>
        )}

        <AppraisalQuestionsList />
      </div>
    </>
  );
};

export default AppraisalQuestionsView;
