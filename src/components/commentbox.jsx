import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addComment } from "../stores/commentStore";
import PopUpBox from "./popupBox";
import PropTypes from "prop-types";
import { X } from "lucide-react";
import { fetchCommentsByCurrentUser } from "../stores/commentStore";
import ReactQuill from "react-quill"; // Importing react-quill
import "react-quill/dist/quill.snow.css"; // Importing default styles

const CommentBox = ({ closeCommentPopup }) => {
  const [comment, setComment] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const { user, users } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [openSuccessBox, setOpenSuccessBox] = useState(false);

  const dispatch = useDispatch();

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    console.log("Selected User:", user);
  };

  const handleSubmitComment = async () => {
    if (!comment) {
      setError("Please enter a comment.");
      return;
    }

    const newComment = {
      comment,
      sender: user._id,
      recipient: selectedUser._id,
    };
    console.log(comment);

    const commentNew = await dispatch(addComment(newComment));
    if (commentNew.payload.status === "success") {
      setMessage("Comment submitted successfully.");
      setOpenSuccessBox(true);

      // Delay closing popup so success message is visible
      setTimeout(() => {
        setOpenSuccessBox(false);
        closeCommentPopup(); // Close after success message is shown
        setSelectedUser(null);
        setComment("");
        dispatch(fetchCommentsByCurrentUser(user._id));
      }, 2000); // 2 seconds delay
    } else {
      setMessage("Your comment was not submitted.");
    }
  };

  const closePopup = () => {
    setSelectedUser(null);
    setComment("");
  };

  return (
    <>
      {!selectedUser ? (
        <div>
          {/* User Selection Modal */}
          <div
            className="fixed space-y-5 w-[350px] md:min-w-[550px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white shadow-md rounded-lg z-50"
            role="dialog"
          >
            <div className="flex items-center justify-end">
              <X onClick={closeCommentPopup} className="cursor-pointer" />
            </div>
            <h2 className="text-xl font-bold mb-4">Select a Member</h2>
            <ul className="overflow-auto max-h-[300px]">
              {users.map((user) => (
                <li
                  key={user._id}
                  onClick={() => handleUserSelect(user)}
                  className="cursor-pointer p-3 border-b border-gray-300 hover:bg-gray-100 flex items-center justify-between"
                >
                  <p>
                    {user.firstName} {user.lastName}
                  </p>
                  <button className="text-sm px-2 py-1 text-white bg-blue-500 rounded-full hover:bg-blue-600">
                    Comment
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Background overlay */}
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
            onClick={closeCommentPopup}
          />
        </div>
      ) : (
        <div>
          {/* Comment Popup */}
          <div
            className="fixed space-y-5 w-[350px] md:min-w-[550px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white shadow-md rounded-lg z-50"
            role="dialog"
          >
            <div className="flex items-center justify-end">
              <X onClick={closePopup} className="cursor-pointer" />
            </div>
            <h2 className="text-xl font-bold">Anonymous Comment Section</h2>
            <p className="text-sm text-gray-600">
              Only the management team can read your comment.
            </p>
            {/* Using ReactQuill for rich-text editing */}
            <ReactQuill
              value={comment}
              onChange={setComment}
              placeholder="Write your comment..."
              className="w-full  border rounded-md"
            />
            {error && <p className="text-red-600">{error}</p>}
            <div className="flex justify-end">
              <button
                onClick={handleSubmitComment}
                className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </div>
          {/* Background overlay */}
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
            onClick={closePopup}
          />
        </div>
      )}

      {/* Success Message Popup */}
      {openSuccessBox && <PopUpBox note={message} />}
    </>
  );
};

CommentBox.propTypes = {
  closeCommentPopup: PropTypes.func.isRequired,
};

export default CommentBox;
