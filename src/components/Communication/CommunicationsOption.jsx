import React, { useState } from "react";
import string from "../../constants/string";
import Floatbox from "./Floatbox";
import business from "../../assets/BusinessWorkshop.png";
import BlueForm from "./BlueForm";
import workshop from "../../assets/workshop.png";
import presentation from "../../assets/presentation.png";
import newsletter from "../../assets/Newsletter.png";
import tick from "../../assets/tick.png";
import Newsletter from "./Newsletter";
import StandeeBanner from "./StandeeBanner";
import standee from "../../assets/Standee.png";
import whitetick from "../../assets/whitetick.png";
import DisplayBigger from "./DisplayBigger";
import greentick from "../../assets/greentick.png";
import displaybigger from "../../assets/dispaybigger.png";
import literature from "../../assets/literature.png";
import fullpage from "../../assets/fullpage.png";
import frontinside from "../../assets/InsideFront.png";
import backcover from "../../assets/BackCover.png";
import backcoveradvt from "../../assets/BackCoveradvt.png";
import halfpage from "../../assets/HalfPage.png";

const CommunicationsOption = () => {
  const li = [
    string.comoptiondisc1,
    string.comoptiondisc2,
    string.comoptiondisc3,
  ];
  const presentation_array = [
    string.comoptiontitle2disc1,
    string.comoptiontitle2disc2,
    string.comoptiontitle2disc3,
  ];
  const disc = [string.Newsletterdisc1, string.Newsletterdisc2];
  const discstand = [string.standeedisc1, string.standeedisc2];
  const discdisplaybig = [string.displaybigdisc1, string.displaybigdisc2];
  const literature_array = [string.literaturedisc1, string.literaturedisc2];
  const fullpagearray = [string.fullpagedisc1, string.fullpagedisc2];
  const frontinsidearray = [string.frontinsidedisc];
  const backcoverarray = [string.backcoverdisc];
  const backcoveradvtarray = [string.backcoveradvtdisc];
  const halfpagearray = [string.halfpagedisc];

  return (
    <div className="flex flex-col justify-center items-center  bg-lightblue">
      <div className="container 3xl:w-[70%] xl:px-20 py-20">
        <div className="pb-20">
          <div className="relative my-4 text-center font-EBGaramond">
            <h2 className="uppercase text-xl md:text-2xl lg:text-2xl xl:text-4xl font-bold pb-[0.35rem]">
              {string.communicationtitle}
            </h2>
            <div className="absolute bottom-0 left-1/2 -translate-x-[50%] w-8 md:w-10 lg:w-12 xl:w-16 h-[0.17rem] bg-[#1189CC] rounded-[20px]"></div>
          </div>
          <div className="font-poppins text-sm md:text-base xl:text-lg 2xl:text-xl md:px-10 lg:px-20 text-center">
            {string.communicationdisc}
          </div>
        </div>
        <div className="px-6 md:px-10">
          <Floatbox title={string.comoptiontitle} point={li} img={business} />
        </div>
      </div>
      <BlueForm
        title={string.comoptiontitlebluebg}
        disc={string.comoptiontitlebluebgdisc}
        img={workshop}
        formtitle={string.comoptiontitleblueformhead}
        inputs={string.comoptiontitleblueformph}
        btn={string.comoptiontitlebluebtn}
      />
      <div className="container 3xl:w-[70%] xl:px-20 py-20 bg-lightblue">
        <div className="px-6 md:px-10 py-12">
          <Floatbox
            title={string.comoptiontitle2}
            point={presentation_array}
            img={presentation}
          />
        </div>
      </div>
      <BlueForm
        title={string.comoptiontitlebluebg2}
        disc={string.comoptiontitlebluebgdisc2}
        formtitle={string.comoptiontitleblueformhead}
        inputs={string.comoptiontitleblueformph}
        btn={string.comoptiontitlebluebtn}
      />
      <div className="container 3xl:w-[70%] px-4 md:px-8 xl:px-20 py-20 bg-lightblue">
        <Newsletter
          title={string.Newsletter}
          tick={tick}
          disc={disc}
          btn={string.Newsletterbtn}
          img={newsletter}
          index={0}
        />
        <StandeeBanner
          img={standee}
          title={string.standee}
          tick={whitetick}
          disc={discstand}
          btn={string.Newsletterbtn}
          index={0}
        />
        <DisplayBigger
          title={string.displaybig}
          tick={tick}
          disc={discdisplaybig}
          greentick={greentick}
          greentext={string.displaybiggreen}
          img={displaybigger}
          btn={string.Newsletterbtn}
          index={0}
        />
        <DisplayBigger
          title={string.literature}
          tick={tick}
          whitetick={whitetick}
          disc={literature_array}
          img={literature}
          btn={string.Newsletterbtn}
          index={1}
        />
        <Newsletter
          title={string.fullpage}
          tick={tick}
          disc={fullpagearray}
          btn={string.fullpagebtn}
          img={fullpage}
          //    for popup
          index={2}
        />
        <StandeeBanner
          img={frontinside}
          title={string.frontinside}
          tick={whitetick}
          disc={frontinsidearray}
          btn={string.fullpagebtn}
          index={1}
        />
        <Newsletter
          title={string.backcover}
          tick={tick}
          disc={backcoverarray}
          btn={string.fullpagebtn}
          img={backcover}
          // for pop
          index={3}
        />
        <StandeeBanner
          img={backcoveradvt}
          title={string.backcoveradvt}
          tick={whitetick}
          disc={backcoveradvtarray}
          btn={string.fullpagebtn}
          index={2}
        />
        <Newsletter
          title={string.halfpage}
          tick={tick}
          disc={halfpagearray}
          btn={string.fullpagebtn}
          img={halfpage}
          index={1}
        />
      </div>
    </div>
  );
};

export default CommunicationsOption;
