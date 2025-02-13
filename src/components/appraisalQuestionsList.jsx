import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import EditApppraiseBox from "./editAppraisalBox";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAppraisal,
  updateAppraisal,
  deleteAppraisal,
} from "../stores/appraisalStore";
import DeleteApppraiseBox from "./deleteAppraisalBox";

const AppraisalQuestionsList = () => {
  const [openOption, setOpenOption] = useState(null);
  const [editapppraiseId, setEditapppraiseId] = useState(null);
  const [deleteapppraiseId, setDeleteapppraiseId] = useState(null);
  const { appraisals } = useSelector((state) => state.appraisal);
  const [localapppraise, setLocalapppraise] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllAppraisal()).finally(() => setLoading(false));
  }, [dispatch]);

  const toggleOpenOption = (apppraiseId) => {
    setOpenOption(openOption === apppraiseId ? null : apppraiseId);
  };

  const openEditapppraise = (apppraiseId) => {
    const apppraiseToEdit = appraisals.find((c) => c._id === apppraiseId);
    if (!apppraiseToEdit) {
      console.error("Appraise not found for ID:", apppraiseId);
      return;
    }
    setLocalapppraise(apppraiseToEdit.apppraise);
    setEditapppraiseId(apppraiseId);
  };

  const openDeleteapppraise = (apppraiseId) => {
    setDeleteapppraiseId(apppraiseId);
    const apppraiseToDelete = appraisals.find((c) => c._id === apppraiseId);
    if (apppraiseToDelete) {
      setLocalapppraise(apppraiseToDelete.apppraise);
    }
  };

  const updateapppraise = (apppraiseId, newapppraise) => {
    setOpenOption(null);
    setEditapppraiseId(null);
    // Dispatch the Redux action here
    console.log(apppraiseId, "and new", newapppraise);
    // dispatch(updateAppraisal({ apppraiseId, newapppraise }));
    dispatch(updateAppraisal({ id: apppraiseId, appraiseData: newapppraise }));
  };

  const deleteapppraise = (apppraiseId) => {
    setDeleteapppraiseId(null);
    setOpenOption(null);
    // Dispatch the Redux action here
    dispatch(deleteAppraisal(apppraiseId));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
      {loading ? (
        <p>Loading...</p>
      ) : appraisals.length > 0 ? (
        appraisals.map((apppraise) => (
          <div
            key={apppraise._id}
            className="shadow-[0px_0px_8px_0px_rgba(0,0,0,0.67)] p-5 rounded-xl flex flex-col gap-4"
          >
            <div className="flex justify-between items-center">
              <p className="text-base md:text-lg font-semibold">
                <span className="text-gray-600">Title:</span> {apppraise.title}
              </p>
              <div className="flex gap-5 items-center">
                <span className="bg-gray-200 rounded-full p-1 cursor-pointer relative">
                  <EllipsisVertical
                    className="w-5"
                    onClick={() => toggleOpenOption(apppraise._id)}
                    aria-label="Options"
                    aria-expanded={
                      openOption === apppraise._id ? "true" : "false"
                    }
                    aria-haspopup="true"
                  />
                  {openOption === apppraise._id && (
                    <div className="absolute right-0 top-10 bg-white shadow-md rounded-lg flex flex-col gap-1">
                      <p
                        onClick={() => openEditapppraise(apppraise._id)}
                        className="hover:bg-gray-200 px-2 flex items-center gap-1 text-sm cursor-pointer"
                      >
                        <Pencil className="w-3" /> Edit
                      </p>

                      <p
                        onClick={() => openDeleteapppraise(apppraise._id)}
                        className="hover:bg-gray-200 px-2 flex items-center gap-1 text-sm cursor-pointer"
                      >
                        <Trash2 className="w-3" /> Delete
                      </p>
                    </div>
                  )}
                </span>
              </div>
            </div>
            <hr />
            <div>
              {apppraise?.questions?.length > 0 ? (
                apppraise.questions.map((question, index) => (
                  <div key={index}>
                    <p className="first:pb-5 last:mb-0">
                      <span className="text-gray-600">Qust. {index + 1}: </span>
                      {question}
                    </p>
                  </div>
                ))
              ) : (
                <p>No questions available</p>
              )}
            </div>

            {editapppraiseId === apppraise._id && (
              <EditApppraiseBox
                apppraise={apppraise}
                setTitle={setLocalapppraise}
                questions={apppraise.questions || []} // Ensure questions is passed
                updateQuestion={(index, value) => {
                  const updatedQuestions = [...apppraise.questions];
                  updatedQuestions[index] = value;
                  setLocalapppraise({
                    ...apppraise,
                    questions: updatedQuestions,
                  });
                }}
                toggleEditApppraise={() => setEditapppraiseId(null)}
                updateApppraise={(id, newapppraise) =>
                  updateapppraise(apppraise._id, newapppraise)
                }
              />
            )}

            {deleteapppraiseId === apppraise._id && (
              <DeleteApppraiseBox
                text={"Appraisal"}
                apppraise={localapppraise}
                setapppraise={setLocalapppraise}
                toggleDeleteapppraise={() => setDeleteapppraiseId(null)}
                deleteapppraise={() => deleteapppraise(apppraise._id)}
              />
            )}
          </div>
        ))
      ) : (
        <p>No Appraisal Questions found.</p>
      )}
    </div>
  );
};

AppraisalQuestionsList.propTypes = {
  apppraises: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      recipient: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default AppraisalQuestionsList;
