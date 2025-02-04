import { useState } from "react";
import PropTypes from "prop-types";
import EditCommentBox from "./editCommentBox";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  updateComment as updateCommentAction,
  deleteCommentById,
} from "../stores/commentStore";
import DeleteCommentBox from "./deleteCommentBox";
import moment from "moment";

const UserCommentList = ({ comments }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openOption, setOpenOption] = useState(null);
  const [editCommentId, setEditCommentId] = useState(null); // Store comment ID instead of index
  const [deleteCommentId, setDeleteCommentId] = useState(null); // Store comment ID instead of index
  const [commentList, setCommentList] = useState(comments);
  const [localComment, setLocalComment] = useState("");
  const dispatch = useDispatch();

  const shortComment = (commentText) =>
    commentText.split(" ").slice(0, 50).join(" ") + "...";

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const toggleOpenOption = (commentId) => {
    setOpenOption(openOption === commentId ? null : commentId);
  };

  const openEditComment = (commentId) => {
    const commentToEdit = commentList.find((c) => c._id === commentId);
    if (!commentToEdit) {
      console.error("Comment not found for ID:", commentId);
      return;
    }

    setLocalComment(commentToEdit.comment);
    setEditCommentId(commentId); // Store comment ID
  };

  const openDeleteComment = (commentId) => {
    setDeleteCommentId(commentId); // Store the comment ID to delete
    const commentToDelete = commentList.find((c) => c._id === commentId);
    if (commentToDelete) {
      setLocalComment(commentToDelete.comment);
    }
  };

  const updateComment = (commentId, newComment) => {
    console.log("Updating comment:", commentId, "with:", newComment);

    // Update local state
    setCommentList((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId
          ? { ...comment, comment: newComment }
          : comment
      )
    );

    // Update Redux store
    dispatch(updateCommentAction({ id: commentId, comment: newComment }));

    setEditCommentId(null);
  };

  const deleteComment = async (commentId) => {
    // Dispatch the delete action
    dispatch(deleteCommentById(commentId));

    // Remove the deleted comment from the local state
    setCommentList((prevComments) =>
      prevComments.filter((comment) => comment._id !== commentId)
    );
    setDeleteCommentId(null); // Close the delete confirmation box
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {commentList.length > 0 ? (
        commentList.map((comment) => (
          <div
            key={comment._id}
            className="shadow-[0px_0px_8px_0px_rgba(0,0,0,0.67)] p-5 rounded-xl flex flex-col gap-4"
          >
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold">
                For: {comment.recipient.firstName}
              </p>
              <div className="flex gap-5 items-center">
                <p className="text-sm font-semibold">
                  Date: {moment(comment.date).format("ll")}
                </p>
                <span className="bg-gray-200 rounded-full p-1 cursor-pointer relative">
                  <EllipsisVertical
                    className="w-5"
                    onClick={() => toggleOpenOption(comment._id)}
                  />
                  {openOption === comment._id && (
                    <div className="absolute right-0 top-10 bg-white shadow-md rounded-lg flex flex-col gap-1">
                      <p
                        onClick={() => openEditComment(comment._id)}
                        className="hover:bg-gray-200 px-2 flex items-center gap-1 text-sm cursor-pointer"
                      >
                        <Pencil className="w-3" /> Edit
                      </p>

                      <p
                        onClick={() => openDeleteComment(comment._id)}
                        className="hover:bg-gray-200 px-2 flex items-center gap-1 text-sm cursor-pointer"
                      >
                        <Trash2 className="w-3" /> Delete
                      </p>
                    </div>
                  )}
                </span>
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
                <p>
                  {isExpanded ? comment.comment : shortComment(comment.comment)}
                </p>
              )}
              <button
                onClick={toggleExpanded}
                className="text-blue-500 font-medium"
              >
                {isExpanded ? "Show less" : "Read more"}
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
  );
};

UserCommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
      recipient: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default UserCommentList;
