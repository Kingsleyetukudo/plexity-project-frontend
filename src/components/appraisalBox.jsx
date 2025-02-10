import likeIcon from "../assets/images/like-icon.svg";
import dislikeIcon from "../assets/images/commentImprove.svg";
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";

const AppraisalBox = ({ appraisals }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [appraisalsPerPage] = useState(5); // Number of appraisals per page

  const handleRoute = (id) => {
    const isAppraisalRoute = location.pathname === "/dashboard/appraisal";

    const details = !isAppraisalRoute;

    if (details) {
      navigate(`/dashboard/appraisal-details/${id}`);
    } else {
      navigate(`/dashboard/appraisal/${id}`);
    }
  };

  // Pagination logic: Get the slice of appraisals for the current page
  const indexOfLastAppraisal = currentPage * appraisalsPerPage;
  const indexOfFirstAppraisal = indexOfLastAppraisal - appraisalsPerPage;
  const currentAppraisals = appraisals.slice(
    indexOfFirstAppraisal,
    indexOfLastAppraisal
  );

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the total number of pages
  const totalPages = Math.ceil(appraisals.length / appraisalsPerPage);

  return (
    <>
      <div className="grid gap-6">
        {currentAppraisals && currentAppraisals.length > 0 ? (
          currentAppraisals.map((appraisal, index) => (
            <div
              key={index}
              onClick={() => handleRoute(appraisal._id)}
              className="grid gap-2 bg-slate-200 shadow-lg cursor-pointer"
            >
              <div className="grid md:grid-cols-2 md:p-4">
                <p>
                  <span className="font-bold">Reviewed:</span>{" "}
                  {moment(appraisal.createdAt).format("LL")}
                </p>
                <div className="md:flex justify-end">
                  <p>
                    <span className="font-bold">Rate:</span>{" "}
                    {appraisal.overallRating}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {appraisal.comment ? (
                  <div className="flex gap-6 items-center bg-gray-100 p-5">
                    <span className="w-48 md:max-w-7">
                      <img src={likeIcon} alt="" />
                    </span>
                    <p>{appraisal.comment}</p>
                  </div>
                ) : null}

                {appraisal.improveComment ? (
                  <div className="flex gap-6 items-center bg-gray-100 p-5">
                    <span className="w-48 md:max-w-7">
                      <img src={dislikeIcon} alt="" />
                    </span>

                    <p>{appraisal.improveComment}</p>
                  </div>
                ) : null}
              </div>
            </div>
          ))
        ) : (
          <p>No appraisals found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {currentAppraisals && currentAppraisals.length > 0 ? (
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-l-lg disabled:bg-gray-300"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

AppraisalBox.propTypes = {
  appraisals: PropTypes.array.isRequired,
};

export default AppraisalBox;
