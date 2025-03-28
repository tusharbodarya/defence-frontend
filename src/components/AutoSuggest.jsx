import React, { useState, useEffect, useRef } from "react";

const AutoSuggest = ({ value, onChange, onSelect, suggestions }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputValue) {
      const filtered = suggestions.filter((company) =>
        company.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [inputValue, suggestions]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    onChange(value);
    setShowSuggestions(true);
  };

  const handleSelect = (company) => {
    setInputValue(company.name);
    onSelect(company);
    setShowSuggestions(false);
  };

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
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
    <div className="relative" ref={inputRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        className="bg-inputcolor w-full text-sm lg:text-lg xl:text-xl rounded-lg p-2 xl:p-4"
        placeholder="Enter company name"
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded-lg w-full max-h-60 overflow-y-auto z-10">
          {filteredSuggestions.map((company) => (
            <li
              key={company.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelect(company)}
            >
              {company.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoSuggest;
