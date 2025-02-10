import { X } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";

const EditApppraisalBox = ({
  apppraise,
  questions = [], // Default to an empty array if questions is undefined
  toggleEditApppraise,
  updateApppraise,
}) => {
  const [title, setLocalTitle] = useState(apppraise.title || "");
  const [localQuestions, setLocalQuestions] = useState([...questions]);
  const closePopup = () => {
    toggleEditApppraise();
  };

  const handleUpdate = () => {
    updateApppraise(apppraise._id, { title, questions: localQuestions });
    toggleEditApppraise();

    console.log(apppraise._id, { title, questions: localQuestions });
  };

  const handleTitleChange = (e) => {
    // Update the title using setTitle function
    setLocalTitle(e.target.value);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...localQuestions];
    updatedQuestions[index] = value;
    setLocalQuestions(updatedQuestions);
  };

  return (
    <>
      <div
        className="fixed space-y-5 w-[300px] md:min-w-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white shadow-md rounded-lg z-50"
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="flex justify-end cursor-pointer">
          <X onClick={closePopup} />
        </div>
        <p className="font-bold p-3">Edit your appraisal</p>
        <input
          placeholder="Enter Title..."
          value={title}
          onChange={handleTitleChange}
          className="w-full p-2 border rounded-md resize-none"
        />

        {/* Render question input fields */}
        {localQuestions.length > 0 ? (
          localQuestions.map((question, index) => (
            <textarea
              key={index}
              placeholder={`Enter question ${index + 1}...`}
              value={question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              className="w-full p-2 border rounded-md resize-none mb-3"
            />
          ))
        ) : (
          <p>No questions available</p>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            className="md:text-xl font-semibold md:font-bold px-4 py-2 md:px-8 md:py-3 text-white bg-color-2 rounded-full hover:bg-color-1 focus:outline-none focus:ring-2 focus:ring-color-1"
          >
            Update
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

EditApppraisalBox.propTypes = {
  apppraise: PropTypes.object.isRequired,
  setTitle: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateQuestion: PropTypes.func.isRequired,
  toggleEditApppraise: PropTypes.func.isRequired,
  updateApppraise: PropTypes.func.isRequired,
};

export default EditApppraisalBox;
