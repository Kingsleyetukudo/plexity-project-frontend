import likeIcon from "../assets/images/like-icon.svg";
import dislikeIcon from "../assets/images/commentImprove.svg";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getAppraisalByUser } from "../stores/staffAppraisalStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AppraisalBox = () => {
  const dispatch = useDispatch();
  const { appraisalByUser } = useSelector((state) => state.staffAppraisal);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAppraisalByUser(user._id));
    console.log(appraisalByUser);
  }, [dispatch, user]);

  const handleRoute = (id) => {
    navigate(`/dashboard/appraisal/${id}`);
  };

  return (
    <>
      <div className="grid gap-6">
        {appraisalByUser && appraisalByUser.length > 0 ? (
          appraisalByUser.map((appraisal, index) => (
            <div
              key={index}
              onClick={() => handleRoute(appraisal._id)}
              className="grid gap-2 bg-slate-200 shadow-lg cursor-pointer"
            >
              <div className="grid  md:grid-cols-2 md:p-4">
                <p>
                  <span className="font-bold">Reviewed:</span>{" "}
                  {moment(appraisal.date).format("LL")}
                </p>
                <div className="md:flex justify-end">
                  <p>
                    <span className="font-bold">Rate:</span>{" "}
                    {appraisal.overallRating}
                  </p>
                  {/* <p className=" ">
                    <span className="font-bold text-base">
                      Total Question Answered:
                    </span>{" "}
                    100
                  </p> */}
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
    </>
  );
};

export default AppraisalBox;
