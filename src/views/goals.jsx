import TitleBar from "../components/titleBar";
import { useState } from "react";

const Goals = () => {
  const [title] = useState("Goals");
  return (
    <>
      <div>
        <TitleBar title={title} />
      </div>
    </>
  );
};

export default Goals;
