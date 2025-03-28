import React, { useEffect, useState } from "react";
import string from "../../constants/string";
import Search from "./Search";
import DefencePublicSector from "./DefencePublicSector";
import oems from "../../assets/oems.jpg";

const SponsorProfile = () => {
  return (
    <div className="flex justify-center py-14">
      <div className="container 3xl:w-[70%] px-4 lg:px-0 xl:px-20">
        <div>
          <div className="relative heading flex justify-center mb-4">
            <h2 className="font-EBGaramond uppercase xl:py-2 text-xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
              {string.corporateSponsorTitle}
            </h2>
            <div className="absolute bottom-0 left-[50%] translate-x-[-50%] w-[5%] h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC] "></div>
          </div>
          <div className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-center ">
            {string.primedisc}
          </div>
          <div className="flex justify-center py-8">
            <button className="bg-textblue rounded-full text-white py-2 px-4 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
              {string.primebtn}
            </button>
          </div>
        </div>
        <div className="py-4 mb-8 lg:w-[90%] mx-auto lg:space-y-4">
          <Search />
        </div>
        <div className="py-12">
          <DefencePublicSector
            index={"4"}
            head={string.platinumSponsor}
            img={oems}
          />
        </div>
        <div className="py-12">
          <DefencePublicSector
            index={"4"}
            head={string.goldSponsor}
            img={oems}
          />
        </div>
        <div>
          <div className="relative heading flex justify-center mb-4">
            <h2 className="font-EBGaramond uppercase xl:py-2 text-xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
              {string.associationSponsorTitle}
            </h2>
            <div className="absolute bottom-0 left-[50%] translate-x-[-50%] w-[5%] h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC] "></div>
          </div>
        </div>
        <div className="py-4 mb-8 lg:w-[90%] mx-auto lg:space-y-4">
          <Search />
        </div>
        <div className="py-12">
          <DefencePublicSector
            index={"4"}
            head={string.strategicSponsor}
            img={oems}
          />
        </div>
        <div className="py-12">
          <DefencePublicSector
            index={"4"}
            head={string.innovationSponsor}
            img={oems}
          />
        </div>
        <div className="py-12">
          <DefencePublicSector
            index={"4"}
            head={string.technologySponsor}
            img={oems}
          />
        </div>
      </div>
    </div>
  );
};

export default SponsorProfile;
