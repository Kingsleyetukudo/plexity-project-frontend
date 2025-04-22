import { useSelector, useDispatch } from "react-redux";
import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Search,
} from "lucide-react";
import {
  updateUserByAdmin,
  getAllUsers,
  deleteUser,
} from "../stores/userStateStore";
import { useEffect, useState } from "react";
import Dropdown from "./filterDropdown";
import { Link, useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const { users } = useSelector((state) => state.auth);
  // const [setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [filterStatus, setFilterStatus] = useState("All"); // Filter state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const option = ["All", "Approved", "Not Approved"];
  const tableOptions = ["View", "Approve", "Delete", "Reject"];

  // const handleOpenMenu = (event, userId) => {
  //   setSelectedUser((prevId) => (prevId === userId ? null : userId));
  // };

  const handleApprove = async (userId) => {
    console.log(userId);
    try {
      const response = await dispatch(updateUserByAdmin(userId));
      // setSelectedUser(null);
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

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleView = (userId) => {
    // Navigate to the user's profile page
    navigate(`profile/${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await dispatch(deleteUser(userId));
      // setSelectedUser(null);
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

  // Pagination Logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredUsers.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(filteredUsers.length / transactionsPerPage);

  const toggleAction = (id) => {
    setIsOpen(isOpen === id ? false : id);
  };

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

      <div className="mb-8 grid grid-cols-1 gap-6">
        <div className="">
          <table className="w-full border-collapse border text-left border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th>S/N</th>
                <th className="p-3 border">First Name</th>
                <th className="p-3 border">Last Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Department</th>
                <th className="p-3 border">Position</th>
                <th className="p-3 border">Approve</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {currentTransactions.map((txn, index) => (
                <tr key={txn._id}>
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border">
                    <Link to={`profile/${txn._id}`}>{txn.firstName}</Link>
                  </td>
                  <td className="p-3 border">
                    <Link to={`profile/${txn._id}`}>{txn.lastName}</Link>
                  </td>
                  <td className="p-3 border">
                    <Link to={`profile/${txn._id}`}>{txn.email}</Link>
                  </td>
                  <td className="p-3 border">
                    <Link to={`profile/${txn._id}`}>{txn.department}</Link>
                  </td>
                  <td className="p-3 border">
                    <Link to={`profile/${txn._id}`}>{txn.position}</Link>
                  </td>
                  <td>
                    <span
                      className={`p-3 border flex items-center rounded-full gap-2 ${
                        txn.isApproved
                          ? "bg-green-200 text-green-600"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {txn.isApproved ? "Approved" : "Not Approved"}
                    </span>
                  </td>
                  <td className="p-3 border text-center relative ">
                    <button
                      className=" px-1 py-1 border border-[#E4E7EC] bg-white text-brandColor-1 rounded"
                      onClick={() => toggleAction(txn._id)}
                    >
                      <EllipsisVertical className="w-4 " />
                    </button>
                    {isOpen === txn._id && (
                      <div className="absolute right-5 mt-2 w-16 bg-white shadow-md rounded-xl border border-gray-200 z-10">
                        {tableOptions.map((option, index) => (
                          <div
                            key={index}
                            className="text-left py-2 hover:bg-gray-100 hover:text-color-1 cursor-pointer text-active-color text-xs"
                            onClick={() => {
                              setIsOpen(false);
                              if (option === "Approve") {
                                handleApprove(txn._id);
                              } else if (option === "Delete") {
                                handleDelete(txn._id);
                              } else if (option === "View") {
                                handleView(txn._id);
                              }
                            }}
                          >
                            <span className="px-2">{option}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}

        <div className="flex items-center justify-center space-x-2 mt-4">
          <button
            className="px-3 py-1 rounded shadow-sm bg-gray-200 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "border-2 border-color-3 text-color-2"
                  : "shadow-sm bg-text-color"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 rounded shadow-sm bg-gray-200 disabled:opacity-50"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default EmployeeList;
