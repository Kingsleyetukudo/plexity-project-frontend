const CricleProgressBar = () => {
  const progress = 1.8; // Example staff rating (out of 5)
  const maxRating = 5; // Maximum possible rating
  const radius = 50; // Radius of the circle
  const strokeWidth = 6; // Stroke width of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle

  // Calculate the progress as a fraction of the maximum rating
  const progressPercentage = (progress / maxRating) * 100;
  const strokeDashoffset =
    circumference - (circumference * progressPercentage) / 100;
  return (
    <div>
      <div className="relative flex items-center justify-center w-32 h-32">
        {/* SVG Circle */}
        <svg className="absolute w-full h-full" viewBox="0 0 120 120">
          {/* Background Circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="lightgray"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="blue"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        {/* Rating Text */}
        <span className="absolute text-xl font-semibold text-blue-500">
          {progress}
        </span>
      </div>
    </div>
  );
};

export default CricleProgressBar;
