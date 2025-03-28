import React from "react";
import CreatableSelect from "react-select/creatable";

const SearchableDropdown = ({
  options,
  onChange,
  value,
  placeholder,
  isDisabled = false,
}) => {
  const formatOptions = options.map((option) => ({
    label: option,
    value: option,
  }));

  return (
    <CreatableSelect
      options={formatOptions}
      isMulti
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      isDisabled={isDisabled}
    />
  );
};

export default SearchableDropdown;
