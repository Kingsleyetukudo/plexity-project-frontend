/* eslint-disable react/prop-types */
import { useState } from "react";

const StaffBiodataForm = ({ onSubmit }) => {
  // Initial form state.
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    address: "",
    stateOfOrigin: "",
    bankName: "",
    accountNumber: "",
    department: "",
    position: "",
    employmentYear: "",
    hasDisability: false,
    disabilityType: "",
  });

  // State to store error messages for each field.
  const [errors, setErrors] = useState({});

  // Update form state on each change.
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Validation function to ensure all required fields are filled.
  const validate = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
    if (!formData.dob.trim()) newErrors.dob = "Date of Birth is required";
    if (!formData.gender.trim()) newErrors.gender = "Gender is required";
    if (!formData.maritalStatus.trim())
      newErrors.maritalStatus = "Marital Status is required";
    if (!formData.address.trim())
      newErrors.address = "Home Address is required";
    if (!formData.stateOfOrigin.trim())
      newErrors.stateOfOrigin = "State of Origin is required";
    if (!formData.bankName.trim()) newErrors.bankName = "Bank Name is required";
    if (!formData.accountNumber.trim())
      newErrors.accountNumber = "Account Number is required";
    if (!formData.department.trim())
      newErrors.department = "Department is required";
    if (!formData.position.trim()) newErrors.position = "Position is required";
    if (!formData.employmentYear.trim())
      newErrors.employmentYear = "Year of Employment is required";

    // If the user indicates a disability, the type must be specified.
    if (formData.hasDisability && !formData.disabilityType.trim()) {
      newErrors.disabilityType = "Disability Type is required";
    }

    return newErrors;
  };

  // Handle form submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    // If there are any errors, update the errors state and do not submit.
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and submit the form data.
    setErrors({});
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Staff Biodata Form
      </h2>

      {/* Full Name Field */}
      <div className="mb-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.fullName && (
          <p className="text-red-500 text-xs italic mt-1">{errors.fullName}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.email && (
          <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone Number Field */}
      <div className="mb-4">
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.phone && (
          <p className="text-red-500 text-xs italic mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Date of Birth Field */}
      <div className="mb-4">
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.dob && (
          <p className="text-red-500 text-xs italic mt-1">{errors.dob}</p>
        )}
      </div>

      {/* Gender Field */}
      <div className="mb-4">
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-xs italic mt-1">{errors.gender}</p>
        )}
      </div>

      {/* Marital Status Field */}
      <div className="mb-4">
        <select
          name="maritalStatus"
          value={formData.maritalStatus}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="">Marital Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
        </select>
        {errors.maritalStatus && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors.maritalStatus}
          </p>
        )}
      </div>

      {/* Home Address Field */}
      <div className="mb-4">
        <input
          type="text"
          name="address"
          placeholder="Home Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.address && (
          <p className="text-red-500 text-xs italic mt-1">{errors.address}</p>
        )}
      </div>

      {/* State of Origin Field */}
      <div className="mb-4">
        <input
          type="text"
          name="stateOfOrigin"
          placeholder="State of Origin"
          value={formData.stateOfOrigin}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.stateOfOrigin && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors.stateOfOrigin}
          </p>
        )}
      </div>

      {/* Bank Name Field */}
      <div className="mb-4">
        <input
          type="text"
          name="bankName"
          placeholder="Bank Name"
          value={formData.bankName}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.bankName && (
          <p className="text-red-500 text-xs italic mt-1">{errors.bankName}</p>
        )}
      </div>

      {/* Account Number Field */}
      <div className="mb-4">
        <input
          type="text"
          name="accountNumber"
          placeholder="Account Number"
          value={formData.accountNumber}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.accountNumber && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors.accountNumber}
          </p>
        )}
      </div>

      {/* Department Field */}
      <div className="mb-4">
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.department && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors.department}
          </p>
        )}
      </div>

      {/* Position Field */}
      <div className="mb-4">
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={formData.position}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.position && (
          <p className="text-red-500 text-xs italic mt-1">{errors.position}</p>
        )}
      </div>

      {/* Year of Employment Field */}
      <div className="mb-4">
        <input
          type="text"
          name="employmentYear"
          placeholder="Year of Employment"
          value={formData.employmentYear}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.employmentYear && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors.employmentYear}
          </p>
        )}
      </div>

      {/* Disability Checkbox */}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          name="hasDisability"
          checked={formData.hasDisability}
          onChange={handleChange}
          className="mr-2"
        />
        <label className="text-gray-700">Do you have a disability?</label>
      </div>

      {/* Disability Type Field (conditionally rendered) */}
      {formData.hasDisability && (
        <div className="mb-4">
          <input
            type="text"
            name="disabilityType"
            placeholder="Type of Disability"
            value={formData.disabilityType}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errors.disabilityType && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.disabilityType}
            </p>
          )}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        Submit Biodata
      </button>
    </form>
  );
};

export default StaffBiodataForm;
