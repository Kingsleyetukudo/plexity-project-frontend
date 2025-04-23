import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAppraisalById } from "../stores/staffAppraisalStore";
import moment from "moment";
import { Star } from "lucide-react";
// import Star from "../assets/images/star-rating.svg";

const AppraisalDetailsAdmin = () => {
  const { id } = useParams();
  const [appraisal, setAppraisal] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppraisalById(id)).then((data) => {
      setAppraisal(data.payload.appraisal);
    });
  }, [id, dispatch]);

  // Function to render star ratings
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    // const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {Array.from({ length: fullStars }, (_, i) => (
          //   <FaStar key={`full-${i}`} className="text-yellow-400" />
          // <img src={Star} alt="" key={`full-${i}`} className="w-5" />
          <Star key={`full-${i}`} className="text-color-2" />
        ))}
        {hasHalfStar && <Star />}
        {/* {Array.from({ length: emptyStars }, (_, i) => (
          //   <FaRegStar key={`empty-${i}`} className="text-yellow-400" />
          <img src={Star} alt="" key={`empty-${i}`} className="w-5" />
        ))} */}
      </>
    );
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-5">
        <h2 className="font-extrabold text-xl md:text-2xl mb-5 text-gray-500">
          Appraisal Details of{" "}
          {appraisal?.appraisedEmployee
            ? `${appraisal?.appraisedEmployee?.firstName} ${appraisal?.appraisedEmployee?.lastName}`
            : "Null"}
        </h2>
        <div className="grid grid-cols-1 gap-5">
          <div className="flex justify-between w-full bg-gray-800 text-white px-4 md:px-8 py-4 shadow-lg rounded-xl">
            <p className="text-lg">
              <span className="font-bold">Reviewed:</span>{" "}
              {moment(appraisal?.date).format("LL")}
            </p>
            <p className="text-lg flex items-center">
              <span className="font-bold mr-2">By:</span>{" "}
              {appraisal?.appraisedBy?.firstName}{" "}
              {appraisal?.appraisedBy?.lastName}
            </p>
            <p className="text-lg flex items-center">
              <span className="font-bold mr-2">Rating:</span>{" "}
              {appraisal?.overallRating}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {appraisal.appraisal &&
              appraisal.appraisal.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-100 px-4 md:px-8 py-4 shadow-md rounded-xl"
                >
                  <h2 className="text-lg font-bold mb-4 text-color-1">
                    {index + 1}. {item.title}
                  </h2>
                  <div>
                    {item.questions &&
                      item.questions.map((question, idx) => (
                        <div
                          key={idx}
                          className="mb-4 border-b border-gray-300 last:border-0 pb-4"
                        >
                          <p className="text-lg pl-5">
                            {idx + 1}. {question.question}
                          </p>
                          <p className="flex items-center pl-5 pt-2 gap-1">
                            {renderStars(question.rating)}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>

          <div className="bg-gray-800 px-8 py-4 text-lg text-white shadow-md rounded-md">
            <p>
              <span className="font-bold">Comment:</span>{" "}
              {appraisal.comment || "No comment provided."}
            </p>
          </div>

          <div className="bg-gray-950 px-8 py-4 text-lg text-white shadow-md rounded-md">
            <p>
              <span className="font-bold">Improve Comment:</span>{" "}
              {appraisal.improveComment || "No improvement comment provided."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppraisalDetailsAdmin;
