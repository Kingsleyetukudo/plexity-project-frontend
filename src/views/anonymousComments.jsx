import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../stores/commentStore";
import TitleBar from "../components/titleBar";
import CommentBox from "../components/commentbox";
import UserCommentListAnonymous from "../components/userCommentListAnonymous";

const AnonymousComments = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [title] = useState("Comments");
  const { comments } = useSelector((state) => state.comment);

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  useEffect(() => {
    if (comments) {
      setIsLoading(false);
    }
  }, [comments]);

  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="grid gap-8">
        <div className="flex justify-between items-center md:mt-5">
          <TitleBar title={title} />
        </div>
      </div>

      {showPopup && (
        <CommentBox closeCommentPopup={() => setShowPopup(false)} />
      )}

      {isLoading ? (
        <p>Loading comments...</p>
      ) : (
        <>
          <UserCommentListAnonymous />
        </>
      )}
    </div>
  );
};

export default AnonymousComments;
