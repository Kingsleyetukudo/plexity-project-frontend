// import { Navigate } from "react-router-dom";
import EmployeeList from "../components/employeeList";
import TitleBar from "../components/titleBar";
import { useState } from "react";

const Employees = () => {
  const [title] = useState("Employee");

  return (
    <>
      <div className="grid gap-8 ">
        <div className="flex justify-between items-center md:my-5">
          <TitleBar title={title} />
        </div>
        <div>
          <EmployeeList />
        </div>
      </div>
    </>
  );
};

export default Employees;
