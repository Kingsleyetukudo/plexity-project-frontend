import { useState } from "react";
import { useDispatch } from "react-redux";
import { createDepartment, getAllDepartments } from "../stores/departmentStore";
import PopUpBox from "./popupBox";
import PropTypes from "prop-types";
import { X } from "lucide-react";

const AddDepartmentBox = ({ closeDepartment }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [openSuccessBox, setOpenSuccessBox] = useState(false);

  const dispatch = useDispatch();

  // const handleUserSelect = (user) => {
  //   setSelectedUser(user);
  //   console.log("Selected User:", user);
  // };

  const handleAddAppraisal = async () => {
    if (!title) {
      setError("Please enter a department name.");
      return;
    }
    // if (!questionOne) {
    //   setError("Please enter a comment.");
    //   return;
    // }

    const newAddAppraisal = await dispatch(createDepartment(title));
    console.log(newAddAppraisal);
    if (newAddAppraisal.meta.requestStatus === "fulfilled") {
      setMessage("Department added successfully.");
      setOpenSuccessBox(true);

      // Delay closing popup so success message is visible
      setTimeout(() => {
        setOpenSuccessBox(false);
        closeDepartment(); // Close after success message is shown
        setTitle("");
        dispatch(getAllDepartments());
      }, 3000); // 2 seconds delay
    } else {
      setMessage("Department not added...");
    }
  };

  const closePopup = () => {
    closeDepartment();
    setTitle("");
  };

  return (
    <>
      <div>
        {/* Comment Popup */}
        <div
          className="fixed space-y-5 w-[350px] md:min-w-[550px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white shadow-md rounded-lg z-50"
          role="dialog"
        >
          <div className="flex items-center justify-end">
            <X onClick={closePopup} className="cursor-pointer" />
          </div>
          <h2 className="text-xl font-bold">Add New Department </h2>

          <input
            placeholder="Enter Department..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2  border rounded-md resize-none"
          />

          {error && <p className="text-red-600">{error}</p>}
          <div className="flex justify-end">
            <button
              onClick={handleAddAppraisal}
              className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </div>
        {/* Background overlay */}
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
          onClick={closePopup}
        />
      </div>

      {/* Success Message Popup */}
      {openSuccessBox && <PopUpBox note={message} />}
    </>
  );
};

AddDepartmentBox.propTypes = {
  closeDepartment: PropTypes.func.isRequired,
};

export default AddDepartmentBox;
