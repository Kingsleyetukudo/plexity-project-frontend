import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCommentsByCurrentUser,
  fetchComments,
} from "../stores/commentStore";

import UserCommentList from "../components/userCommentList";
import TitleBar from "../components/titleBar";
import CommentBox from "../components/commentbox";
// import Dropdown from "../components/filterDropdown";
import FilterAnonymous from "../components/anonymousFilter";
import { Search } from "lucide-react";

const AnonymousComments = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [title] = useState("Comments");
  const { comments } = useSelector((state) => state.comment);
  const { user, users } = useSelector((state) => state.auth);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loadedComments, setLoadedComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments());
    dispatch(fetchCommentsByCurrentUser(user._id));
  }, [dispatch, user._id]);

  useEffect(() => {
    if (comments) {
      setLoadedComments(comments);
      setIsLoading(false);
    }
  }, [comments]);

  const handleOptionSelect = (selectedUserId) => {
    console.log("Selected User ID:", selectedUserId); // Debugging
    setFilter(selectedUserId);
  };

  // Filter & Search logic
  const filteredComments1 = (loadedComments || []).filter((user) => {
    const firstName = user.recipient?.firstName?.toLowerCase() || "";
    const lastName = user.recipient?.lastName?.toLowerCase() || "";

    const searchQuery = searchTerm ? searchTerm.toLowerCase() : "";

    return firstName.includes(searchQuery) || lastName.includes(searchQuery);
  });

  // Filtered by recipient _id
  const filteredComments = loadedComments.filter((comment) => {
    console.log("Filter ID:", filter);
    console.log("Comment Recipient ID:", comment.recipient?._id);
    return (
      filter === "All" ||
      (comment.recipient && comment.recipient._id === filter)
    );
  });

  // Sorting the filtered comments by most recent (createdAt)
  const sortedComments = filteredComments.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const finalFilteredComments =
    filteredComments1.length > 0 ? filteredComments1 : sortedComments;

  // Use `finalFilteredComments` for rendering the final sorted and filtered list

  console.log(filteredComments);

  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="grid gap-8">
        <div className="flex justify-between items-center md:mt-5">
          <TitleBar title={title} />
        </div>
        <div className="flex justify-between items-center">
          <span className=" md:w-[350px] flex items-center gap-2 bg-white shadow-md px-4 py-2 rounded-xl">
            <Search className="text-active-color" size="18px" />
            <input
              type="text"
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-brandColor-1 text-base outline-none p-0 border-none bg-transparent focus:ring-0"
            />
          </span>

          <FilterAnonymous
            options={[{ _id: "All", name: "All" }, ...users]}
            onFilter={handleOptionSelect} // Handle the selected user
          />
        </div>
      </div>

      {showPopup && (
        <CommentBox closeCommentPopup={() => setShowPopup(false)} />
      )}

      {isLoading ? (
        <p>Loading comments...</p>
      ) : (
        <>
          {console.log("Filtered Comments:", finalFilteredComments)}
          <UserCommentList comments={finalFilteredComments} />
        </>
      )}
    </div>
  );
};

export default AnonymousComments;
