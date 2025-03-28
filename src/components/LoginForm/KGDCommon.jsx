import React from "react";
import blankProfile from "../../assets/blankprofile.png";
import editProfile from "../../assets/editProfilePhoto.png";
import { useNavigate } from "react-router-dom";

const KGDCommon = ({ title, array = [], btn, imageSrc }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <div className="relative font-EBGaramond mb-4">
          <h2 className="uppercase text-base lg:text-lg xl:text-2xl 2xl:text-2xl py-1 md:py-2">
            {title}
          </h2>
          <div className="absolute bottom-0 w-8 md:w-8 lg:w-12 xl:w-16 h-[0.20rem] bg-[#1189CC] rounded-[20px]"></div>
        </div>
        <div>
          {btn && (
            <button
              className="bg-white border-[1px] border-textblue text-textblue rounded-full py-1 lg:py-2 px-2 lg:px-4 text-sm lg:text-base xl:text-lg 2xl:text-xl flex items-center gap-2"
              onClick={() => navigate("/updateKeyGovtProfile")}
            >
              <img src={editProfile} alt="Edit Profile" />
              Edit Profile
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 lg:gap-4 xl:gap-6">
        <div className="flex justify-center">
          <img
            src={imageSrc || blankProfile}
            alt="Profile"
            className="w-80 h-48"
          />
        </div>
        <div className="border-[1px] border-iconborder/25 text-xs lg:text-sm xl:text-base 2xl:text-lg rounded-xl grid grid-cols-1 md:grid-cols-2 items-center w-full gap-4 p-4">
          {array.length > 0 ? (
            array.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="font-semibold text-sm lg:text-base xl:text-lg 2xl:text-xl">
                  {item.name}
                </div>
                <div className="outline-none text-iconborder rounded-md w-full text-sm lg:text-base xl:text-lg 2xl:text-xl">
                  {item.disc}
                </div>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KGDCommon;
