import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { EllipsisVertical } from "lucide-react";
import {
  updateUserByAdmin,
  getAllUsers,
  deleteUser,
} from "../stores/userStateStore";
import { useState } from "react";

const EmployeeList = () => {
  const { users } = useSelector((state) => state.auth);
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();

  const handleOpenMenu = (event, userId) => {
    // setAnchorEl(event.currentTarget);
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
        console.log("User delete successfully", userId);
        dispatch(getAllUsers());
      } else {
        console.log("Delete failed with status:", response);
      }
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  const columns = [
    { name: "S/N", selector: (row, index) => index + 1, width: "60px" },
    { name: "First Name", selector: (row) => row.firstName },
    { name: "Last Name", selector: (row) => row.lastName },
    { name: "Email", selector: (row) => row.email },
    { name: "Position", selector: (row) => row.position },
    { name: "Department", selector: (row) => row.department },
    {
      name: "Approve",
      cell: (row) => (row.isApproved ? "Approved" : "Not Approved"),
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
            <div className=" absolute top-10 bg-white shadow-md z-10">
              <ul className="flex flex-col gap-1 text-sm font-semibold">
                {/* <li className="bg-gray-300 hover:bg-color-2 hover:text-white px-2 py-1">
                  <Link to="profile/:id">View Details</Link>
                </li> */}
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
          ) : (
            ""
          )}
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="h-[700px] overflow-scroll">
        <DataTable columns={columns} data={users} className="h-[800px]" />
      </div>
    </>
  );
};

export default EmployeeList;
