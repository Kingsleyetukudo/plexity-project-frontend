import { X } from "lucide-react";
import PropTypes from "prop-types";

const DeleteCommentBox = ({
  commentId, // Pass the comment ID to delete
  deleteComment, // Function to handle deletion
  toggleDeleteComment, // Function to toggle the popup visibility
}) => {
  const closePopup = () => {
    toggleDeleteComment(); // Close the popup
  };

  const handleDelete = () => {
    deleteComment(commentId); // Call the delete function with the comment ID
    toggleDeleteComment(); // Close the popup after deletion
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
        <p className="font-bold p-3 text-center">
          Are you sure you want to delete this comment?
        </p>

        <div className="flex justify-center items-center gap-8">
          <button
            onClick={handleDelete} // Call handleDelete on Delete button click
            className="md:text-xl font-semibold md:font-bold px-4 py-2 md:px-8 md:py-3 text-white bg-color-2 rounded-full hover:bg-color-1 focus:outline-none focus:ring-2 focus:ring-color-1"
          >
            Delete
          </button>
          <button
            onClick={closePopup} // Close the popup when Cancel button is clicked
            className="md:text-xl font-semibold md:font-bold px-4 py-2 md:px-8 md:py-3 text-white bg-color-2 rounded-full hover:bg-color-1 focus:outline-none focus:ring-2 focus:ring-color-1"
          >
            Cancel
          </button>
        </div>
      </div>

      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
        onClick={closePopup} // Close popup when clicking outside
      />
    </>
  );
};

DeleteCommentBox.propTypes = {
  commentId: PropTypes.string.isRequired, // commentId is passed for deletion
  deleteComment: PropTypes.func.isRequired, // deleteComment function to trigger deletion
  toggleDeleteComment: PropTypes.func.isRequired, // Function to close the popup
};

export default DeleteCommentBox;
