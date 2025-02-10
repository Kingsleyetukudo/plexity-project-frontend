// import { Navigate } from "react-router-dom";
import AppraisalBox from "../components/appraisalBox";
import TitleBar from "../components/titleBar";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllStaffAppraisal } from "../stores/staffAppraisalStore";
import { Search } from "lucide-react";

const AllAppraisal = () => {
  const [title] = useState("Staff Apprisals");
  const dispatch = useDispatch();

  const { allStaffAppraisal } = useSelector((state) => state.staffAppraisal);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state

  // Filter & Search logic
  const filteredUsers = (allStaffAppraisal || []).filter((user) => {
    const firstName = user.appraisedEmployee?.firstName?.toLowerCase() || "";
    const lastName = user.appraisedEmployee?.lastName?.toLowerCase() || "";

    const searchQuery = searchTerm ? searchTerm.toLowerCase() : "";

    return firstName.includes(searchQuery) || lastName.includes(searchQuery);
  });

  useEffect(() => {
    dispatch(getAllStaffAppraisal());
    console.log(allStaffAppraisal);
  }, [dispatch]);

  return (
    <>
      <div className="grid gap-8 ">
        <div className="flex justify-between items-center md:my-5">
          <TitleBar title={title} />
        </div>
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Search Box */}
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

          {/* Filter Dropdown */}
          {/* <Dropdown options={option} onFilter={setFilterStatus} /> */}
        </div>
        <AppraisalBox appraisals={filteredUsers} />
      </div>
    </>
  );
};

export default AllAppraisal;
