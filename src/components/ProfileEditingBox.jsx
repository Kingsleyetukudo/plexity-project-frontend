import { X } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllDepartments } from "../stores/departmentStore";
import { getAllPositions } from "../stores/positionStore";
import { useDispatch } from "react-redux";

const ProfileEditingBox = ({ closePopupNote, employeeDetails, onUpdate }) => {
  // Get departments and positions from Redux store
  const { departments } = useSelector((state) => state.department);
  const { positions } = useSelector((state) => state.position);

  const dispatch = useDispatch();
  //   const roles = ["Admin", "Sub-Admin", "Mgt"];

  // State for selected department & position
  const [department, setDepartment] = useState(
    employeeDetails.department || ""
  );
  const [firstName, setFirstName] = useState(employeeDetails.firstName || "");
  const [lastName, setLastName] = useState(employeeDetails.lastName || "");
  const [phone, setPhone] = useState(employeeDetails.phone || "");
  const [location, setLocation] = useState(employeeDetails.stateOfOrigin || "");

  const [address, setAddress] = useState(employeeDetails.address || "");
  const [employmentYear, setEmploymentYear] = useState(
    employeeDetails.employmentYear || ""
  );
  const [maritalStatus, setMaritalStatus] = useState(
    employeeDetails.maritalStatus || ""
  );
  const [sex, setSex] = useState(employeeDetails.sex || "");
  const [dob, setDob] = useState(employeeDetails.dob || "");
  const [position, setPosition] = useState(employeeDetails.position || "");
  const [accountDetails, setAccountDetails] = useState({
    bankName: employeeDetails.accountDetails?.bankName || "",
    accountNumber: employeeDetails.accountDetails?.accountNumber || "",
    accountName: employeeDetails.accountDetails?.accountName || "",
  });

  const handleAccountDetailsChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    dispatch(getAllDepartments());
    dispatch(getAllPositions());
  }, []);

  // Function to handle updates
  const handleUpdate = () => {
    console.log(employeeDetails._id);
    onUpdate(employeeDetails._id, {
      firstName,
      lastName,
      phone,
      location,
      address,
      dob,
      position,
      employmentYear,
      maritalStatus,
      department,
      sex,
      accountDetails,
    });
    closePopupNote();
  };

  return (
    <>
      <div
        className="fixed space-y-5 text-center w-[300px] md:min-w-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white shadow-md rounded-lg z-50 overflow-scroll"
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="flex justify-end">
          <X onClick={closePopupNote} className="cursor-pointer" />
        </div>
        <p id="modal-description">Update your details</p>

        <div className="grid grid-cols-1 gap-5 overflow-auto max-h-[400px]">
          <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
            <div className="form-group text-left relative">
              <h2 className="font-bold">First Name</h2>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 outline-none text-input"
              />
            </div>
            <div className="form-group text-left relative">
              <h2 className="font-bold">Last Name</h2>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 outline-none text-input"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
            <div className="form-group text-left relative">
              <h2 className="font-bold">Date of Birth</h2>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 outline-none text-input"
              />
            </div>
            <div className="form-group text-left relative">
              <h2 className="font-bold">Year of Employment</h2>
              <input
                type="text"
                value={employmentYear}
                onChange={(e) => setEmploymentYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 outline-none text-input"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
            <div className="form-group text-left relative">
              <h2 className="font-bold">Sex</h2>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 outline-none text-input"
              >
                <option value="" disabled>
                  Select a Sex
                </option>

                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
            <div className="form-group text-left relative">
              <h2 className="font-bold">Marital Status</h2>
              <input
                type="text"
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 outline-none text-input"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
            <div className="form-group text-left relative">
              <h2 className="font-bold">Phone Number</h2>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 outline-none text-input"
              />
            </div>
            <div className="form-group text-left relative">
              <h2 className="font-bold">Location</h2>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 outline-none text-input"
              />
            </div>
          </div>

          <div className="form-group text-left relative">
            <h2 className="font-bold">Address</h2>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 outline-none text-input"
            />
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
          <div className="form-group text-left relative w-full">
            <h2 className="font-bold">Select Department</h2>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 outline-none text-input"
            >
              <option value="" disabled>
                Select a Department
              </option>
              {departments.map((pos) => (
                <option key={pos.id} value={pos.name}>
                  {pos.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
            <div className="form-group text-left relative">
              <h2 className="font-bold">Bank Name</h2>
              <input
                type="text"
                name="bankName"
                value={accountDetails.bankName}
                onChange={handleAccountDetailsChange}
                className="w-full px-3 py-2 border border-gray-300 outline-none text-input"
              />
            </div>
            <div className="form-group text-left relative">
              <h2 className="font-bold">Account Name</h2>
              <input
                type="text"
                value={accountDetails.accountName}
                name="accountName"
                onChange={handleAccountDetailsChange}
                className="w-full px-3 py-2 border border-gray-300 outline-none text-input"
              />
            </div>
            <div className="form-group text-left relative">
              <h2 className="font-bold">Account Number</h2>
              <input
                type="number"
                value={accountDetails.accountNumber}
                name="accountNumber"
                onChange={handleAccountDetailsChange}
                className="w-full px-3 py-2 border border-gray-300 outline-none text-input"
              />
            </div>
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

ProfileEditingBox.propTypes = {
  employeeDetails: PropTypes.object.isRequired,
  closePopupNote: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ProfileEditingBox;
