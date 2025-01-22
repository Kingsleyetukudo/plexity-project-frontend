const TaskProgressCard = () => {
  const progress = 4.6; // Example progress value (percentage)
  const maxRating = 5;

  const progressPercentage = (progress / maxRating) * 100;

  return (
    <>
      <div className="w-full grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="p-4 bg-white rounded-lg shadow-md w-full">
          {/* Task Title */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-color-1 uppercase">
              Total Rating
            </h3>
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
            {progress.toFixed(1)}
          </div>

          {/* Progress Bar */}
          <div className="relative w-full h-2 bg-gray-200 rounded-full">
            <div
              className="absolute top-0 left-0 h-2 bg-color-1 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md w-full">
          {/* Task Title */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-color-1 uppercase">
              Total Reviews
            </h3>
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
                  transform="translate(330,392)"
                  d="m0 0h727l12 2 10 4 10 6 7 6 9 13 4 9 2 7 1 15-3 14-8 16-10 11-13 8-12 4-8 1-721 1-20 2-21 5-20 8-16 9-14 10-11 10h-2l-2 4-7 7-11 15-10 17-8 20-5 19-2 11-1 14v774l2 22 6 23 9 21 10 17 11 14 7 7v2l4 2 11 10 15 10 19 10 24 8 16 3 7 1 20 1h236l36 1 12 3 14 8 9 8 9 14 4 11 1 6v29l-3 93-2 55v24l3 6 1 3 10 4h7l10-5 21-16 19-14 21-16 19-14 17-13 16-12 21-16 64-48 21-16 19-14 21-16 19-14 21-16 28-21 12-8 15-5 12-1h308l91-1 24-4 21-7 17-8 16-10 13-11 3-3h2v-2l5-5 8-9 10-14 11-21 7-21 3-14 2-17 1-480 3-14 4-10 8-11 11-10 15-7 11-2h12l11 2 12 5 13 10 9 12 5 11 2 9v496l-3 25-6 27-10 30-16 33-13 20-12 16-13 15-17 17-11 9-17 13-21 13-16 8-15 7-30 10-27 6-23 3-16 1h-243l-131 1-13 10-19 14-13 10-19 14-13 10-32 24-13 10-108 81-21 16-19 14-21 16-16 12-17 12-16 9-19 7-23 5h-31l-20-4-19-7-19-10-13-10-12-11-11-13-10-16-7-15-5-16-3-17v-52l3-89 1-5h-214l-27-2-24-4-23-6-20-7-20-9-19-10-18-12-13-10-11-9-26-26-11-14-11-15-14-24-9-19-8-21-8-30-4-26-1-11-1-25v-756l2-31 4-24 6-24 8-23 9-20 11-20 12-18 11-14 12-14 17-17 11-9 13-10 17-11 18-10 21-10 30-10 28-6 15-2z"
                />
                <path
                  transform="translate(1585,83)"
                  d="m0 0h19l17 3 15 5 15 8 11 9 8 8 10 14 16 26 55 88 7 10 144 36 18 6 16 9 11 9 8 8 9 13 8 16 4 13 2 11v21l-3 16-5 13-6 12-9 12-8 10-22 26-9 11-24 28-9 11-11 13-9 11-4 5 2 38 7 100v35l-4 17-9 19-8 11-3 4h-2l-2 4-12 10-16 9-18 6-9 2-9 1h-10l-15-2-24-8-34-14-89-36-8-3-6 1-109 44-28 11-21 6-9 1h-13l-17-3-14-5-12-6-11-8-11-10-10-13-8-15-5-16-2-11v-25l9-128 1-16-9-11-13-15-8-10-13-15-9-11-12-14-8-10-13-15-16-20-7-11-7-16-4-16-1-16 2-17 5-17 8-16 9-12 6-7 14-11 11-6 12-5 26-7 124-31 5-2 12-19 16-26 24-38 16-26 13-20 10-13 9-8 14-9 14-6 17-4zm9 131-9 14-60 96-7 11-8 10-1 3-4 2-7 5-19 7-73 18-63 16 1 4 11 12 8 10 12 14 8 10 12 14 9 11 12 14 9 11 12 15 6 10 4 13v31l-8 116v12l16-6 97-39 23-9 12-3h14l16 4 92 37 27 11 12 5h2v-10l-9-127v-18l3-12 7-14 13-16 6-7v-2h2l18-22 12-14 14-17 8-9 8-10 12-14 1-3 2-1-29-8-112-28-16-7-10-8-9-11-15-24-13-21-24-38-16-26-6-10h-2z"
                />
                <path
                  transform="translate(586,843)"
                  d="m0 0h641l16 3 14 7 10 9 7 9 5 10 3 10 1 13-3 15-8 16-9 10-10 7-9 4-12 3h-650l-12-3-13-7-8-7v-2h-2l-7-10-5-11-3-14 1-14 5-15 7-11 5-6 11-8 10-5z"
                />
                <path
                  transform="translate(585,1134)"
                  d="m0 0h346l12 2 9 4 10 6 8 7 7 10 5 11 2 7v22l-4 12-6 11-10 11-13 8-13 4-5 1h-350l-12-3-14-7-10-9-7-10-6-13-2-10v-10l3-14 4-9 6-9 7-8 10-7 8-4 7-2z"
                />
              </svg>
            </div>
          </div>

          {/* Progress Value */}
          <div className="text-4xl font-bold text-gray-800 mb-4">
            <h1>50</h1>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md w-full">
          {/* Task Title */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-color-1 uppercase">
              Pending Leave
            </h3>
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
                  transform="translate(39)"
                  d="m0 0h1249l13 5 11 8 6 7 6 10 3 13 1 395-1 2-26 4-61 8h-10l-1-68v-190l1-97-832 1 73 21 23 7 73 21 23 7 73 21 23 7 24 7 14 6 8 6 7 7 6 10 3 11 1 14 1 539 11-13 9-11 11-13 18-22 12-14 11-14 8-9 11-14 9-10 8-10 11-13 9-12h2l2-4 9-11 13-15 13-10 12-6 15-4 53-10 72-13 59-11 72-13 59-11 67-12 16-2h33l25 4 24 7 42 16 88 34 36 14 16 7 15 9 13 11 10 11 7 10 8 16 5 15 3 16v20l-4 20-8 24-20 52-8 21-21 55-9 23-6 16-4 10v2l26 7 121 31 74 19 18 6 13 7 13 11 8 11 7 14 4 16 1 14h19l14 2 9 4 8 6 7 8 5 12 1 6v91h69l15 3 10 6 5 4 7 11 3 8 1 7v281l-3 14-6 10-4 5-11 7-12 3-13 1h-340l3-10 14-40 7-29 1-5v-35l-7-31-8-18-11-21-11-17-91-143 1-4 11-5 12-2h69v-96l-49-13-55-14-9-2-16 42-30 79-6 16v7l10 15 11 18 11 17 14 22 15 23 11 18 11 17 12 19 11 17 7 11 11 18 8 17 3 12 1 7v15l-3 17-12 36-19 53-34 96-16 45-17 48-11 30-10 29-18 50-6 17-7 16-10 14-11 11-13 8-11 5-13 4-6 1h-24l-16-4-17-8-10-8-12-12-10-16-5-13-3-15v-16l4-20 17-49 10-27 10-29 12-34 21-59 17-47 10-29 17-48 14-40-1-5-42-66-16-25-12-19-16-25-12-19-56-88-12-19-9-14-5-4-18-6-5 16-13 44-23 79-24 82-17 58-19 65-8 21-9 17-8 16-12 23-12 22-20 39-9 16-8 16-13 25-11 20-8 16-12 22-8 16-12 22-8 16-18 34-13 25-10 17-11 13-9 8-14 8-16 6-11 2h-24l-7-2v-229l17-33 10-19 18-34 12-23 10-19 18-34 15-29 12-22 11-21 5-14 11-37 15-52 42-145 19-66 14-49 11-30 19-49 14-37 21-55 16-42 21-55 13-34 11-29 20-52 15-40v-2l-84 15-147 27-9 3-9 11-11 13-8 10-9 11-11 13-11 14-9 10-8 10-12 14-8 10-9 11-11 13-11 14-9 10-11 14-9 10-11 14-9 10-8 10-9 11-11 13-9 11-14 14-17 10-1 985-1 22-4 13-6 9-8 8-10 6-9 4h-22l-32-10-76-22-377-110-161-47-17-7-10-9-7-9-4-9-2-11-1-93h-1v-1656h1l1-19 2-12 4-9 7-10 8-7 9-5 6-1zm-37 161m0 331v9h1v-9zm0 10 1 2zm0 4 1 2zm0 4 1 2zm0 55m554 377-12 3-10 6-6 5-7 10-4 9-2 10v286l2 11 7 14 6 7 12 8 15 4h11l12-3 12-7 5-4 9-14 3-10 1-7v-283l-3-15-5-9-5-7-11-8-8-4-10-2zm1172 194v47h125v-47z"
                />
                <path
                  transform="translate(1605,191)"
                  d="m0 0 23 1 18 3 20 6 25 12 11 7 14 11 12 11 9 11 9 12 10 18 6 14 6 20 3 17 1 10v14l-1 17-6 25-5 15-12 24-9 12-8 10-9 10-11 9-14 10-18 10-21 8-15 4-19 3h-28l-16-2-28-8-16-8-15-8-14-11-10-9-7-7-9-11-8-11-11-20-7-19-4-15-3-21v-21l2-19 8-29 8-17 8-14 7-9 10-13 9-9 11-9 11-8 18-10 14-6 20-6 20-3z"
                />
                <path
                  transform="translate(1262,1304)"
                  d="m0 0h3l10 16 16 25 12 19 16 25 8 13 1 8-1 155-12 35-18 50-10 29-15 42-22 62-5 16-5 21-1 11-1 27-1 1h-209l1-5 14-26 15-29 10-19 10-18 7-1h111l33 1 1-349 21-72 9-31z"
                />
                <path transform="translate(1295,1)" d="m0 0" />
                <path transform="translate(1292)" d="m0 0" />
              </svg>
            </div>
          </div>

          {/* Progress Value */}
          <div className="text-4xl font-bold text-gray-800 mb-4">
            <h1>2</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskProgressCard;
