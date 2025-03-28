import React from "react";
import string from "../../constants/string";
import Search from "./Search";
import crossArrow from "./../../assets/crossArrow.png";
import { Link } from "react-router-dom";

const Participant = () => {
  return (
    <div className="flex justify-center py-14">
      <div className="container 3xl:w-[70%] px-4 lg:px-0 xl:px-20 pb-20">
        <div>
          <div className="relative heading flex justify-center mb-4">
            <h2 className="font-EBGaramond uppercase xl:py-2 text-xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
              Participant’s Profile
            </h2>
            <div className="absolute bottom-0 left-[50%] translate-x-[-50%] w-[5%] h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC] "></div>
          </div>
          <div className="text-[1.2rem] md:text-base lg:text-xl 2xl:text-2xl text-center px-4 md:px-8 lg:px-12 xl:px-16">
            Please select the category and view the profiles of participants and
            request for meetings. You can also search all profiles by different
            criteria and see a short list of participants of interest to you.
          </div>
          <div className="py-4 mb-8 lg:w-[90%] mx-auto lg:space-y-4">
            <Search />
          </div>
          <div className="space-y-4 lg:space-y-8">
            {/* <Link to="/sponsorProfile" className='border-[1px] border-footerblue/30 text-footerblue flex justify-between items-center px-4 py-2 lg:px-8 lg:py-4 rounded-lg md:rounded-2xl lg:text-3xl'>
                            <div className='text-lg md:text-xl lg:text-2xl font-semibold '>Sponsors</div>
                            <img src={crossArrow} alt="" />
                        </Link> */}
            <Link
              to="/key-govt-officers"
              className="border-[1px] border-footerblue/30 text-footerblue flex justify-between items-center px-4 py-2 lg:px-8 lg:py-4 rounded-lg md:rounded-2xl lg:text-3xl"
            >
              <div className="text-lg md:text-xl lg:text-2xl font-semibold ">
                Key Govt/ Services Officers
              </div>
              <img src={crossArrow} alt="" />
            </Link>
            <Link
              to="/primeparticipant"
              className="border-[1px] border-footerblue/30 text-footerblue flex justify-between items-center px-4 py-2 lg:px-8 lg:py-4 rounded-lg md:rounded-2xl lg:text-3xl"
            >
              <div className="text-lg md:text-xl lg:text-2xl font-semibold ">
                Prime Contractors/OEMs
              </div>
              <img src={crossArrow} alt="" />
            </Link>
            <Link
              to="/manufacturerProfile"
              className="border-[1px] border-footerblue/30 text-footerblue flex justify-between items-center px-4 py-2 lg:px-8 lg:py-4 rounded-lg md:rounded-2xl lg:text-3xl"
            >
              <div className="text-lg md:text-xl lg:text-2xl font-semibold ">
                Manufacturers/ Suppliers/ Service Providers
              </div>
              <img src={crossArrow} alt="" />
            </Link>
            <Link
              to="/startupprofile"
              className="border-[1px] border-footerblue/30 text-footerblue flex justify-between items-center px-4 py-2 lg:px-8 lg:py-4 rounded-lg md:rounded-2xl lg:text-3xl"
            >
              <div className="text-lg md:text-xl lg:text-2xl font-semibold ">
                Start-ups
              </div>
              <img src={crossArrow} alt="" />
            </Link>
            <Link
              to="/investorProfile"
              className="border-[1px] border-footerblue/30 text-footerblue flex justify-between items-center px-4 py-2 lg:px-8 lg:py-4 rounded-lg md:rounded-2xl lg:text-3xl"
            >
              <div className="text-lg md:text-xl lg:text-2xl font-semibold ">
                Investors
              </div>
              <img src={crossArrow} alt="" />
            </Link>
            <Link
              to="/mediaPartnerProfile"
              className="border-[1px] border-footerblue/30 text-footerblue flex justify-between items-center px-4 py-2 lg:px-8 lg:py-4 rounded-lg md:rounded-2xl lg:text-3xl"
            >
              <div className="text-lg md:text-xl lg:text-2xl font-semibold">
                Associate and Media Partners
              </div>
              <img src={crossArrow} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Participant;
