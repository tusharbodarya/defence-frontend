import React from "react";

const CasualVisitorForm = ({ label, keyValue, name, nameValue, email, emailValue, mobile, mobileValue, onChange, isEmailValid, emailError }) => {
  // console.log("Label value:", label); // Logs every render

  return (
    <div className='border-[1px] border-iconborder/25 rounded-xl w-full p-4'>
      <div className="relative heading flex items-center">
        <h2 className='font-poppins text-footerblue lg:mb-1 text-sm md:text-base xl:text-lg font-normal'>{label}</h2>
        <div className="absolute bottom-0 w-[5%] h-[0.15rem] lg:h-[0.2rem] bg-[#1189CC] "></div>
      </div>
      <div>
        <div className=''>{name}</div>
        <input
          type="text"
          name={`${keyValue}_name`} // Ensure this matches the state key
          className={`bg-inputcolor rounded-xl w-full p-3 outline-none ${isEmailValid ? "" : "border border-red-500" // Indicate invalid email with red border
            }`}
          value={nameValue}
          onChange={onChange}
        />
      </div>
      <div>
        <div className=''>{email}</div>
        <input
          type="email"
          name={`${keyValue}_email`} // Ensure this matches the state key
          className={`bg-inputcolor rounded-xl w-full p-3 outline-none ${isEmailValid ? "" : "border border-red-500" // Indicate invalid email with red border
            }`}
          value={emailValue}
          onChange={onChange}
        />
        {emailError && <span className="text-red-500">{emailError}</span>} {/* Display email error */}
      </div>
      <div>
        <div className=''>{mobile}</div>
        <input
          type="text"
          name={`${keyValue}_mob_no`} // Ensure this matches the state key
          className={`bg-inputcolor rounded-xl w-full p-3 outline-none ${isEmailValid ? "" : "border border-red-500" // Indicate invalid email with red border
            }`}
          value={mobileValue}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default CasualVisitorForm;
