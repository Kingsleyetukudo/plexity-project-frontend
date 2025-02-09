import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDepartments } from "../stores/departmentStore";
import TitleBar from "../components/titleBar";
import AddDepartmentBox from "../components/createDeparment";
import DepartmentList from "../components/DepartmentList";

const Department = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [title] = useState("Departments");
  const { departments } = useSelector((state) => state.department);
  const [loadedComments, setLoadedComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const dispatch = useDispatch();

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    dispatch(getAllDepartments());
    setLoadedComments(departments?.data?.departments);
    setIsLoading(false);
    console.log(loadedComments);
  }, [dispatch, loadedComments]);

  // useEffect(() => {
  //   if (userComments?.data?.comments) {
  //     setLoadedComments(userComments.data.comments);
  //     console.log(userComments);
  //     setIsLoading(false); // Set loading to false when data is available
  //   }
  // }, [userComments]);

  const handleAppraisal = () => {
    setShowPopup(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-8">
        <div className="grid gap-8">
          <div className="flex justify-between items-center md:my-5">
            <TitleBar title={title} />
            <div>
              <button
                onClick={handleAppraisal}
                className="text-sm md:text-xl font-semibold md:font-bold px-4 py-2 md:px-8 md:py-3 text-white bg-color-2 rounded-full hover:bg-color-1 focus:outline-none focus:ring-2 focus:ring-color-1"
              >
                Add Department
              </button>
            </div>
          </div>
        </div>

        {showPopup && (
          <>
            <AddDepartmentBox closeDepartment={closePopup} />
          </>
        )}

        {isLoading ? (
          <p>Loading Deparments...</p>
        ) : (
          <DepartmentList departments={loadedComments} />
        )}
      </div>
    </>
  );
};

export default Department;
