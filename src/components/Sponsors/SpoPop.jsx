import React, { useEffect, useRef, useState } from "react";
import upload from "../../assets/upload.png";
import { FaArrowLeft } from "react-icons/fa";
import sponsor from "../../constants/sponsor";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  fetchSponsorshipOption,
  getPresentation,
  updateSponsorshipOption,
} from "../../apiEndpoints";
import pdf from './../../assets/uploadDocument.png'
import pdfIcon from './../../assets/uploadedDocument.jpg'
import CasualVisitorForm from "../ExhibitionOptions/CasualVisitorForm";
import exhibitionOptions from "../../constants/exhibitionOptions";


const SpoPop = () => {
  const { child_category } = useParams();
  const { subcategory } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [originalData, setOriginalData] = useState({});

  const [imagePreviews, setImagePreviews] = useState({
    presentation_file: null,
    presentation_cover_image: null,
    speaker_photo: null,
    company_logo: null,
    full_page_advt: null,
  });

  const fileInputRefPresentation = useRef(null);
  const fileInputRefPresentationCoverImage = useRef(null);
  const fileInputRefSpeaker = useRef(null);
  const fileInputRefLogo = useRef(null);
  const fileInputRefAdvt = useRef(null);

  const [formData, setFormData] = useState({
    workshop_or_presentation_title: "",
    speaker_name: "",
    speaker_biodata: "",
    fascia_name: "",
    presentation_file: null,
    presentation_cover_image: null,
    speaker_photo: null,
    company_logo: null,
    full_page_advt: null,
    casual_visitor1_name: "",
    casual_visitor1_email: "",
    casual_visitor1_mob_no: "",
    casual_visitor2_name: "",
    casual_visitor2_email: "",
    casual_visitor2_mob_no: "",
    presentation_name: "",
  });
  const [charCount, setCharCount] = useState({
    workshop_or_presentation_title: 0,
    speaker_name: 0,
    speaker_biodata: 0,
    fascia_name: 0,
  });
  const [error, setError] = useState({
    workshop_or_presentation_title: "",
    speaker_name: "",
    speaker_biodata: "",
    fascia_name: "",
  });
  // Define character limits for each input field
  const charLimits = {
    workshop_or_presentation_title: 100,
    speaker_name: 100,  // Example limit for the second field
    speaker_biodata: 500, // Example limit for the third field
    fascia_name: 30,
    casual_visitor1_name: 50,
    casual_visitor1_email: 100,
    casual_visitor1_mob_no: 10,
    casual_visitor2_name: 50,
    casual_visitor2_email: 100,
    casual_visitor2_mob_no: 10,
  };


  const handleImageClick = (ref) => {
    if (ref && ref.current) {
      ref.current.click();
    }
  };

  // Handle file upload and preview with validation for file size
  const handleFileChange = (event, fieldName) => {
    const file = event.target.files[0];

    // Check if a file is selected
    if (!file) {
      return; // Exit if no file is selected
    }

    // Log the file name to the console
    console.log(`File selected: ${file.name}`);

    // Apply size limits only to speaker_photo and company_logo
    if (fieldName === "speaker_photo" && file.size > 1048576) {
      Swal.fire({
        icon: "error",
        title: "File Size Error",
        text: "File size for Speaker Photo should not exceed 1 MB.",
      });
      // Reset file input so the same file can be uploaded again
      event.target.value = null;
      return;
    } else if (fieldName === "company_logo" && file.size > 10485760) {
      Swal.fire({
        icon: "error",
        title: "File Size Error",
        text: "File size for Company Logo should not exceed 10 MB.",
      });
      // Reset file input so the same file can be uploaded again
      event.target.value = null;
      return;
    }

    // Create a URL for the uploaded file for preview
    const fileUrl = URL.createObjectURL(file);

    // Update image previews state
    setImagePreviews((prevPreviews) => ({
      ...prevPreviews,
      [fieldName]: { fileUrl, fileName: file.name },
    }));

    // Update formData with the new file
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [fieldName]: file,
      };

      // Only update presentation_name if the fieldName corresponds to presentation_file
      if (fieldName === "presentation_file") {
        updatedFormData.presentation_name = file.name; // Store the file name in presentation_name
      }

      return updatedFormData;
    });

    // Show success alert after uploading the document
    Swal.fire({
      icon: "success",
      title: "Document Uploaded",
      text: "Your document has been uploaded successfully.",
    });
  };






  const payRef = useRef(null);
  const handleClickOutside = (e) => {
    if (payRef.current && !payRef.current.contains(e.target)) {
      navigate(-1);
    }
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (child_category) {
          const response = await fetchSponsorshipOption(child_category); // Fetch data using GET
          if (response?.success) {
            const data = response?.data;

            setFormData({
              workshop_or_presentation_title:
                data?.workshop_or_presentation_title || "",
              speaker_name: data?.speaker_name || "",
              presentation_name: data?.presentation_name || "",
              speaker_biodata: data?.speaker_biodata || "",
              fascia_name: data?.fascia_name || "",
              presentation_file: null,
              presentation_cover_image: null,
              speaker_photo: null,
              company_logo: null,
              full_page_advt: null,
              casual_visitor1_name: data?.casual_visitor1_name || "",
              casual_visitor1_email: data?.casual_visitor1_email || "",
              casual_visitor1_mob_no: data?.casual_visitor1_mob_no || "",
              casual_visitor2_name: data?.casual_visitor2_name || "",
              casual_visitor2_email: data?.casual_visitor2_email || "",
              casual_visitor2_mob_no: data?.casual_visitor2_mob_no || "",
            });

            setOriginalData({
              presentation_file: data?.presentation_file,
              presentation_cover_image: data?.presentation_cover_image,
              speaker_photo: data?.speaker_photo,
              company_logo: data?.company_logo,
              full_page_advt: data?.full_page_advt,
            });

            setImagePreviews({
              presentation_file: data?.presentation_file
                ? `${process.env.REACT_APP_BASE_URI}/storage/${data.presentation_file}`
                : "",
              presentation_cover_image: data?.presentation_cover_image
                ? `${process.env.REACT_APP_BASE_URI}/storage/${data.presentation_cover_image}`
                : "",
              speaker_photo: data?.speaker_photo
                ? `${process.env.REACT_APP_BASE_URI}/storage/${data.speaker_photo}`
                : "",
              company_logo: data?.company_logo
                ? `${process.env.REACT_APP_BASE_URI}/storage/${data.company_logo}`
                : "",
              full_page_advt: data?.full_page_advt
                ? `${process.env.REACT_APP_BASE_URI}/storage/${data.full_page_advt}`
                : "",
            });
          } else {
            Swal.fire(
              "Error",
              response?.message || "Error fetching data",
              "error"
            );
          }
        }
      } catch (error) {
        // Swal.fire("Error", "Failed to fetch data", "error");
      }
    };

    fetchData();
  }, [child_category]);
  const handleSave = async () => {
    setLoading(true);
    const form = new FormData();

    // Appending the relevant fields
    form.append("child_category", child_category);
    form.append("subcategory", subcategory);

    // Assuming 'category' is derived from the first character of child_category
    form.append("category", child_category[0]);

    // Append only the formData fields that are not null/empty and are different from originalData
    Object.keys(formData).forEach((key) => {
      if (formData[key] instanceof File && formData[key]) {
        // Append file if it's a valid File object
        form.append(key, formData[key]);
      } else if (
        formData[key] !== null &&
        formData[key] !== "" &&
        formData[key] !== originalData[key] // Ensure only changes are appended
      ) {
        form.append(key, formData[key]);
      }
    });

    // Special handling for presentation_name
    if (formData.presentation_name && formData.presentation_name !== originalData.presentation_name) {
      form.append("presentation_name", formData.presentation_name);
    }

    // Saving data
    try {
      const response = await updateSponsorshipOption(form);

      if (response?.success) {
        // Navigate after successful save
        navigate("/savedProfile");
      } else {
        // Show error message if the save fails
        Swal.fire(
          "Error",
          response?.message || "Error updating profile",
          "error"
        );
      }
    } catch (error) {
      // Handle any unexpected errors
      Swal.fire("Error", "Error updating profile", "error");
    } finally {
      // Stop loading spinner/animation
      setLoading(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the field is for mobile number
    if (name.includes("mob_no")) {
      const numericValue = value.replace(/[^0-9]/g, ""); // Remove any non-numeric characters

      if (numericValue.length <= 10) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: numericValue,
        }));
        setError((prevError) => ({
          ...prevError,
          [name]: numericValue.length === 10 || numericValue.length === 0 ? "" : "Mobile number must be exactly 10 digits.",
        }));
      }

      // Check if the field is for email
    } else if (name.includes("email")) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      // Simple email validation regex
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (value === "" || emailPattern.test(value)) {
        setError((prevError) => ({
          ...prevError,
          [name]: "", // Clear error if valid or empty
        }));
      } else {
        setError((prevError) => ({
          ...prevError,
          [name]: "Please enter a valid email address.",
        }));
      }
    } else {
      // Regular input handling for other fields
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

  const child_categoryData = {
    B1: {
      title: sponsor.platinumpoptitle, disc: sponsor.platinumpopdisc, minipoint1: sponsor.assoMiniPoint1, minipoint2: sponsor.assoMiniPoint2, point1: sponsor.assolabel1, textlimit: sponsor.newsletterinputdisc1, point2: sponsor.assolabel2, textlimit2: sponsor.max30,
      uploadtitle1: sponsor.assoUploadTitle1, uploaddisc1: sponsor.assoUploadTitle1Disc, uploaddiscSize1: sponsor.assoUploadTitle1DiscSize, uploadtitle2: sponsor.assoUploadTitle2, uploaddisc2: sponsor.assoUploadTitle2Disc,
      uploaddiscSize2: sponsor.assoUploadTitle2DiscSize, uploadtitle3: sponsor.assoUploadTitle3, uploaddisc3: sponsor.assoUploadTitle3Disc, uploaddiscSize3: sponsor.assoUploadTitle3DiscSize,
      uploadtitle4: sponsor.assoUploadTitle4, uploaddisc4: sponsor.assoUploadTitle4Disc, uploaddiscSize4: sponsor.assoUploadTitle4DiscSize, btn1: sponsor.doItLater, btn2: sponsor.submit, casualVisitorForm1: exhibitionOptions.exhibitionOrder.details.casualVisitorForms[0],
      casualVisitorForm2: exhibitionOptions.exhibitionOrder.details.casualVisitorForms[1], uploaddisc5: sponsor.strategicUploadTitle5, uploaddiscSize5: sponsor.strategicUploadTitle5Disc
    },
    B2: {
      title: sponsor.goldpoptitle, disc: sponsor.goldpopdisc, minipoint1: sponsor.assoMiniPoint1, minipoint2: sponsor.assoMiniPoint2, point1: sponsor.assolabel1, textlimit: sponsor.newsletterinputdisc1, point2: sponsor.assolabel2, textlimit2: sponsor.max30,
      uploadtitle1: sponsor.assoUploadTitle1, uploaddisc1: sponsor.assoUploadTitle1Disc, uploaddiscSize1: sponsor.assoUploadTitle1DiscSize, uploadtitle2: sponsor.assoUploadTitle2,
      uploaddisc2: sponsor.assoUploadTitle2Disc, uploaddiscSize2: sponsor.assoUploadTitle2DiscSize, uploadtitle3: sponsor.assoUploadTitle3, uploaddisc3: sponsor.assoUploadTitle3Disc,
      uploaddiscSize3: sponsor.assoUploadTitle3DiscSize, uploadtitle4: sponsor.assoUploadTitle4, uploaddisc4: sponsor.assoUploadTitle4Disc, uploaddiscSize4: sponsor.assoUploadTitle4DiscSize,
      btn1: sponsor.doItLater, btn2: sponsor.submit, casualVisitorForm1: exhibitionOptions.exhibitionOrder.details.casualVisitorForms[0], uploaddisc5: sponsor.strategicUploadTitle5, uploaddiscSize5: sponsor.strategicUploadTitle5Disc
    },
    B3: {
      title: sponsor.silverpoptitle, disc: sponsor.silverpopdisc, minipoint1: sponsor.assoMiniPoint1, minipoint2: sponsor.assoMiniPoint2, point1: sponsor.assolabel1, textlimit: sponsor.newsletterinputdisc1, point2: sponsor.assolabel2, textlimit2: sponsor.max30, uploadtitle1: sponsor.assoUploadTitle1, uploaddisc1: sponsor.assoUploadTitle1Disc,
      uploaddiscSize1: sponsor.assoUploadTitle1DiscSize, uploadtitle2: sponsor.assoUploadTitle2, uploaddisc2: sponsor.assoUploadTitle2Disc, uploaddiscSize2: sponsor.assoUploadTitle2DiscSize, uploadtitle3: sponsor.assoUploadTitle3, uploaddisc3: sponsor.assoUploadTitle3Disc, uploaddiscSize3: sponsor.assoUploadTitle3DiscSize, uploadtitle4: sponsor.assoUploadTitle4, uploaddisc4: sponsor.assoUploadTitle4Disc, uploaddiscSize4: sponsor.assoUploadTitle4DiscSize, btn1: sponsor.doItLater, uploaddisc5: sponsor.strategicUploadTitle5, uploaddiscSize5: sponsor.strategicUploadTitle5Disc,
      btn2: sponsor.submit,
    },
    B4: {
      title: sponsor.techpoptitle,
      disc: sponsor.techpopdisc,
      minipoint1: sponsor.assoMiniPoint2,
      minipoint2: sponsor.straMiniPoint1,
      point1: sponsor.assolabel1,
      textlimit: sponsor.newsletterinputdisc1,
      point2: sponsor.assolabel2,
      textlimit2: sponsor.max30,
      uploadtitle1: sponsor.strategicUploadTitle4,
      uploaddisc1: sponsor.strategicUploadTitle4Disc,
      uploaddiscSize1: sponsor.strategicUploadTitle4DiscSize,
      uploadtitle2: sponsor.strategicUploadTitle3,
      uploaddisc2: sponsor.strategicUploadTitle3Disc,
      uploaddiscSize2: sponsor.strategicUploadTitle3DiscSize,
      uploadtitle3: sponsor.strategicUploadTitle1,
      uploaddisc3: sponsor.strategicUploadTitle1Disc,
      uploaddiscSize3: sponsor.strategicUploadTitle1DiscSize,
      uploadtitle4: sponsor.strategicUploadTitle2,
      uploaddisc4: sponsor.strategicUploadTitle2Disc,
      uploaddiscSize4: sponsor.strategicUploadTitle2DiscSize,
      uploaddisc5: sponsor.strategicUploadTitle5, uploaddiscSize5: sponsor.strategicUploadTitle5Disc,
      btn1: sponsor.doItLater,
      btn2: sponsor.submit,
      casualVisitorForm1:
        exhibitionOptions.exhibitionOrder.details.casualVisitorForms[0],
      casualVisitorForm2:
        exhibitionOptions.exhibitionOrder.details.casualVisitorForms[1],
      index: 1,
    },
    B5: {
      title: sponsor.innopoptitle,
      disc: sponsor.innopopdisc,
      minipoint1: sponsor.assoMiniPoint2,
      minipoint2: sponsor.straMiniPoint1,
      point1: sponsor.assolabel1,
      textlimit: sponsor.newsletterinputdisc1,
      point2: sponsor.assolabel2,
      textlimit2: sponsor.max30,
      uploadtitle1: sponsor.strategicUploadTitle4,
      uploaddisc1: sponsor.strategicUploadTitle4Disc,
      uploaddiscSize1: sponsor.strategicUploadTitle4DiscSize,
      uploadtitle2: sponsor.strategicUploadTitle3,
      uploaddisc2: sponsor.strategicUploadTitle3Disc,
      uploaddiscSize2: sponsor.strategicUploadTitle3DiscSize,
      uploadtitle3: sponsor.strategicUploadTitle1,
      uploaddisc3: sponsor.strategicUploadTitle1Disc,
      uploaddiscSize3: sponsor.strategicUploadTitle1DiscSize,
      uploadtitle4: sponsor.strategicUploadTitle2,
      uploaddisc4: sponsor.strategicUploadTitle2Disc,
      uploaddiscSize4: sponsor.strategicUploadTitle2DiscSize,
      btn1: sponsor.doItLater,
      btn2: sponsor.submit, uploaddisc5: sponsor.strategicUploadTitle5, uploaddiscSize5: sponsor.strategicUploadTitle5Disc,
      casualVisitorForm1:
        exhibitionOptions.exhibitionOrder.details.casualVisitorForms[0],
      index: 1,
    },
    B6: {
      title: sponsor.techpoptitle, disc: sponsor.techpopdisc, minipoint1: sponsor.assoMiniPoint2, minipoint2: sponsor.straMiniPoint1, point1: sponsor.assolabel1, textlimit: sponsor.newsletterinputdisc1,
      point2: sponsor.assolabel2, textlimit2: sponsor.max30, uploadtitle1: sponsor.strategicUploadTitle4,
      uploaddisc1: sponsor.strategicUploadTitle4Disc,
      uploaddiscSize1: sponsor.strategicUploadTitle4DiscSize,
      uploadtitle2: sponsor.strategicUploadTitle3,
      uploaddisc2: sponsor.strategicUploadTitle3Disc,
      uploaddiscSize2: sponsor.strategicUploadTitle3DiscSize,
      uploadtitle3: sponsor.strategicUploadTitle1,
      uploaddisc3: sponsor.strategicUploadTitle1Disc,
      uploaddiscSize3: sponsor.strategicUploadTitle1DiscSize,
      uploadtitle4: sponsor.strategicUploadTitle2,
      uploaddisc4: sponsor.strategicUploadTitle2Disc, uploaddisc5: sponsor.strategicUploadTitle5, uploaddiscSize5: sponsor.strategicUploadTitle5Disc,
      uploaddiscSize4: sponsor.strategicUploadTitle2DiscSize, btn1: sponsor.doItLater, btn2: sponsor.submit, index: 1,
      casualVisitorForm1:
        exhibitionOptions.exhibitionOrder.details.casualVisitorForms[0],
    },
  };

  const {
    title, disc, point1, point2, textlimit2, uploadtitle1, uploaddisc1, uploaddiscSize1, uploadtitle2, uploaddisc2, uploaddiscSize2, uploadtitle3, uploaddisc3,
    uploaddiscSize3, uploadtitle4, uploaddisc4, uploaddiscSize4, uploaddisc5, uploaddiscSize5, btn1, btn2, minipoint1, minipoint2, textlimit, index, casualVisitorForm1,
    casualVisitorForm2,
  } = child_categoryData[child_category];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-opacity-100 bg-black/25 backdrop-blur-lg">
      <div
        ref={{ payRef, scrollableRef }}
        className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] p-4 bg-white rounded-lg overflow-hidden h-[80vh]">
        <div className="rounded-xl bg-white h-full overflow-y-auto">
          <div className="px-3 md:flex md:flex-col ">
            <div>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 font-semibold text-xl rounded-full bg-footerblue text-white p-1 px-2 pr-3"
              >
                <FaArrowLeft /> Back
              </button>
            </div>
            <div>
              <h2 className="font-semibold text-base md:text-lg lg:text-xl xl:text-2xl ">
                {child_category}{" "}{title}
              </h2>
              <div className="text-xs md:text-sm xl:text-base 2xl:text-lg text-iconborder font-normal">
                {disc}
              </div>
            </div>
            <div
              className={` flex ${index ? "flex-col-reverse " : "flex-col"
                }`}
            >
              <div className="">
                <div className="flex gap-4 w-full text-sm md:text-base 2xl:text-lg">
                  <div className="w-full">
                    <div>{minipoint1}</div>
                    <input
                      name="workshop_or_presentation_title"
                      type="text"
                      value={formData.workshop_or_presentation_title || ""}
                      onChange={handleInputChange}
                      className="bg-inputcolor rounded-lg w-full outline-none p-2"
                    />
                    <div className="text-right text-gray-500">
                      {charCount.workshop_or_presentation_title}/{charLimits.workshop_or_presentation_title}
                    </div>
                    {error.workshop_or_presentation_title && (
                      <div className="text-red text-sm">
                        {error.workshop_or_presentation_title}
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    <div>{minipoint2}</div>
                    <input
                      name="speaker_name"
                      value={formData.speaker_name || ""}
                      onChange={handleInputChange}
                      type="text"
                      className="bg-inputcolor rounded-lg w-full outline-none p-2"
                    />
                    <div className="text-right text-gray-500">
                      {charCount.speaker_name}/{charLimits.speaker_name}
                    </div>
                    {error.speaker_name && (
                      <div className="text-red text-sm">
                        {error.speaker_name}
                      </div>
                    )}
                  </div>
                </div>
                <div className="">
                  <div className="text-sm md:text-base 2xl:text-lg">
                    {point1}
                  </div>
                  <input
                    type="text"
                    name="speaker_biodata"
                    value={formData.speaker_biodata || ""}
                    onChange={handleInputChange}
                    className="bg-inputcolor rounded-lg w-full outline-none p-2"
                  />
                  <div className="text-right text-footerblue text-sm md:text-base 2xl:text-xl">
                    {textlimit}
                  </div>
                  <div className="text-right text-gray-500">
                    {charCount.speaker_biodata}/{charLimits.speaker_biodata}
                  </div>
                  {error.speaker_biodata && (
                    <div className="text-red text-sm">
                      {error.speaker_biodata}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="w-full">
                  <div className="text-sm md:text-base 2xl:text-lg">
                    {uploadtitle1}
                  </div>
                  <div
                    onClick={() => handleImageClick(fileInputRefPresentationCoverImage)}
                    className={` flex flex-col justify-center items-center rounded-md bg-communicationbg 
                      ${imagePreviews.presentation_cover_image
                        ? "p-2 lg:p-4"
                        : ""
                      }`}
                  >
                    <div className="relative w-full h-0 pb-[50%] flex flex-col items-center justify-center overflow-hidden rounded-lg xl:rounded-3xl">
                      {imagePreviews.presentation_cover_image ? (
                        <div className="w-full h-full absolute top-0">
                          <img
                            src={
                              !imagePreviews.presentation_cover_image.fileUrl
                                ? imagePreviews.presentation_cover_image
                                : imagePreviews.presentation_cover_image.fileUrl
                            }
                            alt="" className="w-[50%] h-full mx-auto " />
                        </div>
                      ) : (
                        <img
                          src={pdf}
                          alt="Presentation File Preview"
                          className="w-12 h-12 absolute top-4 xl:top-8 2xl:top-12"
                        />
                      )}
                      <input
                        type="file"
                        ref={fileInputRefPresentationCoverImage}
                        style={{ display: "none" }}
                        onChange={(e) =>
                          handleFileChange(e, "presentation_cover_image")
                        }
                      />
                      {!imagePreviews.presentation_cover_image ? (
                        <div className="text-center absolute bottom-0 xl:bottom-4 pb-2 px-1 ">
                          <div className="text-footerblue/70 text-sm md:text-base xl:text-lg">
                            {uploaddisc5}
                          </div>
                          <div className="text-footerblue/20 text-xs md:text-sm">
                            {uploaddiscSize5}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="text-sm md:text-base 2xl:text-lg">
                    {uploadtitle1}
                  </div>
                  <div
                    onClick={() => handleImageClick(fileInputRefPresentation)}
                    className={` flex flex-col justify-center items-center rounded-md bg-communicationbg 
                      ${imagePreviews.presentation_file
                        ? "p-2 lg:p-4"
                        : ""
                      }`}
                  >
                    <div className="relative w-full h-0 pb-[50%] flex flex-col items-center justify-center overflow-hidden rounded-lg xl:rounded-3xl">
                      {imagePreviews.presentation_file ? (
                        <div className="w-full  absolute top-0">
                          <img src={pdfIcon} alt="" className="w-[30%] mx-auto " />
                        </div>
                      ) : (
                        <img
                          src={pdf}
                          alt="Presentation File Preview"
                          className="w-12 h-12 absolute top-4 xl:top-8 2xl:top-12"
                        />
                      )}
                      <input
                        type="file"
                        ref={fileInputRefPresentation}
                        style={{ display: "none" }}
                        onChange={(e) =>
                          handleFileChange(e, "presentation_file")
                        }
                      />
                      {!imagePreviews.presentation_file ? (
                        <div className="text-center absolute bottom-4 pb-2 px-1 ">
                          <div className="text-footerblue/70 text-sm md:text-base xl:text-lg">
                            {uploaddisc1}
                          </div>
                          <div className="text-footerblue/20 text-xs md:text-sm">
                            {uploaddiscSize1}
                          </div>
                        </div>
                      ) : (
                        <div className="absolute bottom-0 text-footerblue/80 text-sm text-center">
                          {formData?.presentation_name ? formData?.presentation_name : imagePreviews.presentation_file.fileName || ""}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="text-sm md:text-base 2xl:text-lg">
                    {uploadtitle2}
                  </div>
                  <div
                    onClick={() => handleImageClick(fileInputRefSpeaker)}
                    className={` flex flex-col justify-center items-center rounded-md bg-communicationbg 
                      ${imagePreviews.speaker_photo ? "p-2 lg:p-4" : ""}`}
                  >
                    {/* {imagePreviews.speaker_photo ? ( */}
                    <div className="relative w-full h-0 pb-[50%] flex flex-col justify-center items-center overflow-hidden rounded-lg xl:rounded-3xl">
                      {imagePreviews.speaker_photo ? (
                        <img
                          src={
                            !imagePreviews.speaker_photo.fileUrl
                              ? imagePreviews.speaker_photo
                              : imagePreviews.speaker_photo.fileUrl
                          }
                          alt="Speaker Photo Preview"
                          className="absolute top-0 w-[60%] h-full object-cover "
                        />
                      ) : (
                        <img
                          src={upload}
                          alt="Upload Icon"
                          className="w-12 h-12 absolute top-4 xl:top-8 2xl:top-12"
                        />
                      )}
                      <input
                        type="file"
                        ref={fileInputRefSpeaker}
                        onChange={(e) => handleFileChange(e, "speaker_photo")}
                        style={{ display: "none" }}
                      />
                      {!imagePreviews.speaker_photo && (
                        <div className="text-center absolute bottom-4 pb-2 px-1">
                          <div className="text-footerblue/70 text-sm md:text-base xl:text-lg">
                            {uploaddisc2}
                          </div>
                          <div className="text-footerblue/20 text-xs md:text-sm ">
                            {uploaddiscSize2}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="text-sm md:text-base 2xl:text-lg">
                    {uploadtitle3}
                  </div>
                  <div
                    onClick={() => handleImageClick(fileInputRefLogo)}
                    className={` flex flex-col justify-center items-center rounded-md bg-communicationbg 
                      ${imagePreviews.company_logo ? "p-2 lg:p-4" : ""}`}
                  >
                    {/* {imagePreviews.company_logo ? ( */}
                    <div className="relative w-full h-0 pb-[50%] flex flex-col justify-center items-center overflow-hidden rounded-lg xl:rounded-3xl">
                      {imagePreviews.company_logo ? (
                        <img
                          src={!imagePreviews.company_logo.fileUrl ? imagePreviews.company_logo : imagePreviews.company_logo.fileUrl}
                          alt="Company Logo Preview"
                          className="absolute top-0 w-full h-full object-cover"
                        />
                      ) : (
                        <img src={upload} alt="Upload Icon" className="w-12 h-12 absolute top-4 xl:top-8 2xl:top-12" />
                      )}
                      <input
                        type="file"
                        ref={fileInputRefLogo}
                        onChange={(e) => handleFileChange(e, "company_logo")}
                        className="hidden"
                      />
                      {!imagePreviews.company_logo &&
                        <div className="text-center absolute bottom-4 pb-2 px-1">
                          <div className="text-footerblue/70 text-sm md:text-base xl:text-lg">
                            {uploaddisc3}
                          </div>
                          <div className="text-footerblue/20 text-xs md:text-sm">
                            {uploaddiscSize3}
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="text-sm md:text-base 2xl:text-lg">
                    {uploadtitle4}
                  </div>
                  <div
                    onClick={() => handleImageClick(fileInputRefAdvt)}
                    className={` flex flex-col justify-center items-center rounded-md bg-communicationbg 
                      ${imagePreviews.full_page_advt ? "p-2 lg:p-4" : ""
                      }`}
                  >
                    {/* {imagePreviews.full_page_advt ? ( */}
                    <div className="relative w-full h-0 pb-[50%] flex flex-col justify-center items-center overflow-hidden rounded-lg xl:rounded-3xl ">
                      {/* <img
                        src={imagePreviews.full_page_advt ? imagePreviews.full_page_advt : upload}
                        alt="Full Page Ad Preview"
                        className={`absolute top-0 left-[50%] right-[50%] transform -translate-x-1/2 md:-translate-y-0 object-cover ${imagePreviews.full_page_advt ? "w-full h-full " : "w-12  h-12  xl:top-4"}`}
                      /> */}
                      {imagePreviews.full_page_advt ? (
                        <div className="w-full absolute top-0">
                          <img src={pdfIcon} alt="" className="w-[30%] mx-auto " />
                        </div>
                      ) : (
                        <img
                          src={pdf}
                          alt="Presentation File Preview"
                          className="w-12 h-12 absolute top-4 xl:top-8 2xl:top-12"
                        />
                      )}
                      <input
                        type="file"
                        ref={fileInputRefAdvt}
                        onChange={(e) =>
                          handleFileChange(e, "full_page_advt")
                        }
                        className="hidden"
                      />
                      {!imagePreviews.full_page_advt ? (
                        <div className="text-center absolute bottom-0 xl:bottom-4 pb-2 px-1">
                          <div className="text-footerblue/70 text-sm md:text-sm xl:text-lg">
                            {uploaddisc4}
                          </div>
                          <div className="text-footerblue/20 text-xs md:text-sm">
                            {uploaddiscSize4}
                          </div>
                        </div>
                      ) : (
                        < div className="absolute bottom-0 text-footerblue/80 text-sm text-center">
                          {imagePreviews.full_page_advt.fileName}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="text-sm md:text-base 2xl:text-lg">{point2}</div>
              <input
                type="text"
                name="fascia_name"
                value={formData.fascia_name || ""}
                onChange={handleInputChange}
                className="bg-inputcolor rounded-lg w-full outline-none p-2"
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
            {casualVisitorForm1 &&
              <div className="flex flex-col md:flex-row justify-between gap-4 py-4">
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
                  />
                }
              </div>
            }
            <div className="text-textblue text-sm md:text-base xl:text-lg 2xl:text-xl">
              <span className="font-semibold">{sponsor.noteBold}</span>
              {sponsor.noteLine}
            </div>
            <div className="text-textblue">For technical assistance please contact Heera Singh 9582649664</div>
            <div className="pb-4 flex gap-2 my-2">
              <button
                onClick={handleSave}
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
    </div >
  );
};

export default SpoPop;
