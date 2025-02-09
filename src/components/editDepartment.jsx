import { X } from "lucide-react";
import PropTypes from "prop-types";
// import { useState, useEffect } from "react";

const EditDepartment = ({
  name,
  setName,
  toggleEditComment,
  updateComment,
}) => {
  // Create a local state for comment to modify it
  //   const [localComment, setLocalComment] = useState(comment);

  // Update localComment when the prop `comment` changes
  //   useEffect(() => {
  //     setLocalComment(comment);
  //   }, [comment]);

  const closePopup = () => {
    toggleEditComment();
  };

  const handleUpdate = () => {
    // Update the parent component's comment using the updateComment function
    console.log("comment updated:", name);
    updateComment(name);
    toggleEditComment(); // Close the popup after updating
  };

  return (
    <>
      <div
        className="fixed space-y-5 w-[300px] md:min-w-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white shadow-md rounded-lg z-50"
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="flex justify-end">
          <X onClick={closePopup} />
        </div>
        <p className="font-bold p-3">Edit department</p>
        <input
          placeholder="Edit your comment"
          value={name} // Bind to local state
          onChange={(e) => setName(e.target.value)} // Update local state
          className="w-full p-2.5  mb-2.5 border-[1px solid #ddd] rounded-md resize-none"
        />
        <div className="flex justify-end">
          <button
            onClick={handleUpdate} // Trigger the update when clicked
            className="md:text-xl font-semibold md:font-bold px-4 py-2 md:px-8 md:py-3 text-white bg-color-2 rounded-full hover:bg-color-1 focus:outline-none focus:ring-2 focus:ring-color-1"
          >
            Update
          </button>
        </div>
      </div>

      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
        onClick={closePopup}
      />
    </>
  );
};

EditDepartment.propTypes = {
  name: PropTypes.string.isRequired, // comment prop is required and should be a string
  setName: PropTypes.func.isRequired, // setComment is a function to update the comment state
  toggleEditComment: PropTypes.func.isRequired, // toggleEditComment to close the popup
  updateComment: PropTypes.func.isRequired, // updateComment to update the comment in the parent
};

export default EditDepartment;
