import { useState } from "react";
import PropTypes from "prop-types";
import EditCommentBox from "./editCommentBox";
import { EllipsisVertical, Trash2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateComment as updateCommentAction,
  deleteCommentById,
} from "../stores/commentStore";
import DeleteCommentBox from "./deleteCommentBox";
import moment from "moment";
import DOMPurify from "dompurify"; // Import DOMPurify for sanitization

const UserCommentList = ({ comments }) => {
  const [openOption, setOpenOption] = useState(null);
  const [editCommentId, setEditCommentId] = useState(null);
  const [deleteCommentId, setDeleteCommentId] = useState(null);
  const [commentList, setCommentList] = useState(comments);
  const { user } = useSelector((state) => state.auth);
  const [localComment, setLocalComment] = useState("");
  const [popupContent, setPopupContent] = useState(""); // For full comment in the popup
  const [showPopup, setShowPopup] = useState(false); // Control the popup visibility
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [commentsPerPage] = useState(8); // Number of comments per page (adjust as needed)

  const dispatch = useDispatch();

  const toggleOpenOption = (commentId) => {
    setOpenOption(openOption === commentId ? null : commentId);
  };

  // const openEditComment = (commentId) => {
  //   const commentToEdit = commentList.find((c) => c._id === commentId);
  //   if (!commentToEdit) return;
  //   setLocalComment(commentToEdit.comment);
  //   setEditCommentId(commentId);
  // };

  const openDeleteComment = (commentId) => {
    setDeleteCommentId(commentId);
    const commentToDelete = commentList.find((c) => c._id === commentId);
    if (commentToDelete) {
      setLocalComment(commentToDelete.comment);
    }
  };

  const updateComment = (commentId, newComment) => {
    setCommentList((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId
          ? { ...comment, comment: newComment }
          : comment
      )
    );

    dispatch(updateCommentAction({ id: commentId, comment: newComment }));
    setEditCommentId(null);
  };

  const deleteComment = async (commentId) => {
    dispatch(deleteCommentById(commentId));
    setCommentList((prevComments) =>
      prevComments.filter((comment) => comment._id !== commentId)
    );
    setDeleteCommentId(null);
  };

  // Function to handle the "Read more" action
  const openFullComment = (comment) => {
    setPopupContent(comment.comment); // Set full comment content for popup
    setShowPopup(true); // Show the popup
  };

  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false);
    setPopupContent(""); // Clear the popup content
  };

  // Function to get the first 50 words of the comment
  const getPreviewText = (text) => {
    const words = text.split(" ");
    if (words.length > 50) {
      return words.slice(0, 50).join(" ") + "...";
    }
    return text;
  };

  // Pagination logic: Get the slice of comments for the current page
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = commentList.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the total number of pages
  const totalPages = Math.ceil(commentList.length / commentsPerPage);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
        {Array.isArray(currentComments) && currentComments.length > 0 ? (
          currentComments.map((comment) => (
            <div
              key={comment._id}
              className="shadow-lg p-5 rounded-xl flex flex-col gap-4 bg-white"
            >
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold">
                  For: {comment.recipient.firstName}{" "}
                  {comment.recipient.lastName}
                </p>
                <div className="flex gap-5 items-center">
                  <p className="text-sm font-semibold">
                    Date: {moment(comment.createdAt).format("ll")}
                  </p>
                  {user.role === "admin" && (
                    <span className="bg-gray-200 rounded-full p-1 cursor-pointer relative">
                      <EllipsisVertical
                        className="w-5"
                        onClick={() => toggleOpenOption(comment._id)}
                      />
                      {openOption === comment._id && (
                        <div className="absolute right-0 top-10 bg-white shadow-md rounded-lg flex flex-col gap-1">
                          {/* <p
                          onClick={() => openEditComment(comment._id)}
                          className="hover:bg-gray-200 px-2 flex items-center gap-1 text-sm cursor-pointer"
                        >
                          <Pencil className="w-3" /> Edit
                        </p> */}

                          <p
                            onClick={() => openDeleteComment(comment._id)}
                            className="hover:bg-gray-200 px-2 flex items-center gap-1 text-sm cursor-pointer"
                          >
                            <Trash2 className="w-3" /> Delete
                          </p>
                        </div>
                      )}
                    </span>
                  )}
                </div>
              </div>
              <hr />
              <div>
                {editCommentId === comment._id ? (
                  <EditCommentBox
                    comment={localComment}
                    setComment={setLocalComment}
                    toggleEditComment={() => setEditCommentId(null)}
                    updateComment={(newComment) =>
                      updateComment(comment._id, newComment)
                    }
                  />
                ) : (
                  <div
                    className={`prose max-w-none overflow-hidden transition-all duration-300`}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        getPreviewText(comment.comment),
                        {
                          ALLOWED_TAGS: [
                            "p",
                            "b",
                            "i",
                            "h1",
                            "u",
                            "strong",
                            "em",
                            "ul",
                            "ol",
                            "li",
                            "br",
                          ],
                          ALLOWED_ATTR: [],
                        }
                      ),
                    }}
                  />
                )}
                <button
                  onClick={() => openFullComment(comment)}
                  className="text-blue-500 font-medium mt-2"
                >
                  {comment.comment.split(" ").length > 50 ? "Read more" : ""}
                </button>
              </div>

              {/* Delete Confirmation Popup */}
              {deleteCommentId === comment._id && (
                <DeleteCommentBox
                  comment={localComment}
                  setComment={setLocalComment}
                  toggleDeleteComment={() => setDeleteCommentId(null)}
                  deleteComment={() => deleteComment(comment._id)}
                />
              )}
            </div>
          ))
        ) : (
          <p>No comments found.</p>
        )}
      </div>

      {/* Fixed Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-l-lg disabled:bg-gray-300"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      {/* Full Comment Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Full Comment</h2>
              <X
                onClick={closePopup}
                className=" text-black font-medium cursor-pointer"
              />
            </div>
            <p className="mt-4">{popupContent}</p>
          </div>
        </div>
      )}
    </div>
  );
};

UserCommentList.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default UserCommentList;
