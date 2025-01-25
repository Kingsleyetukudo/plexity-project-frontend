import { useState } from "react";
import { useSelector } from "react-redux";
import api from "../api";
import PropTypes from "prop-types";

const RatingComponent = ({ closePopup }) => {
  const { appraisals } = useSelector((state) => state.appraisal);
  const { user, users } = useSelector((state) => state.auth);

  const [selectedUser, setSelectedUser] = useState(null); // Track the selected user
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current question set
  const [ratings, setRatings] = useState([]);
  const [comment, setComment] = useState(""); // Overall comment
  const [improveComment, setImproveComment] = useState(""); // Improvement comment

  // When a user is selected, initialize their ratings
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    console.log("Selected user:", user._id);
    setRatings(
      appraisals.map((set) => ({
        title: set.title,
        questions: set.questions.map((question) => ({
          question,
          rating: 0,
        })),
      }))
    );
    setCurrentIndex(0);
  };

  const handleRate = (questionIndex, stars) => {
    setRatings((prevRatings) =>
      prevRatings.map((set, index) =>
        index === currentIndex
          ? {
              ...set,
              questions: set.questions.map((q, i) =>
                i === questionIndex ? { ...q, rating: stars } : q
              ),
            }
          : set
      )
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleSubmit = async () => {
    const payload = {
      appraisedEmployee: selectedUser._id,
      appraisal: ratings,
      appraisedBy: user._id,
      comment,
      improveComment,
    };

    console.log(payload);

    try {
      const response = await api.post("/appraised", payload);
      console.log("Appraisal submitted:", response.data);
      closePopup();
      alert("Thank you for your feedback!");
      setSelectedUser(null); // Reset the state after submission
    } catch (error) {
      console.error("Error submitting appraisal:", error);
      alert("An error occurred while submitting your appraisal.");
    }
  };

  const currentSet = appraisals[currentIndex];

  return (
    <div className="p-5 max-w-[550px] my-0 mx-auto border-[1px] border-[#ddd] rounded-md bg-[#f9f9f9] shadow-[0 4px 6px rgba(0,0,0,0.1)]">
      {!selectedUser ? (
        // Display the list of users
        <div>
          <h2 className="text-xl font-bold mb-4">Select a Member</h2>
          <ul className="list-none overflow-auto max-h-[300px]">
            {users.map((user) => (
              <li
                key={user._id}
                onClick={() => handleUserSelect(user)}
                className="cursor-pointer p-3 border-b-[1px] border-[#ddd] hover:bg-[#f0f0f0]"
              >
                {user.firstName} {user.lastName}
              </li>
            ))}
          </ul>
        </div>
      ) : currentIndex < appraisals.length ? (
        // Display the appraisal questions for the selected user
        <>
          <h2 className="text-xl font-bold mb-4">
            {currentIndex + 1}. {currentSet.title}
          </h2>
          {currentSet.questions.map((question, index) => (
            <div key={index} style={{ marginBottom: "15px" }}>
              <p style={{ marginBottom: "5px" }}>{question}</p>
              <div style={{ display: "flex", gap: "8px", cursor: "pointer" }}>
                {Array.from({ length: 5 }, (_, starIndex) => {
                  const star = starIndex + 1;
                  return (
                    <span
                      key={star}
                      onClick={() => handleRate(index, star)}
                      style={{
                        fontSize: "30px",
                        color:
                          star <=
                          ratings[currentIndex]?.questions?.[index]?.rating
                            ? "#4550a1"
                            : "#ccc",
                      }}
                    >
                      ★
                    </span>
                  );
                })}
              </div>
            </div>
          ))}

          <div
            className={`flex ${
              currentIndex ? "justify-between" : "justify-end"
            }`}
          >
            {currentIndex ? (
              <button
                onClick={handlePrev}
                className="md:text-xl font-semibold md:font-bold px-4 py-2 md:px-8 md:py-3 text-white bg-color-2 rounded-full hover:bg-color-1 focus:outline-none focus:ring-2 focus:ring-color-1"
              >
                Go back
              </button>
            ) : null}
            <button
              onClick={handleNext}
              className="md:text-xl font-semibold md:font-bold px-4 py-2 md:px-8 md:py-3 text-white bg-color-2 rounded-full hover:bg-color-1 focus:outline-none focus:ring-2 focus:ring-color-1"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        // Display the feedback form after all questions
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold">Thank You!</h2>
            <p>Please provide additional feedback below:</p>
          </div>
          <div>
            <textarea
              placeholder="General comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2.5 mb-2.5 border-[1px solid #ddd] rounded-md resize-none"
            />
            <textarea
              placeholder="Suggestions for improvement"
              value={improveComment}
              onChange={(e) => setImproveComment(e.target.value)}
              className="w-full p-2.5 border-[1px solid #ddd] rounded-md resize-none"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="md:text-xl font-semibold md:font-bold px-4 py-2 md:px-8 md:py-3 text-white bg-color-2 rounded-full hover:bg-color-1 focus:outline-none focus:ring-2 focus:ring-color-1"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

RatingComponent.propTypes = {
  closePopup: PropTypes.func.isRequired,
};

export default RatingComponent;
