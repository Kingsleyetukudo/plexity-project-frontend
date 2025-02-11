import { useDispatch } from "react-redux";
import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Search,
} from "lucide-react";
import { useState } from "react";
import Dropdown from "./filterDropdown";
import PropTypes from "prop-types";
import EditDepartment from "./editDepartment";

import DeleteAppraisalBox from "./deleteAppraisalBox";
import {
  deletePosition,
  getAllPositions,
  updatePosition,
} from "../stores/positionStore";

const PositionList = ({ departments }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;
  const [isOpen, setIsOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [name, setName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null); // Track selected department
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [filterStatus, setFilterStatus] = useState("All"); // Filter state
  const dispatch = useDispatch();

  const option = ["All", "Approved", "Not Approved"];
  const tableOptions = ["Edit", "Delete"];

  const handleEdit = (department) => {
    console.log("Edit Department:", department);
    setSelectedDepartment(department);

    setName(department.name); // Set the current name to state
    handleOpenEdit();
  };

  const handleOpenEdit = () => {
    setOpenEdit(!openEdit);
  };

  const handleOpenDelete = () => {
    setOpenDelete(!openDelete);
  };

  const handleUpdate = (departmentId, newName) => {
    console.log(
      `Updating department ${departmentId} with new name: ${newName}`
    );
    dispatch(
      updatePosition({ id: departmentId, departmentData: { name: newName } })
    );
  };

  const handleDeleteFunc = async (userId) => {
    try {
      console.log(userId);
      const response = await dispatch(deletePosition(userId));
      setSelectedDepartment(null);
      if (response.meta && response.meta.requestStatus === "fulfilled") {
        console.log("User deleted successfully", userId);
        dispatch(getAllPositions());
      } else {
        console.log("Delete failed with status:", response);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleDelete = (userId) => {
    setSelectedDepartment(userId);
    console.log(selectedDepartment);
    handleOpenDelete();
  };

  // Filter & Search logic
  const filteredUsers = departments.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

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
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border text-left border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 border w-16">S/N</th>
                <th className="p-3 border w-3/5">Position Name</th>
                <th className="p-3 border w-24 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((txn, index) => (
                <tr
                  key={txn._id}
                  className="border border-gray-300 hover:bg-gray-50"
                >
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border">{txn.name}</td>
                  <td className="p-3 border text-center relative">
                    {/* Action Button */}
                    <button
                      className="px-2 py-1 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-100"
                      onClick={() => toggleAction(txn._id)}
                    >
                      <EllipsisVertical className="w-4 h-4" />
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen === txn._id && (
                      <div className="absolute right-0 mt-2 w-24 bg-white shadow-md rounded-md border border-gray-200 z-10">
                        {tableOptions.map((option, i) => (
                          <div
                            key={i}
                            className="text-left px-3 py-2 hover:bg-gray-100 hover:text-gray-900 cursor-pointer text-sm"
                            onClick={() => {
                              setIsOpen(false);
                              if (option === "Edit") handleEdit(txn);
                              else if (option === "Delete")
                                handleDelete(txn._id);
                            }}
                          >
                            {option}
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
      {openEdit && (
        <EditDepartment
          department={selectedDepartment}
          toggleEditComponent={handleOpenEdit}
          name={name}
          setName={setName}
          updateComponent={handleUpdate}
        />
      )}

      {openDelete && (
        <DeleteAppraisalBox
          text="Department"
          commentId={selectedDepartment}
          deleteapppraise={handleDeleteFunc}
          toggleDeleteapppraise={handleOpenDelete}
        />
      )}
    </>
  );
};

PositionList.propTypes = {
  departments: PropTypes.array.isRequired,
};

export default PositionList;
