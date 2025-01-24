import { useSelector } from "react-redux";

const UserDisplay = () => {
  const { users } = useSelector((state) => state.auth);

  console.table(users);
  return (
    <>
      <div>
        <h1>All Staff</h1>
        {users.map((user) => (
          <p key={user._id}>{user.email}</p>
        ))}
      </div>
    </>
  );
};

export default UserDisplay;
