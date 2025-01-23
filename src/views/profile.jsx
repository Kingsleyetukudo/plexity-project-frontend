import { useEffect } from "react";
import RatingComponent from "../components/ratingSystem";
import UserDisplay from "../components/usersDisplay";
import { useDispatch } from "react-redux";
import { getAllAppraisal } from "../stores/appraisalStore";

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAppraisal());
  }, [dispatch]);
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
