import TitleBar from "../components/titleBar";
import { useState } from "react";

const Leaves = () => {
  const [title] = useState("Leaves");
  return (
    <>
      <div>
        <TitleBar title={title} />
      </div>
    </>
  );
};

export default Leaves;
