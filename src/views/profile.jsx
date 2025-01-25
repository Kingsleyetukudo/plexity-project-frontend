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
        <h2 className="font-extrabold text-xl md:text-3xl mb-5">Profile</h2>
        <UserDisplay />
      </div>
    </>
  );
};

export default Profile;
