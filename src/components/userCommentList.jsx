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
import DOMPurify from "dompurify"; // Import DOMPurify for sanitization

const UserCommentList = ({ comments }) => {
  const [expandedComments, setExpandedComments] = useState({});
  const [openOption, setOpenOption] = useState(null);
  const [editCommentId, setEditCommentId] = useState(null);
  const [deleteCommentId, setDeleteCommentId] = useState(null);
  const [commentList, setCommentList] = useState(comments);
  const [localComment, setLocalComment] = useState("");
  const dispatch = useDispatch();

  const toggleExpanded = (id) => {
    setExpandedComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleOpenOption = (commentId) => {
    setOpenOption(openOption === commentId ? null : commentId);
  };

  const openEditComment = (commentId) => {
    const commentToEdit = commentList.find((c) => c._id === commentId);
    if (!commentToEdit) return;
    setLocalComment(commentToEdit.comment);
    setEditCommentId(commentId);
  };

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {commentList.length > 0 ? (
        commentList.map((comment) => (
          <div
            key={comment._id}
            className="shadow-lg p-5 rounded-xl flex flex-col gap-4 bg-white"
          >
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold">
                For: {comment.recipient.firstName} {comment.recipient.lastName}
              </p>
              <div className="flex gap-5 items-center">
                <p className="text-sm font-semibold">
                  Date: {moment(comment.createdAt).format("ll")}
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
                <div
                  className={`prose max-w-none overflow-hidden transition-all duration-300 ${
                    expandedComments[comment._id]
                      ? "max-h-[500px]"
                      : "max-h-[60px]"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(comment.comment, {
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
                    }),
                  }}
                />
              )}
              <button
                onClick={() => toggleExpanded(comment._id)}
                className="text-blue-500 font-medium mt-2"
              >
                {expandedComments[comment._id] ? "Show less" : "Read more"}
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
        lastName: PropTypes.string.isRequired,
      }).isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default UserCommentList;
