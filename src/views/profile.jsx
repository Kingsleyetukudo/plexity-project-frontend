import { useEffect } from "react";
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
      </div>
    </>
  );
};

export default Profile;
