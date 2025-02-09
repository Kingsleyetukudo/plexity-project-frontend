import { useState } from "react";
import PropTypes from "prop-types";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  updateDepartment as updateDepartmentAction,
  deleteDepartment,
} from "../stores/departmentStore";
import EditDepartment from "./editDepartment";
import DeleteAppraisalBox from "./deleteAppraisalBox";

const DepartmentList = ({ departments }) => {
  const [openOption, setOpenOption] = useState(null);
  const [editDepartmentId, setEditDepartmentId] = useState(null);
  const [deleteDepartmentId, setDeleteDepartmentId] = useState(null);
  const [commentList, setCommentList] = useState(departments);
  const [localComment, setLocalComment] = useState("");
  const dispatch = useDispatch();

  const toggleOpenOption = (DepartmentId) => {
    setOpenOption(openOption === DepartmentId ? null : DepartmentId);
  };

  const openEditDepartment = (DepartmentId) => {
    const departmentToEdit = commentList.find((d) => d._id === DepartmentId);
    console.log(departmentToEdit, DepartmentId);
    if (!departmentToEdit.name) return;
    setLocalComment(departmentToEdit.name);
    setEditDepartmentId(DepartmentId);
  };

  const openDeleteDepartment = (DepartmentId) => {
    setDeleteDepartmentId(DepartmentId);
    const departmentToDelete = commentList.find((d) => d._id === DepartmentId);
    if (departmentToDelete) {
      setLocalComment(departmentToDelete.name);
    }
  };

  const updateDepartment = (DepartmentId, newName) => {
    setCommentList((prevDepartment) =>
      prevDepartment.map((department) =>
        department._id === DepartmentId
          ? { ...department, name: newName }
          : department
      )
    );

    console.log(DepartmentId, newName);
    dispatch(
      updateDepartmentAction({
        id: DepartmentId,
        departmentData: { name: newName },
      })
    );
    setEditDepartmentId(null);
  };

  const deleteDepartmentById = async (DepartmentId) => {
    dispatch(deleteDepartment(DepartmentId));
    setCommentList((prevDepartment) =>
      prevDepartment.filter((department) => department._id !== DepartmentId)
    );
    setDeleteDepartmentId(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {commentList?.length > 0 ? (
        commentList.map((comment) => (
          <div
            key={comment._id}
            className="shadow-lg p-5 rounded-xl flex flex-col gap-4 bg-white"
          >
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold"> {comment.name}</p>
              <div className="flex gap-5 items-center">
                <span className="bg-gray-200 rounded-full p-1 cursor-pointer relative">
                  <EllipsisVertical
                    className="w-5"
                    onClick={() => toggleOpenOption(comment._id)}
                  />
                  {openOption === comment._id && (
                    <div className="absolute right-0 top-10 bg-white shadow-md rounded-lg flex flex-col gap-1">
                      <p
                        onClick={() => openEditDepartment(comment._id)}
                        className="hover:bg-gray-200 px-2 flex items-center gap-1 text-sm cursor-pointer"
                      >
                        <Pencil className="w-3" /> Edit
                      </p>

                      <p
                        onClick={() => openDeleteDepartment(comment._id)}
                        className="hover:bg-gray-200 px-2 flex items-center gap-1 text-sm cursor-pointer"
                      >
                        <Trash2 className="w-3" /> Delete
                      </p>
                    </div>
                  )}
                </span>
              </div>
            </div>
            <div>
              {editDepartmentId === comment._id && (
                <EditDepartment
                  name={localComment}
                  setName={setLocalComment}
                  toggleEditComment={() => setEditDepartmentId(null)}
                  updateComment={(newComment) =>
                    updateDepartment(comment._id, newComment)
                  }
                />
              )}
            </div>

            {/* Delete Confirmation Popup */}
            {deleteDepartmentId === comment._id && (
              <DeleteAppraisalBox
                text={"Department"}
                apppraise={localComment}
                setapppraise={setLocalComment}
                toggleDeleteapppraise={() => setDeleteDepartmentId(null)}
                deleteapppraise={() => deleteDepartmentById(comment._id)}
              />
            )}
          </div>
        ))
      ) : (
        <p>No Department found.</p>
      )}
    </div>
  );
};

DepartmentList.propTypes = {
  departments: PropTypes.array.isRequired,
};

export default DepartmentList;
