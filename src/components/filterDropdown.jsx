import { useState } from "react";
import { ChevronDown, ChevronRight, Filter } from "lucide-react";
import PropTypes from "prop-types";

const Dropdown = ({ options, onFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Filter");

  const handleSelection = (option) => {
    console.log(option);
    setSelected(option);
    setIsOpen(false);
    onFilter(option); // Callback to send the selected value back to the parent
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white shadow-sm px-4 py-2 rounded-xl  text-active-color text-xs font-semibold"
      >
        <Filter className="text-active-color text-xs w-[17px]" />
        <span>{selected}</span>
        {isOpen ? (
          <ChevronDown className="text-active-color text-xs w-[17px]" />
        ) : (
          <ChevronRight className="text-active-color text-xs w-[17px]" />
        )}{" "}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-xl border border-gray-200 z-10">
          <p className="px-4 py-2 s text-brandColor-1 text-xs font-semibold shadow-sm">
            Period
          </p>
          {options.map((option) => (
            <div
              key={option._id}
              className="px-4 py-2 hover:bg-gray-100 hover:text-gray-700 cursor-pointer text-active-color text-xs"
              onClick={() => handleSelection(option._id)}
            >
              {option.firstName} {option.lastName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default Dropdown;
