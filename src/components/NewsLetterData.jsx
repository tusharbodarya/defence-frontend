import React from "react";
import { Link } from "react-router-dom";

const NewsLetterData = ({ date, img, title, document }) => {
  return (
    <div className="w-full flex-col gap-4">
      <div className="w-auto h-60 xl:h-80">
        <a href={document} target="_blank">
          {img ? (
            <img src={img} alt="" className="w-full h-full" />
          ) : (
            <div className=" rounded-xl bg-black/20 "></div>
          )}
        </a>
      </div>
      <div className="text-iconborder mt-1">
        {date ? date : "9 August 2024"}
      </div>
      <div className="text-sm md:text-base lg:text-lg xl:text-xl ">
        {title ? title : "1. Welcome NEWSLETTER"}
      </div>
      <div className="my-2">
        <Link to={document} target="_blank" download className="border-[1px] border-textblue text-textblue py-1 md:py-2 px-2 md:px-3 rounded-lg mt-1 bg-downloadbtnbg">
          Download
        </Link>
      </div>
    </div>
  );
};

export default NewsLetterData;
