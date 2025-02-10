import { useState } from "react";

import TitleBar from "../components/titleBar";
import AddAppraisalBox from "../components/addAppraisalBox";
import AppraisalQuestionsList from "../components/appraisalQuestionsList";

const AppraisalQuestionsView = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [title] = useState("Appraisal Questions");
  // const [isLoading, setIsLoading] = useState(true); // Added loading state

  const closePopup = () => {
    console.log("clico");
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
                className="text-sm md:text-xl font-semibold md:font-bold px-4 py-2 md:px-8 md:py-3 text-white bg-color-2 rounded-full hover:bg-color-1 focus:outline-none focus:ring-2 focus:ring-color-1"
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
