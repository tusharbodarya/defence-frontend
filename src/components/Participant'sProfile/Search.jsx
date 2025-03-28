import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Slider from "react-slick";

const Search = ({ onSearch, onFilterChange }) => {
  const [selectedOption, setSelectedOption] = useState("All profiles");
  const [searchTerm, setSearchTerm] = useState("");

  const handleOptionChange = (event) => {
    const option = event.target.value;
    setSelectedOption(option);
    onFilterChange(option); // Send selected filter option to parent
  };

  const handleSearchInputChange = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    onSearch(searchValue); // Send search term to parent
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <div>
      <div className="pt-8">
        <div className="bg-primeinputbg flex items-center gap-3 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl px-6 py-4 mb-4 rounded-full">
          <IoSearchOutline color="gray" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchInputChange}
            placeholder="Search profiles"
            className="w-full outline-none bg-transparent"
          />
        </div>
        <div className="py-2 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
          Simply type the fist few letters of any Company, Profile, Business Activity, Products/Services or Keyword
        </div>
      </div>
      {/* <div className="hidden sm:flex justify-between items-center text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-iconborder">
        <div>Search</div>
        {[
          "All profiles",
          "By Company",
          "By Business Activity",
          "By Product/Services",
          "By Keyword",
        ].map((option, index) => (
          <div
            key={index}
            className="flex items-center gap-1 lg:gap-2 justify-center"
          >
            <input
              type="radio"
              id={`option-${index}`}
              name="primeSearch"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
              className="w-4 lg:w-6 h-4 lg:h-6 "
              disabled
            />
            <label htmlFor={`option-${index}`}>{option}</label>
          </div>
        ))}
      </div> */}
      {/* <div className="sm:hidden w-[95%] mx-auto overflow-hidden">
        <div className="py-4">Search</div>
        <Slider {...settings} className="">
          {[
            "All profiles",
            "By Company",
            "By Business Activity",
            "By Product/Services",
            "By Keyword",
          ].map((option, index) => (
            <div key={index} className="mx-2 flex items-center gap-1 ">
              <input
                type="radio"
                id={`option-${index}`}
                name="primeSearch"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
                className="w-4 lg:w-6 h-4 lg:h-6"
              />
              <label htmlFor={`option-${index}`} className="pl-2">
                {option}
              </label>
            </div>
          ))}
        </Slider>
      </div> */}
    </div>
  );
};

export default Search;
