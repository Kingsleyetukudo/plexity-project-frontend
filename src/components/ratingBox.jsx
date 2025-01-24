import { useState } from "react";

// StarRating Component
const StarRating = ({ question, rating, onRate }) => {
  const handleRating = (stars) => {
    onRate(stars); // Call the parent handler to update the rating
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <p>{question}</p>
      <div className="flex gap-5 cursor-pointer">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRating(star)}
            style={{
              fontSize: "30px",
              color: star <= rating ? "#4550a1" : "#ccc", // Gold for selected stars
            }}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

// Main Rating Component
const RatingComponent = () => {
  const [ratings, setRatings] = useState({
    question1: 0,
    question2: 0,
  });

  const handleRate = (question, stars) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [question]: stars,
    }));
  };

  return (
    <div className="p-5 max-w-[550px] my-0 mx-auto border-[1px] border-[#ddd] rounded-md bg-[#f9f9f9] shadow-[0 4px 6px rgba(0,0,0,0.1)]">
      <h2 className="text-xl font-bold mb-4">Client Satisfaction </h2>
      <StarRating
        question="How well does the employee contribute to client satisfaction and maintaining a positive relationship with clients? "
        rating={ratings.question1}
        onRate={(stars) => handleRate("question1", stars)}
      />
      <StarRating
        question="Are there any feedback or complaints from clients about their work?"
        rating={ratings.question2}
        onRate={(stars) => handleRate("question2", stars)}
      />
      {/* <div style={{ marginTop: "20px", textAlign: "center" }}>
        <strong>Your Ratings:</strong>
        <p>UI: {ratings.question1} stars</p>
        <p>Experience: {ratings.question2} stars</p>
      </div> */}
    </div>
  );
};

export default RatingComponent;
