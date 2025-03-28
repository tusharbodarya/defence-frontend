import React from "react";
import noProfile from "./../../assets/blankprofile.png";
import { useNavigate } from "react-router-dom";

const MBParticipant = ({ profileData, title }) => {
  const navigate = useNavigate();
  // Ensure main_business_activities and main_business_products are arrays
  const mainBusinessActivities = Array.isArray(
    profileData.main_business_activities
  )
    ? profileData.main_business_activities
    : JSON.parse(profileData.main_business_activities || "[]");

  const mainBusinessProducts = Array.isArray(profileData.main_business_products)
    ? profileData.main_business_products
    : JSON.parse(profileData.main_business_products || "[]");

  const handleEditProfile = () => {
    navigate("/updateProfile");
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="relative font-EBGaramond mb-4">
          <h2 className="uppercase text-base lg:text-lg xl:text-xl 2xl:text-2xl font-normal py-1 2xl:py-2">
            {title || "Main Business Participant"}
          </h2>
          <div className="absolute bottom-0 w-8 md:w-8 lg:w-12 xl:w-16 h-[0.20rem] bg-[#1189CC] rounded-[20px]"></div>
        </div>
        <div>
          <button
            className=" bg-white border-[1px] border-textblue text-textblue rounded-3xl text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl p-2 lg:px-3"
            onClick={handleEditProfile}
          >
            {/* <img src={editProfileSmall} alt="" className="w-5" /> */}
            Edit Profile
          </button>
        </div>
      </div>
      <div className=" flex flex-col sm:grid grid-cols-7 lg:grid-cols-6 gap-2 lg:gap-6 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
        <div onClick={() => console.log(profileData)} className="col-span-2 lg:col-span-1 flex justify-center items-center w-60 h-40 mx-auto sm:w-full sm:h-60 my-auto rounded-md overflow-hidden">
          <img
            src={
              profileData?.profile_image
                ? `${process.env.REACT_APP_BASE_URI}/storage/${profileData?.profile_image}`
                : `${process.env.REACT_APP_BASE_URI}/storage/${profileData?.main_business_image}` || noProfile
            }
            alt="Main Business Participant"
            className=" w-full h-full object-cover"
          />
        </div>
        <div className="col-span-5  grid grid-cols-2 gap-6 border-[1px] border-iconborder/25 rounded-xl p-4">
          <div>
            <div className="text-black">Name</div>
            <div className="text-black/70">
              {profileData.main_business_name ||
                "Name of main business participant"}
            </div>
          </div>
          <div>
            <div className="text-black">Designation</div>
            <div className="text-black/70">
              {profileData.main_business_designation || "Designation here"}
            </div>
          </div>
          <div>
            <div className="text-black">
              Main Business Activities (select multiple)
            </div>
            <div className="text-black/70">
              <ul
                className={`overflow-auto list-disc list-inside scrollbar-hide ${mainBusinessActivities.length > 5 ? 'max-h-32' : ''}`}
                style={{ maxHeight: mainBusinessActivities.length > 5 ? '7.3rem' : 'auto' }}
              >
                {mainBusinessActivities.length > 0 ? (
                  mainBusinessActivities.map((product, index) => (
                    <li className="text-sm md:text-base lg:text-lg xl:text-xl" key={index}>{product}</li>
                  ))
                ) : (
                  <li>Business Activity</li>
                )}
              </ul>
              {/* {mainBusinessActivities.join(", ") ||
                "Main business activity 1, Main business activity 2"} */}
            </div>
          </div>
          <div>
            <div className="text-black">Product/Services (select multiple)</div>
            <div className="text-black/70">
              <ul
                className={`overflow-auto list-disc list-inside scrollbar-hide ${mainBusinessProducts.length > 5 ? 'max-h-32' : ''}`}
                style={{ maxHeight: mainBusinessProducts.length > 5 ? '7.3rem' : 'auto' }}
              >
                {mainBusinessProducts.length > 0 ? (
                  mainBusinessProducts.map((product, index) => (
                    <li className="text-sm md:text-base lg:text-lg xl:text-xl" key={index}>{product}</li>
                  ))
                ) : (
                  <li>Product name</li>
                )}
              </ul>
              {/* {mainBusinessProducts.join(", ") || "Product name"} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MBParticipant;
