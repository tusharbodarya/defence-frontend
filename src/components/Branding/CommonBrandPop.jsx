import React, { useEffect, useRef, useState } from "react";
import string from "../../constants/string";
import { useNavigate, useParams } from "react-router-dom";
import upload from "../../assets/upload.png";
import { FaArrowLeft } from "react-icons/fa";
import {
  fetchBrandingOptions,
  updateBrandingOptions,
} from "../../apiEndpoints";
import blankProfile from "./../../assets/upload.png";
import Swal from "sweetalert2";
const CommonBrandPop = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    sponsor_name: "",
    sponsor_logo: null,
  });
  const [charCount, setCharCount] = useState({
    sponsor_name: 0,
  });
  const [error, setError] = useState({
    sponsor_name: "",
  });
  // Define character limits for each input field
  const charLimits = {
    sponsor_name: 100,  // Example limit for the second field
  };

  const { subcategory } = useParams();
  const handleClose = () => {
    navigate(-1);
  };
  const payRef = useRef(null);

  const fileInputRef1 = useRef(null);
  const handleImageClick = (fileInputRef) => {
    fileInputRef.current.click();
  };
  const [imagePreview, setImagePreview] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Apply size limits based on subcategory
    let sizeLimit = 0;
    if (subcategory) {
      sizeLimit = 10485760; // 10 MB for Advt file
    }

    // Check file size
    if (file && sizeLimit > 0 && file.size > sizeLimit) {
      alert(`File size should not exceed ${sizeLimit / 1048576} MB for sponsor's logo.`);
      event.target.value = null; // Reset the file input
      return;
    }

    // If validation passes, proceed with file upload and preview
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        sponsor_logo: file || "",
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);

        // Show success alert after uploading the sponsor logo
        Swal.fire({
          icon: "success",
          title: "Logo Uploaded",
          text: "Your sponsor's logo has been uploaded successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    navigate("/savedProfile");
  };
  const handleClickOutside = (e) => {
    if (payRef.current && !payRef.current.contains(e.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (subcategory) {
          const response = await fetchBrandingOptions(subcategory);
          console.log("Fetched data:", response.data[0]); // Log the entire response object
          if (response.success) {
            const data = response.data[0];
            console.log("Extracted data:", data);

            // Map the data to form fields correctly
            setFormData((prevData) => ({
              ...prevData,
              ...data,
              sponsor_logo: data?.sponsor_logo
                ? data.sponsor_logo
                : prevData?.sponsor_logo,
            }));

            if (data?.sponsor_logo) {
              setImagePreview(
                `${process.env.REACT_APP_BASE_URI}/storage/${data?.sponsor_logo}`
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
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [subcategory]);
  // Ref for the scrollable element
  const scrollableRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (scrollableRef.current) {
        const windowHeight = window.innerHeight;
        const scrollableHeight = scrollableRef.current.offsetHeight;

        if (scrollableHeight > 0.8 * windowHeight) {
          setIsScrollable(true);
        } else {
          setIsScrollable(false);
        }
      }
    };
    handleResize(); // Run on initial render
    window.addEventListener("resize", handleResize); // Run on window resize
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   console.log("FormData after fetch:", formData.sponsor_logo);
  // }, [formData]);

  const [userLoggedIn, setUserLoggedIn] = useState(true); // Replace with actual authentication check
  const handleSave = async () => {
    if (!userLoggedIn) {
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }

    setLoading(true);
    const form = new FormData();
    form.append("category", subcategory);
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== "") {
        form.append(key, formData[key]);
      }
    }
    console.log("FormData entries:");
    for (let [key, value] of form.entries()) {
      console.log(`${key}: ${value}`);
    }
    const response = await updateBrandingOptions(form);
    console.log(response);
    setLoading(false);
    navigate("/savedProfile"); // Uncomment when ready to navigate
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check character limit for the specific input field
    if (value.length <= charLimits[name]) {
      setFormData({
        ...formData,
        [name]: value,
      });
      setCharCount({
        ...charCount,
        [name]: value.length,
      });
      setError({
        ...error,
        [name]: "", // Clear error if valid
      });
    } else {
      setError({
        ...error,
        [name]: `Character limit exceeded. Max ${charLimits[name]} characters allowed.`,
      });
    }
  };

  const subcategoryData = {
    D1: {
      title: string.regispopop,
      disc: string.regispodisc,
      label1: string.regispopoplabel1,
      uploadtitle: string.regispopoplabel2,
      uploaddisc: string.regispopopupload,
      btn1: string.exhibitionDoItLaterBtn,
      btn2: string.exhibitionSubmitBtn,
      uploadsize: string.regispopopuploadSize,
    },
    D2: {
      title: string.lanyardSponsor,
      disc: string.regispodisc,
      uploadtitle: string.regispopoplabel2,
      uploaddisc: string.regispopopupload,
      btn1: string.exhibitionDoItLaterBtn,
      btn2: string.exhibitionSubmitBtn,
      uploadsize: string.regispopopuploadSize,
    },
    D3: {
      title: string.delegatepop,
      disc: string.regispodisc,
      uploadtitle: string.regispopoplabel2,
      uploaddisc: string.regispopopupload,
      btn1: string.exhibitionDoItLaterBtn,
      btn2: string.exhibitionSubmitBtn,
      uploadsize: string.regispopopuploadSize,
    },
    D4: {
      title: string.namesponsor,
      disc: string.regispodisc,
      uploadtitle: string.regispopoplabel2,
      uploaddisc: string.regispopopupload,
      btn1: string.exhibitionDoItLaterBtn,
      btn2: string.exhibitionSubmitBtn,
      uploadsize: string.regispopopuploadSize,
    },
    D5: {
      title: string.lunchpop1,
      label1: string.lunchspopoplabel1,
      disc: string.regispodisc,
      uploadtitle: string.regispopoplabel2,
      uploaddisc: string.regispopopupload,
      btn1: string.exhibitionDoItLaterBtn,
      btn2: string.exhibitionSubmitBtn,
      uploadsize: string.regispopopuploadSize,
    },
    D6: {
      title: string.lunchpop2,
      label1: string.lunchspopoplabel1,
      disc: string.regispodisc,
      uploadtitle: string.regispopoplabel2,
      uploaddisc: string.regispopopupload,
      btn1: string.exhibitionDoItLaterBtn,
      btn2: string.exhibitionSubmitBtn,
      uploadsize: string.regispopopuploadSize,
    },
    D7: {
      title: string.refreshment1,
      label1: string.lunchspopoplabel1,
      disc: string.regispodisc,
      uploadtitle: string.regispopoplabel2,
      uploaddisc: string.regispopopupload,
      btn1: string.exhibitionDoItLaterBtn,
      btn2: string.exhibitionSubmitBtn,
      uploadsize: string.regispopopuploadSize,
    },
    D8: {
      title: string.refreshment2,
      label1: string.lunchspopoplabel1,
      disc: string.regispodisc,
      uploadtitle: string.regispopoplabel2,
      uploaddisc: string.regispopopupload,
      btn1: string.exhibitionDoItLaterBtn,
      btn2: string.exhibitionSubmitBtn,
      uploadsize: string.regispopopuploadSize,
    },
  };

  const {
    title,
    disc,
    label1,
    uploadtitle,
    uploaddisc,
    uploadsize,
    btn1,
    btn2,
  } = subcategoryData[subcategory];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-opacity-100 bg-black/25 backdrop-blur-lg">
      <div
        ref={{ payRef, scrollableRef }}
        className="container 3xl:w-[70%] w-[85%] font-poppins md:2/3 lg:w-[65%] overflow-hidden h-[80vh]"
      >
        <div className="rounded-xl bg-white p-2 md:px-6 h-full overflow-y-auto">
          <div className="px-3 md:flex md:flex-col py-4 md:gap-2">
            <div>
              <button
                onClick={handleClose}
                className="flex items-center gap-2 font-semibold text-xl rounded-full bg-footerblue text-white p-1 px-2 pr-3"
              >
                <FaArrowLeft /> Back
              </button>
            </div>
            <div className="space-y-4 lg:space-y-8">
              <div>
                <h2 className="font-semibold text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                  {subcategory}{" "}{title}
                </h2>
                <div className="text-xs md:text-sm xl:text-base 2xl:text-lg text-iconborder font-normal">
                  {disc}
                </div>
              </div>
              {label1 ? (
                <div>
                  <div className="text-sm md:text-base xl:text-lg 2xl:text-xl">
                    {label1}
                  </div>
                  <textarea
                    name="sponsor_name"
                    id="message"
                    value={formData.sponsor_name || ""}
                    onChange={handleInputChange}
                    className="w-full outline-none rounded-md bg-communicationbg p-2"
                  ></textarea>
                  <div className="text-right text-gray-500">
                    {charCount.sponsor_name}/{charLimits.sponsor_name}
                  </div>
                  {error.sponsor_name && (
                    <div className="text-red text-sm">
                      {error.sponsor_name}
                    </div>
                  )}
                </div>
              ) : (
                <></>
              )}
              {uploadtitle ? (
                <div>
                  <div className=" text-sm md:text-base xl:text-lg 2xl:text-xl">
                    {uploadtitle}
                  </div>
                  <div
                    onClick={() => handleImageClick(fileInputRef1)}
                    className={` flex flex-col justify-center items-center  rounded-md bg-communicationbg 
                          ${imagePreview ? "p-4" : "p-6 md:p-10  md:mb-10"}`}
                  >
                    {imagePreview ? (
                      <div className=" flex flex-col items-center">
                        <img
                          src={imagePreview}
                          alt="Uploaded Preview"
                          className="cursor-pointer rounded-md"
                          style={{ maxHeight: "200px", maxWidth: "100%" }}
                        />
                        <input
                          type="file"
                          ref={fileInputRef1}
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        />
                      </div>
                    ) : (
                      <>
                        <img
                          src={blankProfile}
                          alt="Sponsor Logo"
                          className="cursor-pointer w-12 h-12 "
                        />
                        <input
                          type="file"
                          ref={fileInputRef1}
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        />
                        <div className="text-footerblue/70 text-sm md:text-base text-center xl:text-lg 2xl:text-xl">
                          {uploaddisc}
                        </div>
                        <div className="text-footerblue/20 text-sm md:text-base text-center xl:text-lg 2xl:text-xl">
                          {uploadsize}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : null}
              <div className="text-textblue text-sm md:text-base xl:text-lg 2xl:text-xl">
                <span className="font-semibold">{string.noteBold}</span>
                {string.noteLine}
              </div>
              <div className="text-textblue">For technical assistance please contact Heera Singh 9582649664</div>
              <div className=" flex gap-2">
                <button
                  onClick={handleSubmit}
                  className=" text-textblue border-[1px] border-textblue py-2 text-center w-full rounded-lg text-sm md:text-base xl:text-lg 2xl:text-xl"
                >
                  {btn1}
                </button>
                <button
                  onClick={handleSave}
                  className="bg-textblue text-white py-2 text-center w-full rounded-lg text-sm md:text-base xl:text-lg 2xl:text-xl"
                >
                  {btn2}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonBrandPop;
