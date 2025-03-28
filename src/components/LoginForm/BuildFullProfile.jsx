import React from "react";
import string from "../../constants/string";

const BuildFullProfile = () => {
  return (
    <div className="bg-keygovtbg p-4 lg:p-6 my-4 rounded-xl">
      <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row items-center font-poppins">
        <div className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-justify w-full lg:w-[75%]">
          {string.loginkeyheaddisc}
        </div>
        <div className="w-full lg:w-[25%] text-right">
          <a
            href="https://meetings.defencepartners.in/"
            target="_blank"
            rel="noreferrer"
            className="py-2 px-3 rounded-full bg-white border-[1px] border-textblue text-textblue text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
          >
            {string.loginkeyheadbtn}
            {/* Build Full Profile */}
          </a>
        </div>
      </div>
    </div>
  );
};

export default BuildFullProfile;
