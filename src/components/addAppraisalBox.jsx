import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAppraise } from "../stores/appraisalStore";
import PopUpBox from "./popupBox";
import PropTypes from "prop-types";
import { X } from "lucide-react";

const AddAppraisalBox = ({ closeAddAppraisal }) => {
  const [title, setTitle] = useState("");
  const [questionOne, setQuestionOne] = useState("");
  const [questionTwo, setQuestionTwo] = useState("");
  // const [selectedUser, setSelectedUser] = useState(null);
  // const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [openSuccessBox, setOpenSuccessBox] = useState(false);

  const dispatch = useDispatch();

  // const handleUserSelect = (user) => {
  //   setSelectedUser(user);
  //   console.log("Selected User:", user);
  // };

  const handleAddAppraisal = async () => {
    if (!title) {
      setError("Please enter a comment.");
      return;
    }
    if (!questionOne) {
      setError("Please enter a comment.");
      return;
    }

    const newAppraisal = {
      title,
      questions: [questionOne, questionTwo],
    };

    const newAddAppraisal = await dispatch(addAppraise(newAppraisal));
    console.log(newAddAppraisal);
    if (newAddAppraisal.meta.requestStatus === "fulfilled") {
      setMessage("Appraisal added successfully.");
      setOpenSuccessBox(true);

      // Delay closing popup so success message is visible
      setTimeout(() => {
        setOpenSuccessBox(false);
        closeAddAppraisal(); // Close after success message is shown
        setTitle("");
        setQuestionOne("");
        setQuestionTwo("");
        // dispatch(fetchCommentsByCurrentUser(user._id));
      }, 3000); // 2 seconds delay
    } else {
      setMessage("Appriasal Questions added successfully...");
    }
  };

  const closePopup = () => {
    closeAddAppraisal();
    setTitle("");
    setQuestionOne("");
    setQuestionTwo("");
  };

  return (
    <>
      <div>
        {/* Comment Popup */}
        <div
          className="fixed space-y-5 w-[350px] md:min-w-[550px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white shadow-md rounded-lg z-50"
          role="dialog"
        >
          <div className="flex items-center justify-end">
            <X onClick={closePopup} className="cursor-pointer" />
          </div>
          <h2 className="text-xl font-bold">Add Appriasal Question </h2>

          <input
            placeholder="Enter Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2  border rounded-md resize-none"
          />
          <textarea
            placeholder="Enter question 1..."
            value={questionOne}
            onChange={(e) => setQuestionOne(e.target.value)}
            className="w-full p-2  border rounded-md resize-none"
          />
          <textarea
            placeholder="Enter question 2..."
            value={questionTwo}
            onChange={(e) => setQuestionTwo(e.target.value)}
            className="w-full p-2  border rounded-md resize-none"
          />
          {error && <p className="text-red-600">{error}</p>}
          <div className="flex justify-end">
            <button
              onClick={handleAddAppraisal}
              className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </div>
        {/* Background overlay */}
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
          onClick={closePopup}
        />
      </div>

      {/* Success Message Popup */}
      {openSuccessBox && <PopUpBox note={message} />}
    </>
  );
};

AddAppraisalBox.propTypes = {
  closeAddAppraisal: PropTypes.func.isRequired,
};

export default AddAppraisalBox;
