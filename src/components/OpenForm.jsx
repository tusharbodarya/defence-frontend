import React, { useState, useEffect, useRef } from "react";
import { FaAngleDown, FaPlus } from "react-icons/fa";

const OpenForm = ({
  options = [],
  value = [],
  onChange,
  onAddNewOption,
  placeholder = "Select or Add...",
  isMulti = false,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, options]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
  };

  const handleOptionSelect = (option) => {
    if (isMulti) {
      if (!value.find((item) => item.value === option.value)) {
        onChange([...value, option]);
      }
    } else {
      onChange(option);
      setShowSuggestions(false);
    }
    setInputValue("");
  };

  const handleAddOption = () => {
    const newOption = { label: inputValue, value: inputValue };
    onAddNewOption(newOption);
    handleOptionSelect(newOption);
    setInputValue("");
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="flex items-center bg-gray-100 rounded-lg p-2 w-full">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="bg-transparent text-sm lg:text-lg xl:text-xl outline-none w-full px-2"
        />
        <FaAngleDown />
      </div>
      {showSuggestions && (
        <div className="absolute bg-white border border-gray-300 rounded-lg w-full max-h-60 overflow-y-auto z-10 mt-1 shadow-lg">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionSelect(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No options available</div>
          )}
          {inputValue && (
            <div
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
              onClick={handleAddOption}
            >
              <FaPlus className="mr-2 text-blue-500" />
              Add "{inputValue}"
            </div>
          )}
        </div>
      )}
      {isMulti && value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {value.map((selectedOption) => (
            <div
              key={selectedOption.value}
              className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center"
            >
              <span>{selectedOption.label}</span>
              <span
                className="ml-2 cursor-pointer text-white"
                onClick={() =>
                  onChange(
                    value.filter((v) => v.value !== selectedOption.value)
                  )
                }
              >
                &times;
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OpenForm;
