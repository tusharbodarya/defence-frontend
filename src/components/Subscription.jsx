import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import string from "../constants/string";
import Slider from "react-slick";

const Subscription = ({ _amount, onClose, onClick, userRole }) => {
  const popupRef = useRef(null);
  const topRef = useRef(null);

  // Ref for the scrollable element
  const scrollableRef = useRef(null);

  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      onClose();
    }
  };

  const [isMediumOrLarger, setIsMediumOrLarger] = useState(
    window.innerWidth >= 650
  );

  const settings = {
    dots: false,
    accessibility: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    // Lock scroll on the body
    document.body.style.overflow = "hidden";
    if (topRef.current) {
      topRef.current.focus();
    }

    const handleResize = () => {
      setIsMediumOrLarger(window.innerWidth >= 650);
    };

    // Make the identified element scrollable
    if (scrollableRef.current) {
      scrollableRef.current.style.overflowY = "scroll";
    }

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unlock scroll on the body
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-screen w-screen fixed inset-0 flex items-center justify-center z-50  backdrop-opacity-100 bg-black/25 backdrop-blur-lg">
      <div
        ref={topRef}
        className="relative container w-[85%] sm:w-[75%]  3xl:w-[50%] mt-[0%] h-[95%] md:h-[90%] lg:h-[80%] "
      // tabIndex="-1"
      >
        <div
          ref={{ popupRef, scrollableRef }}
          // style={{ maxHeight: "calc(100vh - 150px)" }} // Adjust height as needed
          className="bg-white p-3 md:p-4 lg:p-6 rounded-3xl flex flex-col justify-between xl:gap-6 items-center h-full overflow-auto"
        >
          <div className="flex items-center justify-start w-full gap-4">
            <div>
              <button
                onClick={onClose}
                className="flex items-center gap-2 font-semibold text-lg rounded-full bg-footerblue text-white p-1 px-2 pr-3"
              >
                <FaArrowLeft /> Back
              </button>
            </div>
            <div className="text-[1rem] font-semibold lg:text-xl xl:text-2xl">
              {/* {string.subscriptiontitlebold} */}
            </div>
          </div>
          <div className="flex md:flex-row flex-col w-full  mx-0 justify-center">
            {isMediumOrLarger ? (
              <div className="rounded-2xl w-full text-center md:text-left border-2 p-2 xl:p-6 lg:p-4 space-y-2 xl:space-y-4 bg-gradient-to-b from-textblue to-footerblue text-white">
                <div className="bg-subscriptionlightbg/30 mb-8 text-white inline rounded-md p-1">
                  &nbsp;{userRole}&nbsp;
                </div>
                <div className=" font-semibold text-xl lg:text-2xl xl:text-3xl">
                  {_amount} + 18% GST
                </div>
                <div className="">
                  <div className="text-sm md:text-base xl:text-lg ">
                    {string.subtitlecontent}
                  </div>
                  <ul className="list-disc text-left pl-4 flex flex-col gap-2 text-sm md:text-base xl:text-lg">
                    {string.subtitlecontentli.map((i, index) => (
                      <li key={index} className="font-light ">
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="slider-container overflow-hidden w-full">
                <div className="rounded-2xl w-full text-justify py-4 px-4 md:text-left border-2 xl:p-10 lg:p-8 space-y-1 bg-gradient-to-b from-textblue to-footerblue text-white">
                  <div className="bg-subscriptionlightbg/30 text-white inline rounded-md p-1">
                    {string.subtitlesub}
                  </div>
                  <div className="sm:pb-4 font-semibold text-lg">
                    {_amount} + 18% GST
                  </div>
                  <div>
                    <div className="text-[0.7rem] leading-4 pb-2 font-light">
                      {string.subtitlecontent}
                    </div>
                    <ul className="list-disc pl-4 flex flex-col gap-2 font-light text-[0.7rem] leading-4 lg:text-lg">
                      {string.subtitlecontentli.map((i, index) => (
                        <li key={index} className="font-light">
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="font-medium text-gray-900 text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem]">
            If you wish to change the Subscriptions Package at this stage, you
            will be required to register again with a new email id and mobile
            number, or contact Admin at 9582649663 or 8826670075 by SMS or
            WhatsApp for assistance.
          </div>
          <div className="text-right w-full flex justify-end">
            <button
              onClick={onClick}
              className="text-sm md:text-base lg:text-lg xl:text-xl inline rounded-lg text-textblue font-normal py-2 px-4 border border-textblue"
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
