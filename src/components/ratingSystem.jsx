import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../api";
import PropTypes from "prop-types";
import { getAllAppraisalByClickUser } from "../stores/staffAppraisalStore";
import PopUpBox from "./popupBox";

const RatingComponent = ({ closePopup }) => {
  const { appraisals } = useSelector((state) => state.appraisal);
  const { user, users } = useSelector((state) => state.auth);
  // const [togglePopup, setTogglePopup] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [comment, setComment] = useState("");
  const [improveComment, setImproveComment] = useState("");
  const [isWithinOneMonth, setIsWithinOneMonth] = useState(false);
  const [itYou, setItYou] = useState(false);
  const [message, setMessage] = useState("");
  const [openSuccessBox, setOpenSuccessBox] = useState(false);

  const dispatch = useDispatch();

  // When a user is selected, initialize their ratings
  const handleUserSelect = async (selectUser) => {
    // Prevent the current user from appraising themselves
    if (selectUser._id === user._id) {
      setItYou(true);
      // Show an alert or a message, or simply return without setting the user
      setMessage("You cannot appraise yourself.");
      return;
    }

    const clickUser = await dispatch(
      getAllAppraisalByClickUser(selectUser._id)
    );

    // Ensure payload is an array
    const openUser = Array.isArray(clickUser.payload) ? clickUser.payload : [];

    // Check if the current user has already appraised this employee in the current month
    const allDates = openUser
      .filter((d) => d.appraisedBy === user._id) // Filter for appraisals by the current user
      .map((d) => d.date); // Get the dates of those appraisals

    // If there are appraisals by the current user
    if (allDates.length) {
      const getMostRecentDate = (dates) =>
        new Date(Math.max(...dates.map((date) => new Date(date).getTime())));

      // Get the most recent appraisal date
      const mostRecentDate = getMostRecentDate(allDates);

      // Check if the most recent appraisal was within the last month
      const checkIfWithinOneMonth = (recentDate) => {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return recentDate > oneMonthAgo;
      };

      const withinOneMonth = checkIfWithinOneMonth(mostRecentDate);

      // If the user has already appraised the employee within the month, show the message and exit
      if (withinOneMonth) {
        setIsWithinOneMonth(true); // Show the popup message
        setMessage("You can't appraise this member for the month again!");
        setSelectedUser(null); // Deselect the user
        return;
      }
    }

    // If no appraisal exists within the month, proceed with the normal appraisal flow
    setIsWithinOneMonth(false);
    setSelectedUser(selectUser);
    setRatings(
      appraisals.map((set) => ({
        title: set.title,
        questions: set.questions.map((question) => ({
          question,
          rating: 0,
        })),
      }))
    );
    setCurrentIndex(0); // Start from the first question
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

    try {
      const response = await api.post("/appraised", payload);
      // console.log("Appraisal submitted:", response.data);
      setOpenSuccessBox(true);
      if (response.data.status === "success") {
        setTimeout(() => {
          setMessage("Appraise not add...");
          setSelectedUser(null); // Reset the state after submission
          closePopup();
          setOpenSuccessBox(false);

          // dispatch(fetchCommentsByCurrentUser(user._id));
        }, 3000);
      } else {
        setMessage("Appraise not add...");
      }
    } catch (error) {
      console.error("Error submitting appraisal:", error);
      closePopup();
    }
  };

  const noAppraisePopup = () => {
    setIsWithinOneMonth(false);
    setItYou(false);
    setSelectedUser(null);
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
                className="cursor-pointer p-3 border-b-[1px] border-[#ddd] hover:bg-[#f0f0f0] flex items-center justify-between"
              >
                <p>
                  {user.firstName} {user.lastName}
                </p>{" "}
                <button className="text-[10px]   px-2.5 py-1  text-white bg-color-2 rounded-full hover:bg-color-1 focus:outline-none focus:ring-2 focus:ring-color-1">
                  Appraise
                </button>
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
                className="md:text-base font-normal px-4 py-1 md:px-5 md:py-3 text-white bg-color-2 rounded-full hover:bg-color-1 focus:outline-none focus:ring-2 focus:ring-color-1"
              >
                Go back
              </button>
            ) : null}
            <button
              onClick={handleNext}
              className="md:text-base font-normal px-4 py-1 md:px-5 md:py-3 text-white bg-color-2 rounded-full hover:bg-color-1 focus:outline-none focus:ring-2 focus:ring-color-1"
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
              className="md:text-base font-normal px-4 py-1 md:px-5 md:py-3 text-white bg-color-2 rounded-full hover:bg-color-1 focus:outline-none focus:ring-2 focus:ring-color-1"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {(isWithinOneMonth || itYou || openSuccessBox) && (
        <PopUpBox note={message} closePopupNote={noAppraisePopup} />
      )}
    </div>
  );
};

RatingComponent.propTypes = {
  closePopup: PropTypes.func.isRequired,
};

export default RatingComponent;
