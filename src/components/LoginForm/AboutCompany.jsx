import React from "react";
import string from "../../constants/string";
import editProfileSmall from "../../assets/EditProfile.png";
import pdfIcon from './../../assets/uploadedDocument.jpg'
import companybuilding from "../../assets/blankprofile.png";
import companyBrochure from "../../assets/company65.png";
import { useNavigate } from "react-router-dom";
const AboutCompany = ({ profileData }) => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/updateProfile");
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <div className="relative font-EBGaramond mb-4">
          <h2 className="uppercase text-base lg:text-lg xl:text-xl 2xl:text-2xl font-normal py-1 md:py-2">
            {string.cptitle1}
          </h2>
          <div className="absolute bottom-0 w-8 md:w-8 lg:w-12 xl:w-16 h-[0.20rem] bg-[#1189CC] rounded-[20px]"></div>
        </div>
        <div>
          <button
            className="bg-white border-[1px] border-textblue text-textblue rounded-3xl text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl p-2 lg:px-3"
            onClick={handleEditProfile}
          >
            {/* <img src={editProfileSmall} alt="" className="w-5" /> */}
            Edit Profile
          </button>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4 text-sm md:text-base lg:text-md xl:text-lg 2xl:text-xl  h-auto">
        <div className="col-span-2 lg:col-span-1 border-[1px] border-iconborder/25 rounded-xl p-3 text-[1rem]">
          {/* {!profileData?.profile?.company?.company?.company_logo && ( */}
          <div className="text-sm md:text-base lg:text-md xl:text-lg 2xl:text-xl">Company Logo</div>
          {/* )} */}
          <div className="flex items-center justify-center h-full">
            <img
              src={
                profileData?.profile?.company?.company_logo
                  ? `${process.env.REACT_APP_BASE_URI}/storage/${profileData?.profile?.company?.company_logo}`
                  : companybuilding
              }
              alt="Company Logo"
            />
          </div>
        </div>
        <div className="col-span-2 lg:col-span-1 border-[1px] border-iconborder/25 rounded-xl p-3 text-[1rem]">
          {/* {!profileData.company_brochure && */}
          <div> Brochure (Cover Image)</div>
          {/* } */}
          <div className="flex items-center justify-center h-full">
            <img
              src={
                profileData?.profile?.company?.company_brochure_cover_img
                  ? `${process.env.REACT_APP_BASE_URI}/storage/${profileData?.profile?.company?.company_brochure_cover_img}`
                  : // `${process.env.REACT_APP_BASE_URI}/storage/${profileData.company_brochure}`
                  companyBrochure
              }
              alt="Company Brochure"
            />
          </div>
        </div>
        <div className="col-span-2 lg:col-span-1 border-[1px] border-iconborder/25 rounded-xl p-3 text-[1rem] h-full flex flex-col">
          <div>Brochure (Document)</div>
          <div className="flex items-center justify-center relative h-[80%] ">
            {profileData?.profile?.company?.company_brochure ? (
              <a
                href={`${process.env.REACT_APP_BASE_URI}/storage/${profileData?.profile?.company?.company_brochure}`}
                download
                target="_blank"
                className="h-[90%] "
              >
                <img
                  src={pdfIcon}
                  alt="Company Brochure"
                  className="w-auto h-full cursor-pointer "
                />
              </a>
            ) : (
              <img
                src={companyBrochure}
                alt="Presentation File Preview"
                className="w-auto h-[90%]"
              />
            )}
          </div>
          {/* {profileData?.profile?.company?.company_brochure_name ?
            <div className=" w-full  bottom-2 text-footerblue/80 text-xs lg:text-sm text-center">
              {profileData?.profile?.company?.company_brochure_name || ""}
            </div>
            : (
              <></>
            )} */}
        </div>

        <div className="col-span-6 lg:col-span-3 border-[1px] border-iconborder/25 rounded-xl p-3 overflow-auto h-[13rem] lg:h-auto">
          <div className={` ${profileData?.profile?.company?.company_description ? "font-semibold" : ""}`}>Company Description</div>
          <div>{profileData?.profile?.company?.company_description || ""}</div>
        </div>
      </div>
    </div>
  );
};

export default AboutCompany;
