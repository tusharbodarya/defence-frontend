import React, { useEffect, useRef, useState } from "react";
import string from "../constants/string";
import info from "../assets/info.png";
import PopupContent from "./PopupContent";
import RegistrationForm from "./Forms/RegistrationForm";

const categories = [
  {
    cate: "Prime Contractor/ OEM",
    title: "You are registering as Prime Contractor/ OEM",
    eventId: "1",
    roles: "Prime Contractors/OEMs",
    info: "Prime Contractor/ OEM",
  },
  {
    cate: "Manufacturer/ Supplier/ Services Provider",
    title: "You are registering as Manufacturer/ Supplier/ Services Provider",
    eventId: "2",
    roles: "Manufacturers & Suppliers",
    info: "Manufacturer/ Supplier/ Services Provider",
  },
  {
    cate: "Key Govt/ Services Officer",
    title: "You are registering as Key Govt/ Services Officer",
    eventId: "3",
    roles: "Key Govt/ Services Officer",
    info: "Key Govt/ Services Officers",
  },
  {
    cate: "Casual Visitor",
    title: "You are registering as Casual Visitor",
    eventId: "6",
    roles: "Casual Visitors",
    info: "Casual Visitor",
  },
  {
    cate: "Investor",
    title: "You are registering as Investor",
    eventId: "5",
    roles: "Investors",
    info: "Investors",
  },
  {
    cate: "Event Partner/ Associate/ Media Partner",
    title: "You are registering as Event Partner/ Associate/ Media Partner",
    eventId: "8",
    roles: "Event Partners",
    info: "Associate/ Media Partner",
  },
  {
    cate: "Start-ups",
    title: "You are registering as Start-ups",
    eventId: "4",
    roles: "Start-ups",
    info: "Start-ups",
  },
  {
    cate: "Company Listing only",
    title: "You are registering as Company Listing only",
    eventId: "7",
    roles: "Company Listing",
    info: "Company Listings Only",
  },
];

const Register = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentComponent, setCurrentComponent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState({ success: false, message: "" });
  const [disableOtherOptions, setDisableOtherOptions] = useState(false);
  const [goClicked, setGoClicked] = useState(false); // New state

  const formRef = useRef(null);

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const category = categories.find((cat) => cat.cate === selectedCategory);
    if (category) {
      setCurrentComponent(category);
      setDisableOtherOptions(true); // Disable other radio buttons after "Go" button is clicked
      setGoClicked(true); // Set goClicked to true when the button is clicked
    }
  };

  useEffect(() => {
    if (currentComponent) {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentComponent]);

  const resetFormState = () => {
    setSelectedCategory("");
    setCurrentComponent(null);
    setLoading(false);
    setApiStatus({ success: false, message: "" });
    setDisableOtherOptions(false); // Re-enable radio buttons on reset
    setGoClicked(false); // Reset goClicked to false when the form is reset
  };

  const renderComponent = () => {
    if (currentComponent) {
      const { title, eventId, roles } = currentComponent;

      return (
        <div ref={formRef}>
          <RegistrationForm
            key={roles + (goClicked ? "active" : "inactive")}
            title={title}
            eventId={eventId}
            userRole={roles}
            setLoading={setLoading}
            loading={loading}
            setApiStatus={setApiStatus}
            apiStatus={apiStatus}
            onNext={resetFormState}
          />
        </div>
      );
    }
    return null;
  };

  const [popup, setPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");

  const handlePopup = (info) => {
    setPopupContent(info);
    setPopup(true);
  };

  return (
    <section className="relative bg-white flex justify-center font-poppins ">
      <div className="container 3xl:w-[70%] px-4 lg:px-0 xl:px-20">
        <div className="flex flex-col md:flex-row w-full h-auto mx-auto">
          <div className="mainregister w-full md:w-[38%] lg:w-[30%] py-8 ">
            <div className="relative my-4">
              <h2 className="uppercase text-xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold pb-[0.35rem]">
                {string.registertitle}
              </h2>
              <div className="absolute bottom-0 w-8 md:w-10 lg:w-12 xl:w-16 h-[0.17rem] bg-[#1189CC] rounded-[20px]"></div>
            </div>
            <div className=" flex flex-col gap-4 lg:gap-12">
              <div className="text-justify pb-4 lg:pb-8 text-sm md:text-base lg:text-lg xl:text-xl">
                {string.registertext}
              </div>
              <div className="steps pb-4 lg:pb-8">
                <div className="font-bold py-4 text-sm md:text-base lg:text-lg xl:text-xl">
                  Benefit from:
                </div>
                <ul className="list-disc pl-4 text-sm md:text-base lg:text-lg xl:text-xl">
                  <li className="marker:text-listcolor">{string.regi1}</li>
                  <li className="marker:text-listcolor">{string.regi2}</li>
                  <li className="marker:text-listcolor">{string.regi3}</li>
                </ul>
              </div>
              <div className="text-justify text-sm md:text-base lg:text-lg xl:text-xl">
                {string.registertext2}
              </div>
            </div>
          </div>
          <div className="categoryselection flex w-full md:w-[63%] lg:w-[70%] py-20 md:pl-8 md:pr-4 lg:px-12 xl:pl-20 xl:pr-4">
            <div className="flex flex-col gap-4 xl:gap-8 w-full">
              <div className="relative">
                <h2 className="text-base lg:text-xl xl:text-2xl font-semibold">
                  {string.selectcetegorytitle}
                </h2>
                <div className="absolute bottom-0 w-4 md:w-8 lg:w-8 xl:w-12 h-[0.15rem] bg-[#1189CC] rounded-[20px]"></div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="relative radiobutton grid grid-cols-1 md:grid-cols-2 gap-2 text-pretty text-sm lg:text-lg">
                  {categories.map((category) => (
                    <div
                      key={category.cate}
                      className="flex items-start 2xl:items-center "
                    >
                      <input
                        type="radio"
                        className="radio-large  2xl:mt-2 w-[5%]"
                        value={category.cate}
                        checked={selectedCategory === category.cate}
                        onChange={handleChange}
                        disabled={
                          disableOtherOptions &&
                          selectedCategory !== category.cate
                        }
                      />
                      <div className="pl-1 w-[95%]">
                        {category.cate}
                        <img
                          src={info}
                          onClick={() => handlePopup(category.info)}
                          className="ml-2 inline w-[15px] h-[15px]"
                          alt="info_icon"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-4">
                  <button
                    className={`rounded-md font-normal border-[1px] py-2 px-10 ${goClicked
                      ? "bg-gray-500 text-white cursor-not-allowed border-gray-500 "
                      : "bg-textblue text-white border-textblue "
                      }`}
                    type="submit"
                  >
                    Go
                  </button>
                  <button
                    className={`rounded-md font-normal border-[1px]  py-2 px-10 ${goClicked
                      ? "bg-textblue text-white border-textblue"
                      : "bg-gray-500  text-white cursor-not-allowed border-gray-500"
                      }`}
                    type="button"
                    onClick={resetFormState}
                  >
                    Reset
                  </button>
                </div>
              </form>
              <div ref={formRef}>{renderComponent()}</div>
            </div>
          </div>
        </div>
      </div>
      {popup && (
        <PopupContent content={popupContent} onClose={() => setPopup(false)} />
      )}
    </section>
  );
};

export default Register;
