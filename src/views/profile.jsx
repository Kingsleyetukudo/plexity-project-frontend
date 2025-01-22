import RatingComponent from "../components/ratingSystem";
import UserDisplay from "../components/usersDisplay";

const Profile = () => {
  return (
    <>
      <div>
        <h1>Profile</h1>
        <UserDisplay />

        <RatingComponent />
      </div>
    </>
  );
};

export default Profile;
