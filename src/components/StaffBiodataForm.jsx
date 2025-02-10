/* eslint-disable react/prop-types */
import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { X } from "lucide-react";

const StaffBiodataForm = ({ onSubmit }) => {
  const { user } = useSelector((state) => state.auth);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    dob: user?.dob || "",
    gender: user?.gender || "",
    maritalStatus: user?.maritalStatus || "",
    address: user?.address || "",
    stateOfOrigin: user?.stateOfOrigin || "",
    department: user?.department || "",
    position: user?.position || "",
    employmentYear: user?.employmentYear || "",
    profileCompleted: true,
    hasDisability: user?.hasDisability || false,
    disabilityType: user?.disabilityType || "",
    accountDetails: {
      bankName: user?.accountDetails?.bankName || "",
      accountName: user?.accountDetails?.accountName || "",
      accountNumber: user?.accountDetails?.accountNumber || "",
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name in formData.accountDetails) {
      setFormData({
        ...formData,
        accountDetails: {
          ...formData.accountDetails,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData, user._id);

    onSubmit(formData);
  };

  const isFieldDisabled = (field) => {
    return formData[field] !== "";
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
          <X />
        </div>

        <div
          className="fixed space-y-5 text-center w-[300px] md:min-w-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white shadow-md rounded-lg z-50"
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Staff Biodata Form
          </h2>
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
          >
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <>
                <div className="flex gap-5">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={isFieldDisabled("firstName")}
                    required
                    className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={isFieldDisabled("lastName")}
                    required
                    className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  required
                  className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                >
                  <option value="" disabled>
                    Marital Status
                  </option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
                <input
                  type="text"
                  name="address"
                  placeholder="Home Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="text"
                  name="stateOfOrigin"
                  placeholder="State of Origin"
                  value={formData.stateOfOrigin}
                  onChange={handleChange}
                  required
                  className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Next
                </button>
              </>
            )}

            {/* Step 2: Employment Details */}
            {step === 2 && (
              <>
                <input
                  type="text"
                  name="department"
                  placeholder="Department"
                  value={formData.department}
                  onChange={handleChange}
                  disabled={isFieldDisabled("department")}
                  required
                  className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="text"
                  name="position"
                  placeholder="Position"
                  value={formData.position}
                  onChange={handleChange}
                  disabled={isFieldDisabled("position")}
                  required
                  className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="text"
                  name="employmentYear"
                  placeholder="Year of Employment"
                  value={formData.employmentYear}
                  onChange={handleChange}
                  required
                  className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                />
                <div className="mb-4 flex items-center">
                  <label className="text-gray-700">
                    <input
                      type="checkbox"
                      name="hasDisability"
                      checked={formData.hasDisability}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Do you have a disability?
                  </label>
                </div>
                {formData.hasDisability && (
                  <input
                    type="text"
                    name="disabilityType"
                    placeholder="Type of Disability"
                    value={formData.disabilityType}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                  />
                )}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Bank Details & Submission */}
            {step === 3 && (
              <>
                <input
                  type="text"
                  name="bankName"
                  placeholder="Bank Name"
                  value={formData.accountDetails.bankName}
                  onChange={handleChange}
                  required
                  className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="text"
                  name="accountName"
                  placeholder="Account Name"
                  value={formData.accountDetails.accountName}
                  onChange={handleChange}
                  required
                  className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="text"
                  name="accountNumber"
                  placeholder="Account Number"
                  value={formData.accountDetails.accountNumber}
                  onChange={handleChange}
                  required
                  className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
      <div className="mt-6"></div>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40" />
    </>
  );
};

StaffBiodataForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.object, // Pass user data for pre-filled form
};

export default StaffBiodataForm;
