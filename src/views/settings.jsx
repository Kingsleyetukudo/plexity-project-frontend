import TitleBar from "../components/titleBar";
import { useState } from "react";

const Settings = () => {
  const [title] = useState("Settings");
  return (
    <>
      <div>
        <TitleBar title={title} />
      </div>
    </>
  );
};

export default Settings;
