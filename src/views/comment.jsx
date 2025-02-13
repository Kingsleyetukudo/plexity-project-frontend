import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentsByCurrentUser } from "../stores/commentStore";

import UserCommentList from "../components/userCommentList";
import TitleBar from "../components/titleBar";
import CommentBox from "../components/commentbox";

const Comment = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [title] = useState("My Comments");
  const { userComments } = useSelector((state) => state.comment);
  const { user } = useSelector((state) => state.auth);
  // const [loadedComments, setLoadedComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const dispatch = useDispatch();

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    dispatch(fetchCommentsByCurrentUser(user._id));
    // console.log(userComments);
  }, [dispatch, user._id]);

  useEffect(() => {
    if (userComments) {
      // setLoadedComments(userComments);
      // console.log(userComments);
      setIsLoading(false); // Set loading to false when data is available
    }
  }, [userComments]);

  const handleAppraisal = () => {
    setShowPopup(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-8">
        <div className="grid gap-8">
          <div className="flex justify-between items-center md:my-5">
            <TitleBar title={title} />
            <div>
              <button
                onClick={handleAppraisal}
                className="md:text-base font-normal px-4 py-1 md:px-5 md:py-3 text-white bg-color-2 rounded-full hover:bg-color-1 focus:outline-none focus:ring-2 focus:ring-color-1"
              >
                Send Comment
              </button>
            </div>
          </div>
        </div>

        {showPopup && (
          <>
            <CommentBox closeCommentPopup={closePopup} />
          </>
        )}

        {isLoading ? <p>Loading comments...</p> : <UserCommentList />}
      </div>
    </>
  );
};

export default Comment;
