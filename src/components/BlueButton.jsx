import React from "react";

const BlueButton = ({ title, font, width, onClick, disabled }) => {
  return (
    <div className={` ${width ? width : ""}`}>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-textblue"
          } rounded-lg text-center text-white py-2 px-4 ${font ? font : ""} ${width ? width : ""
          }`}
      >
        {title}
      </button>
    </div>
  );
};

export default BlueButton;
