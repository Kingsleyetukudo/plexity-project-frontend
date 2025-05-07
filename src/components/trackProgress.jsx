import { MessageSquareText, Star, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../stores/userStateStore";
import { fetchComments } from "../stores/commentStore";
import { Link } from "react-router-dom";

const TaskProgressCard = () => {
  const { userTotalRating } = useSelector((state) => state.staffAppraisal);
  const { users } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment || []); // Ensure default empty object
  const [currentUser, setCurrentUser] = useState(null);
  const [unreadComments, setUnreadComments] = useState([]);

  const dispatch = useDispatch();

  const progress = userTotalRating || 0; // Handle undefined rating
  const maxRating = 5;
  const progressPercentage = (progress / maxRating) * 100;

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("persist:auth");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const userDetails = user?.user ? JSON.parse(user.user) : null;
        setCurrentUser(userDetails || { role: "" });
        dispatch(getAllUsers());
        dispatch(fetchComments());
      } else {
        setCurrentUser({ role: "" });
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      setCurrentUser({ role: "" });
    }
  }, [dispatch]);

  useEffect(() => {
    if (!currentUser || !currentUser.role) return; // Prevents running when currentUser is null
    // console.log(comments);

    const anonymousComments = comments || [];
    if (Array.isArray(anonymousComments)) {
      // console.log(comments);
      const filteredComments = anonymousComments.filter((comment) => {
        if (currentUser.role === "Admin") {
          // console.log(currentUser);
          return !comment.readByAdmin;
        }
        if (currentUser.role === "Mgt") return !comment.readByMgt;
        return false;
      });
      setUnreadComments(filteredComments);
    }
  }, [currentUser, comments]);

  return (
    <div className="w-full grid grid-cols-1 gap-5 md:grid-cols-3">
      {/* Rating Card */}
      <div className="p-4 bg-white rounded-lg shadow-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-color-1 uppercase">Rating</h3>
          <div className="flex items-center justify-center rounded-full bg-color-2 p-2">
            <Star className="text-white w-8 h-8" />
          </div>
        </div>
        <div className="text-4xl font-bold text-gray-800 mb-4">
          {progress.toFixed(1)} / 5
        </div>
        <div className="relative w-full h-2 bg-gray-200 rounded-full">
          <div
            className="absolute top-0 left-0 h-2 bg-color-1 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Members Card */}
      {(currentUser?.role === "Admin" ||
        currentUser?.role === "Mgt" ||
        currentUser?.role === "Sub-Admin") && (
        <div className="p-4 bg-white rounded-lg shadow-md w-full">
          <Link to={"/dashboard/employees"}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-color-1 uppercase">
                Members
              </h3>
              <div className="flex items-center justify-center rounded-full bg-color-2 p-2">
                <Users className="text-white w-8 h-8" />
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-4">
              {users?.length || 0}
            </div>
          </Link>
        </div>
      )}

      {/* Pending Comments Card */}
      {(currentUser?.role === "Admin" || currentUser?.role === "Mgt") && (
        <div className="p-4 bg-white rounded-lg shadow-md w-full">
          <Link to={"/dashboard/anonymous-comments"}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-color-1 uppercase">
                Pending Comments
              </h3>
              <div className="flex items-center justify-center rounded-full bg-color-2 p-2">
                <MessageSquareText className="text-white w-8 h-8" />
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-4">
              {unreadComments.length}
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TaskProgressCard;
