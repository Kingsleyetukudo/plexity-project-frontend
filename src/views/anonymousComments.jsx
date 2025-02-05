import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentsByCurrentUser } from "../stores/commentStore";

import UserCommentList from "../components/userCommentList";
import TitleBar from "../components/titleBar";
import CommentBox from "../components/commentbox";
import Dropdown from "../components/filterDropdown";

const AnonymousComments = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [title] = useState("My Comments");
  const { comments } = useSelector((state) => state.comment);
  const { user, users } = useSelector((state) => state.auth);
  const [filter, setFilter] = useState("All");
  const [loadedComments, setLoadedComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommentsByCurrentUser(user._id));
  }, [dispatch, user._id]);

  useEffect(() => {
    if (comments?.data?.comments) {
      setLoadedComments(comments.data.comments);
      setIsLoading(false);
    }
  }, [comments]);

  const handleOptionSelect = (selectedUserId) => {
    console.log("Selected User ID:", selectedUserId); // Debugging
    setFilter(selectedUserId);
  };

  const filteredComments = loadedComments.filter((comment) => {
    console.log("Comment recipient:", comment.recipient?._id); // Debugging
    return filter === "All" || comment.recipient?._id === filter;
  });

  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="grid gap-8">
        <div className="flex justify-between items-center md:my-5">
          <TitleBar title={title} />
          <Dropdown
            options={[{ _id: "All", name: "All" }, ...users]}
            onFilter={handleOptionSelect}
          />
        </div>
      </div>

      {showPopup && (
        <CommentBox closeCommentPopup={() => setShowPopup(false)} />
      )}

      {isLoading ? (
        <p>Loading comments...</p>
      ) : (
        <UserCommentList comments={filteredComments} />
      )}
    </div>
  );
};

export default AnonymousComments;
