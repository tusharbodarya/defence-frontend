import React, { useEffect, useRef } from "react";
// import { FaArrowLeft } from "react-icons/fa";
import string from "../constants/string";
// import creditcard from '../assets/creditcard.png'
// import upi from '../assets/UPI.png'
// import phonepay from '../assets/phonepay.png'
// import activateside from '../assets/activateside.png'
import success from "../assets/success.png";
import emoji from "../assets/emoji.png";

const Success = ({ onClose, onClick }) => {
  const sucRef = useRef(null);
  const topRef = useRef(null);
  const handleclickoutside = (e) => {
    if (sucRef.current && !sucRef.current.contains(e.target)) {
      onClose();
    }
  };
  useEffect(() => {
    // lock scroll
    document.body.style.overflow = "hidden";
    if (topRef.current) {
      topRef.current.focus();
    }
    document.addEventListener("mousedown", handleclickoutside);
    return () => {
      // unlock scroll
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleclickoutside);
    };
  }, []);
  return (
    // <div className="absolute inset-0 -top-[270%] md:-top-[90%] -left-[5%] sm:-left-[12%] md:-left-[120%] lg:-left-[90%] xl:-left-[80%] 2xl:-left-[85%] 3xl:-left-[70%] 3xl:-right-[23%] 2xl:-right-[35%] xl:-right-[25%] lg:-right-[40%] md:-right-[48%] -right-[5%] sm:-right-[12%] -bottom-[58%] sm:-bottom-[60%] md:-bottom-[45%] xl:-bottom-[48%] 3xl:-bottom-[60%] z-20 flex justify-center backdrop-opacity-100 bg-black/25 backdrop-blur-lg">
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-opacity-100 bg-black/25 backdrop-blur-lg">
      <div ref={topRef} className="container 3xl:w-[70%] w-[80%] md:w-1/2 ">
        <div ref={sucRef} className="bg-white rounded-3xl flex">
          <div className=" flex flex-col p-8 sm:p-12 ">
            <div className="w-full sm:w-2/3 mx-auto mb-8">
              <div className="flex flex-col justify-center items-center gap-4">
                <div>
                  <img src={success} alt="" />
                </div>
                <div className="font-semibold flex items-center justify-center gap-2 text-xl lg:text-2xl xl:text-3xl">
                  {string.successtitle} <img src={emoji} alt="" />
                </div>
                <div className="text-base lg:text-lg text-wrap text-center">
                  {string.successdisc}
                </div>
              </div>
            </div>

            <div className="text-right flex justify-end">
              <button
                onClick={onClick}
                className=" text-sm md:text-base lg:text-lg xl:text-xl rounded-lg  font-normal py-3 px-4 text-white bg-textblue w-full"
                type="submit"
              >
                {string.successbtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
