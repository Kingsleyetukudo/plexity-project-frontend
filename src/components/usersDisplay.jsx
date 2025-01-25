import { useSelector } from "react-redux";
import userDefualt from "../assets/images/user-icon.svg";
import { useState } from "react";

const UserDisplay = () => {
  const { user } = useSelector((state) => state.auth);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      alert(`File uploaded: ${file.name}`);
    }
  };

  console.table(user);
  return (
    <>
      <div className="flex justify-between flex-col gap-4 p-5">
        <h1>All Staff</h1>

        <div key={user._id} className="flex flex-col gap-4">
          <div className="flex justify-between gap-4 ">
            <div className="flex flex-col  gap-4 border border-red-400 w-full">
              <div className="flex gap-4">
                <p className="border border-red-200">
                  <span className="font-bold">First Name:</span>{" "}
                  {user.firstName}
                </p>
                <p>
                  <span className="font-bold">Last Name:</span> {user.lastName}
                </p>
              </div>
              <div className="flex gap-4">
                <p className="border border-red-200">
                  <span className="font-bold">First Name:</span>{" "}
                  {user.firstName}
                </p>
                <p>Last Name: {user.lastName}</p>
              </div>
            </div>

            <div className="border border-red-500 relative w-[200px] h-[200px] flex items-center justify-center">
              {uploadedFile ? (
                <img
                  src={URL.createObjectURL(uploadedFile)}
                  alt="Uploaded"
                  className="w-[200px] h-auto  cursor-pointer"
                />
              ) : (
                <img
                  src={userDefualt}
                  alt="defualt image"
                  className="w-[200px] h-auto"
                />
              )}
              <input
                type="file"
                name=""
                id=""
                accept="image/*"
                onChange={handleFileUpload}
                className="absolute  opacity-0 cursor-pointer w-full h-full"
              />
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default UserDisplay;
