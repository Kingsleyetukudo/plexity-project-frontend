import { useSelector } from "react-redux";

const TaskProgressCard = () => {
  const { userTotalRating } = useSelector((state) => state.staffAppraisal);

  const progress = userTotalRating; // Example progress value (percentage)
  const maxRating = 5;

  const progressPercentage = (progress / maxRating) * 100;

  return (
    <>
      <div className="w-full grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="p-4 bg-white rounded-lg shadow-md w-full">
          {/* Task Title */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-color-1 uppercase">Rating</h3>
            {/* Icon */}
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-color-2">
              <svg
                className="w-7 h-7 text-white"
                version="1.1"
                viewBox="0 0 2048 2048"
                width="512"
                height="512"
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
              >
                <path
                  transform="translate(1021,43)"
                  d="m0 0 19 1 17 4 17 7 10 6 13 10 11 11 10 14 8 16 13 30 17 40 23 54 36 84 19 45 13 30 17 40 15 35 23 54 15 35 23 54 18 42 2 1 542 49 49 5 20 4 13 5 15 8 13 10 10 10 10 14 8 15 7 20h1v46l-2 2-6 18-9 17-9 12-4 5-8 7-12 11-11 9-14 13-11 9-12 11-8 7-10 9-11 9-12 11-8 7-14 12-10 9-14 12-11 10-8 7-14 12-12 11-11 9-12 11-8 7-14 12-10 9-8 7-10 9-11 9-12 11-8 7-14 12-10 9-8 7-14 12-10 9-8 7-10 9-11 9-12 11-8 7-14 12-12 11-11 9-6 5 1 10 49 216 15 66 22 97 25 110 19 84 2 13v19l-4 20-6 16-6 12-8 11-9 10-10 9-13 8-18 8-15 4-12 2h-18l-17-3-15-5-25-13-28-17-32-19-28-17-32-19-25-15-32-19-28-17-32-19-28-17-29-17-28-17-32-19-40-24-27-16-60-36-17-10-4 1-22 13-45 27-64 38-28 17-32 19-50 30-32 19-28 17-17 10-15 9-22 13-60 36-32 19-28 17-29 17-15 8-18 6-17 3h-19l-17-3-17-6-15-8-14-11-9-9-11-15-8-16-6-18-2-11v-25l7-34 16-70 15-66 18-79 19-84 15-66 19-83 7-32 10-43 7-31-1-6-8-7-14-12-12-11-11-9-12-11-8-7-10-9-11-9-12-11-8-7-14-12-10-9-8-7-10-9-11-9-12-11-8-7-14-12-10-9-8-7-14-12-11-10-11-9-14-13-11-9-13-12-11-9-14-13-11-9-13-12-8-7-13-11-12-11-11-9-12-11-8-7-14-12-10-9-8-7-10-9-8-7-8-8-11-16-7-14-7-21v-41l9-24 8-15 10-13 11-11 14-10 16-8 17-5 20-3 583-53 3-3 13-31 22-51 19-45 16-37 17-40 15-35 16-38 48-112 23-54 42-98 8-16 10-14 6-7h2v-2l14-11 14-8 14-6 18-4z"
                />
                <path transform="translate(2047,794)" d="m0 0" />
              </svg>
            </div>
          </div>

          {/* Progress Value */}
          <div className="text-4xl font-bold text-gray-800 mb-4">
            {progress.toFixed(1)} / 5
          </div>

          {/* Progress Bar */}
          <div className="relative w-full h-2 bg-gray-200 rounded-full">
            <div
              className="absolute top-0 left-0 h-2 bg-color-1 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskProgressCard;
