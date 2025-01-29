import { useState } from "react";
import { useSelector } from "react-redux";

const CommentBox = () => {
  const [comment, setComment] = useState();
  const [selectedUser, setSelectedUser] = useState(null);
  const { user, users } = useSelector((state) => state.auth);

  const handleUserSelect = (selectedUser) => {
    setSelectedUser(selectedUser);
    console.log(selectedUser);
  };

  const handleSubmit = () => {
    console.log(comment);
  };
  return (
    <>
      {!selectedUser ? (
        <div>
          <h2 className="text-xl font-bold mb-4">Select a Member</h2>
          <ul className="list-none overflow-auto max-h-[300px]">
            {users.map((user) => (
              <li
                key={user._id}
                onClick={() => handleUserSelect(user)}
                className="cursor-pointer p-3 border-b-[1px] border-[#ddd] hover:bg-[#f0f0f0] flex items-center justify-between"
              >
                <p>
                  {user.firstName} {user.lastName}
                </p>{" "}
                <button className="text-[10px]   px-2.5 py-1  text-white bg-color-2 rounded-full hover:bg-color-1 focus:outline-none focus:ring-2 focus:ring-color-1">
                  Appraise
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold">Anonymous Comment Section</h2>
            <p>only management team can read your comment</p>
          </div>
          <div>
            <textarea
              placeholder="Anonymous Comment Section"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2.5 h-[150px] mb-2.5 border-[1px solid #ddd] rounded-md resize-none"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="md:text-xl font-semibold md:font-bold px-4 py-2 md:px-8 md:py-3 text-white bg-color-2 rounded-full hover:bg-color-1 focus:outline-none focus:ring-2 focus:ring-color-1"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentBox;
