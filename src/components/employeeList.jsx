import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { EllipsisVertical, Search } from "lucide-react";
import {
  updateUserByAdmin,
  getAllUsers,
  deleteUser,
} from "../stores/userStateStore";
import { useState } from "react";
import Dropdown from "./filterDropdown";

const EmployeeList = () => {
  const { users } = useSelector((state) => state.auth);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [filterStatus, setFilterStatus] = useState("All"); // Filter state
  const dispatch = useDispatch();

  const option = ["All", "Approved", "Not Approved"];

  const handleOpenMenu = (event, userId) => {
    setSelectedUser((prevId) => (prevId === userId ? null : userId));
  };

  const handleApprove = async (e, userId) => {
    try {
      const response = await dispatch(updateUserByAdmin(userId));
      setSelectedUser(null);
      if (response.meta && response.meta.requestStatus === "fulfilled") {
        console.log("User approved successfully", userId);
        dispatch(getAllUsers());
      } else {
        console.log("Approval failed with status:", response);
      }
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  const handleDelete = async (e, userId) => {
    try {
      const response = await dispatch(deleteUser(userId));
      setSelectedUser(null);
      if (response.meta && response.meta.requestStatus === "fulfilled") {
        console.log("User deleted successfully", userId);
        dispatch(getAllUsers());
      } else {
        console.log("Delete failed with status:", response);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Filter & Search logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "All"
        ? true
        : filterStatus === "Approved"
        ? user.isApproved
        : !user.isApproved;

    return matchesSearch && matchesFilter;
  });

  const columns = [
    { name: "S/N", selector: (row, index) => index + 1, width: "60px" },
    { name: "First Name", selector: (row) => row.firstName },
    { name: "Last Name", selector: (row) => row.lastName },
    { name: "Email", selector: (row) => row.email },
    { name: "Position", selector: (row) => row.position },
    { name: "Department", selector: (row) => row.department },
    {
      name: "Approve",
      cell: (row) => (
        <span
          className={`px-3 py-2 text-white text-sm font-semibold rounded-full ${
            row.isApproved ? "bg-green-500" : "bg-yellow-500"
          }`}
        >
          {row.isApproved ? "Approved" : "Not Approved"}
        </span>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <EllipsisVertical
            onClick={(e) => handleOpenMenu(e, row._id)}
            className="cursor-pointer relative"
          />

          {selectedUser && selectedUser === row._id ? (
            <div className="absolute top-10 bg-white shadow-md z-20">
              <ul className="flex flex-col gap-1 text-sm font-semibold">
                <li
                  className="bg-gray-300 hover:bg-color-2 hover:text-white px-2 py-1 cursor-pointer"
                  onClick={(e) => handleApprove(e, row._id)}
                >
                  Approve
                </li>
                <li
                  className="bg-gray-300 hover:bg-color-2 hover:text-white px-2 py-1"
                  onClick={(e) => handleDelete(e, row._id)}
                >
                  Delete
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      ),
    },
  ];

  return (
    <>
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
        <Dropdown options={option} onFilter={setFilterStatus} />
      </div>

      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={filteredUsers} // Use filtered users instead of all users
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 50, 100]}
        />
      </div>
    </>
  );
};

export default EmployeeList;
