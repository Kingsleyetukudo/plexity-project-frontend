// import { useDispatch } from "react-redux";
// import { openPopup } from "../stores/userStateStore";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
// import { useState } from "react";
const EmployeePositionBox = ({ closePopupNote }) => {
  // const dispatch = useDispatch();

  const [department, setDepartment] = useState();
  const closePopup = () => {
    // dispatch(openPopup());
    closePopupNote();
  };
  return (
    <>
      <div
        className="fixed space-y-5 text-center w-[300px] md:min-w-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white shadow-md rounded-lg z-50"
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="flex justify-end">
          <X onClick={closePopup} />
        </div>
        {/* <h2 id="modal-title" className="font-bold">
          Change
        </h2> */}
        <p id="modal-description">
          You can assign new position and department to this user
        </p>
        <div className="grid grid-cols-1 gap-10">
          <div className="form-group text-left relative w-full">
            <h2 className="font-bold">Select Department</h2>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2  border-gray-300 outline-none text-input"
            >
              <option value="" disabled>
                Select your department
              </option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div className="form-group text-left relative w-full">
            <h2 className="font-bold">Select Position</h2>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2  border-gray-300 outline-none text-input"
            >
              <option value="" disabled>
                Select your position
              </option>
              <option value="Engineering">Management</option>
              <option value="Marketing">Founder</option>
              <option value="Sales">Admin</option>
              <option value="Sales">Min-Admin</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mt-6"></div>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
        onClick={closePopup}
      />
    </>
  );
};

EmployeePositionBox.propTypes = {
  note: PropTypes.string.isRequired,
  closePopupNote: PropTypes.func.isRequired,
};

export default EmployeePositionBox;
