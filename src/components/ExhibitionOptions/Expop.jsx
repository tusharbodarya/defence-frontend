import React, { useEffect, useRef, useState } from "react";
import upload from "../../assets/upload.png";
import { FaArrowLeft } from "react-icons/fa";
import exhibitionOptions from "../../constants/exhibitionOptions";
import { useNavigate, useParams } from "react-router-dom";
import CasualVisitorForm from "./CasualVisitorForm";
import {
  updateExhibitionOptions,
  fetchExhibitionOptions,
} from "../../apiEndpoints";
import tickIcon from './../../assets/yellowcheck.png'



const FileUpload = ({
  handleFileChange,
  handleImageClick,
  fileInputRef,
  imagePreview,
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);
      setUploadComplete(false);
      setUploadProgress(0);

      // Simulate file upload process for demonstration
      const simulateUpload = () => {
        return new Promise((resolve) => {
          const interval = setInterval(() => {
            setUploadProgress((prevProgress) => {
              const newProgress = prevProgress + 10;
              if (newProgress >= 100) {
                clearInterval(interval);
                resolve();
              }
              return newProgress;
            });
          }, 200); // Adjust speed as needed
        });
      };

      await simulateUpload();
      setUploading(false);
      setUploadComplete(true);
      handleFileChange(event); // Call the original handleFileChange after upload
    }
  };
  <>
    <div
      onClick={() => handleImageClick(fileInputRef)}
      className="flex flex-col justify-center items-center rounded-md bg-communicationbg"
    >
      <div className="relative p-4">
        {imagePreview ? (
          <div className="flex flex-col items-center">
            <img
              src={imagePreview}
              alt="Uploaded Preview"
              className="cursor-pointer rounded-md"
              style={{ maxHeight: '200px', maxWidth: '100%' }}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
            {uploading && (
              <div className="w-full mt-2">
                <div className="relative pt-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-gray-700">
                      Uploading...
                    </span>
                    <span className="text-xs font-semibold text-gray-700">
                      {uploadProgress}%
                    </span>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <div
                      style={{ width: `${uploadProgress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    ></div>
                  </div>
                </div>
              </div>
            )}
            {uploadComplete && (
              <div className="flex flex-col items-center mt-2">
                <img src={tickIcon} alt="Upload Complete" className="h-8 w-8" />
                <span className="text-green-500 text-sm">Upload Complete</span>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <img src={upload} alt="Upload Icon" className="cursor-pointer" />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
            </div>
            <div className="text-center mt-2">
              <div className="text-footerblue/70 text-sm md:text-base xl:text-lg 2xl:text-xl">
                {exhibitionOptions.exhibitionOrder.details.uploadLogoDescription}
              </div>
              <div className="text-footerblue/20 text-xs md:text-sm xl:text-base">
                {exhibitionOptions.exhibitionOrder.details.uploadLogoSize}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  </>
};

const Expop = () => {
  const fileInputRef1 = useRef(null);
  const payRef = useRef(null);
  const navigate = useNavigate();
  const { booth } = useParams();
  const [loading, setLoading] = useState(false);
  const [originalData, setOriginalData] = useState({});
  const [formData, setFormData] = useState({
    category: "", fascia_name: "", company_logo: null, casual_visitor1_name: "", casual_visitor1_email: "", casual_visitor1_mob_no: "", casual_visitor2_name: "", casual_visitor2_email: "", casual_visitor2_mob_no: "",
  });
  const [charCount, setCharCount] = useState({
    fascia_name: 0,
  });
  const [error, setError] = useState({
    fascia_name: "",
  });
  // Define character limits for each input field
  const charLimits = {
    fascia_name: 30,
    casual_visitor1_name: 50,
    casual_visitor1_email: 100,
    casual_visitor1_mob_no: 10,
    casual_visitor2_name: 50,
    casual_visitor2_email: 100,
    casual_visitor2_mob_no: 10,
  };
  const handleImageClick = (fileInputRef) => {
    fileInputRef.current.click();
  };

  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        company_logo: file || "",
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickOutside = (e) => {
    if (payRef.current && !payRef.current.contains(e.target)) {
      // Add any necessary logic here
      navigate(-1)
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (payRef.current) {
      payRef.current.focus();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (booth) {
          const response = await fetchExhibitionOptions(booth);
          console.log("Fetched data:", response); // Log the entire response object

          if (response.success) {
            const data = response.data;
            console.log("Extracted data:", data);

            // Map the data to form fields correctly
            setFormData((prevData) => ({
              ...prevData,
              ...data,
              company_logo: data.company_logo
                ? data.company_logo
                : prevData.company_logo,
            }));

            if (data.company_logo) {
              setImagePreview(
                `${process.env.REACT_APP_BASE_URI}/storage/${data.company_logo}`
              );
            }
          } else {
            console.error("Error fetching data:", response.message);
          }
        }
      } catch (error) {
        // console.error("Failed to fetch data", error);
      }
    };

    fetchData();

    // Clean up the object URL when the component unmounts
    return () => {
      URL.revokeObjectURL(imagePreview);
    };
  }, [booth]);

  useEffect(() => {
    console.log("FormData after fetch:", formData.company_logo);
  }, [formData]);

  const handleSubmit = () => {
    navigate("/savedProfile");
  };

  const [userLoggedIn, setUserLoggedIn] = useState(true); // Replace with actual authentication check
  const handleSave = async () => {
    if (!userLoggedIn) {
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }

    setLoading(true);
    const form = new FormData();
    form.append("category", booth);
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== "") {
        form.append(key, formData[key]);
      }
    }
    console.log("FormData entries:");
    for (let [key, value] of form.entries()) {
      console.log(`${key}: ${value}`);
    }
    const response = await updateExhibitionOptions(form);
    console.log(response);

    setLoading(false);
    navigate("/savedProfile"); // Uncomment when ready to navigate
  };

  const [isEmailValid, setIsEmailValid] = useState(true); // State for email validity

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the field is for mobile number
    if (name.includes("mob_no")) {
      const numericValue = value.replace(/[^0-9]/g, ""); // Remove any non-numeric characters

      if (numericValue.length === 0 || numericValue.length <= 10) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: numericValue,
        }));
        setError((prevError) => ({
          ...prevError,
          [name]:
            numericValue.length === 10 || numericValue.length === 0
              ? ""
              : "Mobile number must be exactly 10 digits.",
        }));
      }
    } else {
      if (value.length <= charLimits[name]) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        setCharCount((prevCount) => ({
          ...prevCount,
          [name]: value.length,
        }));
        setError((prevError) => ({
          ...prevError,
          [name]: "", // Clear error if valid
        }));
      } else {
        setError((prevError) => ({
          ...prevError,
          [name]: `Character limit exceeded. Max ${charLimits[name]} characters allowed.`,
        }));
      }
    }
  };





  const boothData = {
    C1: {
      title: exhibitionOptions.exhibitionOrder.titles.ecoBooth, disc: exhibitionOptions.exhibitionOrder.details.boothTitleDescription, point1: exhibitionOptions.exhibitionOrder.details.fasciaName, textlimit: exhibitionOptions.exhibitionOrder.details.maxCharacters, btn1: exhibitionOptions.exhibitionOrder.details.doItLaterButtonText, btn2: exhibitionOptions.exhibitionOrder.details.submitButtonText, noteBold: exhibitionOptions.exhibitionOrder.details.note.boldText, noteLine: exhibitionOptions.exhibitionOrder.details.note.description, index: 1, casualvisitor: exhibitionOptions.exhibitionOrder.details.casualVisitorTitle, casualVisitorForm1: exhibitionOptions.exhibitionOrder.details.casualVisitorForms[0], casualVisitorForm2: exhibitionOptions.exhibitionOrder.details.casualVisitorForms[1],
    },
    C2: {
      title: exhibitionOptions.exhibitionOrder.titles.prideBooth, disc: exhibitionOptions.exhibitionOrder.details.boothTitleDescription, point1: exhibitionOptions.exhibitionOrder.details.fasciaName, uploadtitle: exhibitionOptions.exhibitionOrder.details.uploadLogo, uploaddisc: exhibitionOptions.exhibitionOrder.details.uploadLogoDescription, uploaddiscSize: exhibitionOptions.exhibitionOrder.details.uploadLogoSize, btn1: exhibitionOptions.exhibitionOrder.details.doItLaterButtonText,
      btn2: exhibitionOptions.exhibitionOrder.details.submitButtonText, casualvisitor: exhibitionOptions.exhibitionOrder.details.casualVisitorTitle,
      casualVisitorForm1: exhibitionOptions.exhibitionOrder.details.casualVisitorForms[0],
      // casualVisitorForm2:
      //   exhibitionOptions.exhibitionOrder.details.casualVisitorForms[1],
      noteBold: exhibitionOptions.exhibitionOrder.details.note.boldText, noteLine: exhibitionOptions.exhibitionOrder.details.note.description, index: 2,
    },
    C3: {
      title: exhibitionOptions.exhibitionOrder.titles.premiumBooth,
      disc: exhibitionOptions.exhibitionOrder.details.boothTitleDescription,
      point1: exhibitionOptions.exhibitionOrder.details.fasciaName,
      uploadtitle: exhibitionOptions.exhibitionOrder.details.uploadLogo,
      uploaddisc:
        exhibitionOptions.exhibitionOrder.details.uploadLogoDescription,
      uploaddiscSize: exhibitionOptions.exhibitionOrder.details.uploadLogoSize,
      btn1: exhibitionOptions.exhibitionOrder.details.doItLaterButtonText,
      btn2: exhibitionOptions.exhibitionOrder.details.submitButtonText,
      casualvisitor:
        exhibitionOptions.exhibitionOrder.details.casualVisitorTitle,
      casualVisitorForm1:
        exhibitionOptions.exhibitionOrder.details.casualVisitorForms[0],
      casualVisitorForm2:
        exhibitionOptions.exhibitionOrder.details.casualVisitorForms[1],
      noteBold: exhibitionOptions.exhibitionOrder.details.note.boldText,
      noteLine: exhibitionOptions.exhibitionOrder.details.note.description,
      index: 2,
    },
  };

  if (!booth || !boothData[booth]) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Booth not found</h1>
          <p className="mt-4">Please select a valid booth from the options.</p>
          <button
            className="mt-6 bg-textblue text-white py-2 px-4 rounded-full"
            onClick={() => navigate("/exhibitionOptions")}
          >
            Go Back to Exhibition Options
          </button>
        </div>
      </div>
    );
  }

  const {
    title,
    disc,
    point1,
    uploadtitle,
    uploaddisc,
    uploaddiscSize,
    btn1,
    btn2,
    index,
    textlimit,
    casualvisitor,
    casualVisitorForm1,
    casualVisitorForm2,
    noteBold,
    noteLine,
  } = boothData[booth];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-opacity-100 bg-black/25 backdrop-blur-lg">
      <div className="container 3xl:w-[70%] w-[85%] font-poppins md:2/3 lg:w-[65%] overflow-hidden h-[80vh]">
        <div ref={payRef} className="rounded-xl bg-white p-2 md:p-6 h-full overflow-y-auto">
          <div className="px-3 md:flex md:flex-col md:gap-2">
            <div>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 font-semibold text-xl rounded-full bg-footerblue text-white p-1 px-2 pr-3"
              >
                <FaArrowLeft /> Back
              </button>
            </div>
            <div>
              <h2 className="font-semibold text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                {booth}{" "}{title}
              </h2>
              <div className="text-xs md:text-sm xl:text-base 2xl:text-lg text-iconborder font-normal">
                {disc}
              </div>
            </div>
            <div className="">
              <div className="">
                <div className="text-sm md:text-base 2xl:text-xl">{point1}</div>
                <textarea
                  id="message"
                  name="fascia_name"
                  value={formData.fascia_name || ""} // Ensure fallback value
                  onChange={handleInputChange}
                  className="resize-none bg-inputcolor rounded-xl w-full p-3 outline-none"
                />
                <div className="text-right text-gray-500">
                  {charCount.fascia_name}/{charLimits.fascia_name}
                </div>
                {error.fascia_name && (
                  <div className="text-red text-sm">
                    {error.fascia_name}
                  </div>
                )}
              </div>
            </div>
            {index !== 1 && (
              <div className="">
                <h3 className="text-sm md:text-base 2xl:text-xl">
                  {uploadtitle}
                </h3>
                <FileUpload
                  handleFileChange={handleFileChange}
                  handleImageClick={handleImageClick}
                  fileInputRef={fileInputRef1}
                  imagePreview={imagePreview}
                />
              </div>
            )}
            {casualvisitor && (
              <div>
                <div className=" heading flex items-center mb-2 md:mb-4">
                  <h2 className="font-semibold text-base md:text-lg lg:text-xl xl:text-2xl">
                    {casualvisitor}
                  </h2>
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <CasualVisitorForm
                    label={casualVisitorForm1.label}
                    keyValue={"casual_visitor1"}
                    name={casualVisitorForm1.name}
                    nameValue={formData.casual_visitor1_name || ""}
                    email={casualVisitorForm1.email}
                    emailValue={formData.casual_visitor1_email || ""}
                    mobile={casualVisitorForm1.mobile}
                    mobileValue={formData.casual_visitor1_mob_no || ""}
                    onChange={handleInputChange}
                    isEmailValid={isEmailValid}
                    emailError={error.casual_visitor1_email}
                  />
                  {casualVisitorForm2 &&
                    <CasualVisitorForm
                      label={casualVisitorForm2.label}
                      keyValue={"casual_visitor2"}
                      name={casualVisitorForm2.name}
                      nameValue={formData.casual_visitor2_name || ""}
                      email={casualVisitorForm2.email}
                      emailValue={formData.casual_visitor2_email || ""}
                      mobile={casualVisitorForm2.mobile}
                      mobileValue={formData.casual_visitor2_mob_no || ""}
                      onChange={handleInputChange}
                      isEmailValid={isEmailValid}
                    />
                  }
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="text-xs md:text-sm xl:text-base 2xl:text-lg text-textblue font-semibold">
                {noteBold}
              </div>
              <div className="text-textblue text-[0.6rem] md:text-xs xl:text-sm 2xl:text-base">
                {noteLine}
              </div>
            </div>
            <div className="text-textblue">For technical assistance please contact Heera Singh 9582649664</div>
            <div className="flex gap-2 md:gap-5 mt-3 md:mt-6">
              <button
                onClick={handleSubmit}
                className="w-full bg-white border-[1px] border-textblue/80 text-textblue/80 font-medium rounded-lg px-6 py-1.5 md:py-2 hover:bg-textblue/80 hover:text-white transition duration-300"
              >
                {btn1}
              </button>
              <button
                onClick={handleSave}
                className="w-full bg-textblue/80 text-white font-medium rounded-lg px-6 py-1.5 md:py-2 hover:bg-textblue transition duration-300"
              >
                {btn2} {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expop;
