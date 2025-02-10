import { X } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";

const EmployeePositionBox = ({ closePopupNote, employeeDetails, onUpdate }) => {
  // Get departments and positions from Redux store
  const { departments } = useSelector((state) => state.department);
  const { positions } = useSelector((state) => state.position);

  // State for selected department & position
  const [department, setDepartment] = useState(
    employeeDetails.department || ""
  );
  const [position, setPosition] = useState(employeeDetails.position || "");

  // Function to handle updates
  const handleUpdate = () => {
    const pos = {
      department,
      position,
    };
    onUpdate({
      id: employeeDetails._id,
      pos,
    });
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
          <X onClick={closePopupNote} className="cursor-pointer" />
        </div>
        <p id="modal-description">
          You can assign a new position and department to this user
        </p>
        <div className="grid grid-cols-1 gap-5">
          {/* Select Department */}
          <div className="form-group text-left relative w-full">
            <h2 className="font-bold">Select Department</h2>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 outline-none text-input"
            >
              <option value="" disabled>
                Select a department
              </option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Select Position */}
          <div className="form-group text-left relative w-full">
            <h2 className="font-bold">Select Position</h2>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 outline-none text-input"
            >
              <option value="" disabled>
                Select a position
              </option>
              {positions.map((pos) => (
                <option key={pos.id} value={pos.name}>
                  {pos.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Update Button */}
        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      </div>

      {/* Background Overlay */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
        onClick={closePopupNote}
      />
    </>
  );
};

EmployeePositionBox.propTypes = {
  employeeDetails: PropTypes.object.isRequired,
  closePopupNote: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EmployeePositionBox;
