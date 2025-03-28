import React, { useRef, useState, useEffect } from "react";
import companyprofile from "../../assets/blankprofile.png";
import editprofile from "../../assets/EditProfile.png";
import { Link, useNavigate } from "react-router-dom";
import bluecheck from "../../assets/bluecheck.png";
import upload from "../../assets/upload.png";
import keyupload from "../../assets/keyupload.png";
import SearchableDropdown from "../SearchableDropdown";
import uploadDocument from './../../assets/uploadDocument.png'
import Swal from "sweetalert2";
import { updateUserProfile, fetchUserProfile, updateProfileImage, deleteProfile, deleteMainBusinessProfile, deleteCompanyBrochureCoverImage, deleteCompanyBrochure, deleteCompanyLogo, getBusinessActivity, getProducts, } from "../../apiEndpoints";
import BuildFullProfile from "./BuildFullProfile";
import pricelist from "../../constants/pricelist";
import { RiDeleteBinLine } from "react-icons/ri";
import pdf from './../../assets/uploadedDocument.jpg'

const UpdateProfile = () => {
  const fileInputRef0 = useRef(null);
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const fileInputRef4 = useRef(null);
  const navigate = useNavigate();
  const [plans, setPlans] = useState({});

  const [formData, setFormData] = useState({
    company: null,
    company_description: "",
    company_video: "",
    company_logo: null,
    company_brochure: null,
    main_business_name: "",
    main_business_designation: "",
    main_business_activities: [],
    main_business_products: [],
    main_business_image: null,
    profile_image: null,
    company_brochure_cover_img: null,
    company_brochure_name: "",
  });

  const [previewImages, setPreviewImages] = useState({
    company_logo: null,
    company_brochure: null,
    main_business_image: null,
    company_brochure_cover_img: null,
    profile_image: null,
  });

  const [originalData, setOriginalData] = useState({});
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSecondaryParticipant, setIsSecondaryParticipant] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [companyBrochureCover, setCompanyBrochureCover] = useState();
  // const [companyBrochure, setCompanyBrochure] = useState();
  const [main, setMain] = useState();
  const [businessActivity, setBusinessActivity] = useState([]);
  const [products, setProducts] = useState([]);

  const handleGetBusinessActivity = async () => {
    try {
      const response = await getBusinessActivity();
      if (response.data) {
        const businessActivityNames = response.data.map(activity => activity.name);
        // You can render this data in your UI, for example:
        setBusinessActivity(businessActivityNames);
      }
    } catch (error) {
      console.error("Error fetching business activities:", error);
    }
  }
  const handleGetProducts = async () => {
    try {
      const response = await getProducts();
      if (response.data) {
        const productNames = response.data.map(product => product.name);
        setProducts(productNames);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  const [brochureName, setBrochureName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserProfile();
        if (response.success && response.data.profile) {
          const {
            profile: {
              user = {},
              main_profile = null,
              other_profile = [],
              company = {},
              ...profileDetails
            } = {},
            main_profile_plan = {},
            other_profile_plan = {},
          } = response.data || {};

          const loggedInUser = response.data.profile.user_id;
          const isMainParticipantLoggedIn =
            loggedInUser === main_profile?.user_id;
          setMain(main_profile);

          const participantData = isMainParticipantLoggedIn
            ? main_profile
            : other_profile.find((p) => p.user_id === loggedInUser);

          setIsSecondaryParticipant(!isMainParticipantLoggedIn);
          setDeleteId(response.data.profile.id)
          setCompanyBrochureCover(response.data.profile.company.id)
          // Set form data, preserving previous values if they exist
          setFormData((prevData) => ({
            ...prevData,
            company: user?.company || prevData.company || "",
            company_description: company?.company_description || prevData.company_description,
            company_brochure_name: company?.company_brochure_name || prevData.company_brochure_name,
            company_video: company?.company_video || prevData.company_video,
            company_logo: prevData.company_logo, // Preserve if already set
            company_brochure: prevData.company_brochure, // Preserve if already set
            main_business_name:
              participantData?.main_business_name || prevData.main_business_name,
            main_business_designation:
              participantData?.main_business_designation || prevData.main_business_designation,
            main_business_activities:
              typeof participantData?.main_business_activities === "string"
                ? JSON.parse(participantData?.main_business_activities)
                : participantData?.main_business_activities || prevData.main_business_activities || [],
            main_business_products:
              typeof participantData?.main_business_products === "string"
                ? JSON.parse(participantData?.main_business_products)
                : participantData?.main_business_products || prevData.main_business_products || [],
            main_business_image: prevData.main_business_image, // Preserve if already set
            company_brochure_cover_img: prevData.company_brochure_cover_img, // Preserve if already set
            profile_image: main_profile?.profile_image || prevData.profile_image, // Preserve if already set
          }));
          setBrochureName(formData.company_brochure_name);

          // Set preview images, preserving previous values if they exist
          setPreviewImages((prevImages) => ({
            ...prevImages,
            company_logo: company?.company_logo
              ? `${process.env.REACT_APP_BASE_URI}/storage/${company?.company_logo}`
              : prevImages.company_logo, // Preserve if already set
            company_brochure: company?.company_brochure
              ? `${process.env.REACT_APP_BASE_URI}/storage/${company?.company_brochure}`
              : prevImages.company_brochure, // Preserve if already set
            company_brochure_cover_img: company?.company_brochure_cover_img
              ? `${process.env.REACT_APP_BASE_URI}/storage/${company?.company_brochure_cover_img}`
              : prevImages.company_brochure_cover_img, // Preserve if already set
            main_business_image: participantData?.main_business_image
              ? `${process.env.REACT_APP_BASE_URI}/storage/${participantData?.main_business_image}`
              : prevImages.main_business_image, // Preserve if already set
            profile_image: main_profile?.profile_image
              ? `${process.env.REACT_APP_BASE_URI}/storage/${main_profile?.profile_image}`
              : prevImages.profile_image, // Preserve if already set
          }));

          // Set plans, preserving any existing values
          setPlans((prevPlans) => ({
            main: { ...prevPlans.main, ...main_profile_plan },
            other: { ...prevPlans.other, ...other_profile_plan },
          }));

          // Optionally, update character count
          // setCharCount(1000 - (main_profile?.company_description?.length || prevData.company_description?.length || 0));
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();
    handleGetBusinessActivity();
    handleGetProducts();
  }, []);

  const handleImageClick = (fileInputRef) => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = async (event, key) => {
    const file = event.target.files[0];
    let sizeLimit = 0;

    // Apply size limits based on the key (subcategory)
    if (key === "company_brochure") {
      sizeLimit = 26214400; // 25 MB for company brochure
    } else if (key === "company_brochure_cover_img" || key === "profile_image") {
      sizeLimit = 1048576; // 1 MB for cover image and profile image
    }

    // Check file size
    if (sizeLimit > 0 && file.size > sizeLimit) {
      alert(`File size should not exceed ${sizeLimit / 1048576} MB for ${key}.`);
      event.target.value = null; // Reset the file input
      return;
    }

    // Handle company brochure upload
    if (key === "company_brochure") {
      setBrochureName(file.name); // Set the brochure name to the file name
      // setFormData((prevData) => ({
      //   ...prevData,
      //   company_brochure_name: file.name, // Update the formData with the new file name
      // }));
    }

    // Handle profile image upload
    if (key === "profile_image") {
      const form = new FormData();
      form.append("image", file);

      try {
        const response = await updateProfileImage(form); // API call to upload the image

        if (response.success) {
          setFormData((prevData) => ({
            ...prevData,
            [key]: file,
          }));

          const reader = new FileReader();
          reader.onload = () => {
            setPreviewImages((prevImages) => ({
              ...prevImages,
              [key]: reader.result,
            }));
          };
          reader.readAsDataURL(file);

          Swal.fire({
            icon: "success",
            title: "Profile Image Updated",
            text: "Your profile image has been updated successfully.",
          });
        } else {
          // Handle validation error response
          if (response.data && response.data.image) {
            const errorMessages = response.data.image.join(', ');
            Swal.fire({
              icon: "error",
              title: "Validation Error",
              text: errorMessages,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Image Update Failed",
              text: response?.message || "Failed to update profile image. Please try again.",
            });
          }
        }
      } catch (error) {
        console.error("Error updating profile image:", error);
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: error?.response?.data?.data?.image || "Failed to update profile image. Please try with jpg or png.",
        });
      }
    } else {
      // Handle other file uploads (non-profile)
      setFormData((prevData) => ({
        ...prevData,
        [key]: file,
      }));

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImages((prevImages) => ({
          ...prevImages,
          [key]: reader.result,
        }));

        Swal.fire({
          icon: "success",
          title: "Document Uploaded",
          text: "Your document has been uploaded successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };



  const handleSelectChange = (selected, key) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: selected.map((item) => item.value),
    }));
  };

  const handleInputChange = (e, key) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleDeleteProfilePhoto = async () => {
    console.log("click");
    try {
      await deleteProfile();
      console.log("success");
      Swal.fire({
        icon: "success",
        title: "Profile Image Deleted",
        text: "Your profile image has been deleted successfully.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Image Update Deleted",
        text: "Failed to delete profile image. Please try again.",
      });
      console.error("Failed to delete profile photo", error);
    }
  };
  const handleDeleteMainBusinessProfilePhoto = async () => {
    // console.log(deleteId);
    try {
      const response = await deleteMainBusinessProfile(deleteId);
      if (response.success) {
        console.log("Participant image deleted successfully.");
        setPreviewImages((prevImages) => ({
          ...prevImages,
          main_business_image: null, // Remove brochure cover image
        }));
        setFormData((prevData) => ({
          ...prevData,
          main_business_image: null, // Clear the image from form data
        }));
        Swal.fire({
          icon: "success",
          title: "Profile Image Deleted",
          text: "Your profile image has been deleted successfully.",
        });
      } else {
        // Handle the case where deletion failed on the backend
        throw new Error("Failed to delete image on the server.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Image Update Deleted",
        text: "Failed to delete profile image. Please try again.",
      });
      console.error("Failed to delete profile photo", error);
    }
  };
  const handleDeleteCompanyLogo = async () => {
    try {
      // Call backend to delete the image
      const response = await deleteCompanyLogo(companyBrochureCover);

      // Check if the deletion was successful
      if (response.success) {
        console.log("Company Logo deleted successfully.");

        // Update the state to remove the image from the preview
        // setCompanyBrochureCover(null); // Clear the image reference

        // Update preview images state to remove the brochure cover image from the UI
        setPreviewImages((prevImages) => ({
          ...prevImages,
          company_logo: null, // Remove brochure cover image
        }));

        // Update form data to remove the brochure cover reference
        setFormData((prevData) => ({
          ...prevData,
          company_logo: null, // Clear the image from form data
        }));

        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Company Logo Deleted",
          text: "Your company logo has been deleted successfully.",
        });
      } else {
        // Handle the case where deletion failed on the backend
        throw new Error("Failed to delete image on the server.");
      }
    } catch (error) {
      // Handle error during deletion
      Swal.fire({
        icon: "error",
        title: "Image Deletion Failed",
        text: "Failed to delete company logo. Please try again.",
      });
      console.error("Failed to delete company logo", error);
    }
  };
  const handleDeleteCompanyBrochureCoverImage = async () => {
    try {
      // Call backend to delete the image
      const response = await deleteCompanyBrochureCoverImage(companyBrochureCover);

      // Check if the deletion was successful
      if (response.success) {
        console.log("Company brochure cover image deleted successfully.");

        // Update the state to remove the image from the preview
        // setCompanyBrochureCover(null); // Clear the image reference

        // Update preview images state to remove the brochure cover image from the UI
        setPreviewImages((prevImages) => ({
          ...prevImages,
          company_brochure_cover_img: null, // Remove brochure cover image
        }));

        // Update form data to remove the brochure cover reference
        setFormData((prevData) => ({
          ...prevData,
          company_brochure_cover_img: null, // Clear the image from form data
        }));

        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Company Brochure Cover Image Deleted",
          text: "Your company brochure cover image has been deleted successfully.",
        });
      } else {
        // Handle the case where deletion failed on the backend
        throw new Error("Failed to delete image on the server.");
      }
    } catch (error) {
      // Handle error during deletion
      Swal.fire({
        icon: "error",
        title: "Image Deletion Failed",
        text: "Failed to delete company brochure cover image. Please try again.",
      });
      console.error("Failed to delete company brochure cover image", error);
    }
  };
  const handleDeleteCompanyBrochure = async () => {
    try {
      // Call backend to delete the image
      const response = await deleteCompanyBrochure(companyBrochureCover);

      // Check if the deletion was successful
      if (response.success) {
        console.log("Company brochure deleted successfully.");

        // Update the state to remove the image from the preview
        // setCompanyBrochureCover(null); // Clear the image reference

        // Update preview images state to remove the brochure cover image from the UI
        setPreviewImages((prevImages) => ({
          ...prevImages,
          company_brochure: null, // Remove brochure cover image
        }));

        // Update form data to remove the brochure cover reference
        setFormData((prevData) => ({
          ...prevData,
          company_brochure: null, // Clear the image from form data
        }));

        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Company Brochure Deleted",
          text: "Your company brochure has been deleted successfully.",
        });
      } else {
        // Handle the case where deletion failed on the backend
        throw new Error("Failed to delete image on the server.");
      }
    } catch (error) {
      // Handle error during deletion
      Swal.fire({
        icon: "error",
        title: "Image Deletion Failed",
        text: "Failed to delete company brochure. Please try again.",
      });
      console.error("Failed to delete company brochure", error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const form = new FormData();
    const role = JSON.parse(localStorage.getItem("userData")).role;

    form.append("role", role);

    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        if (formData[key].length > 0) {
          formData[key].forEach((item) => form.append(`${key}[]`, item));
        } else {
          form.append(`${key}[]`, "");
        }
      } else if (
        formData[key] !== originalData[key] &&
        formData[key] !== null &&
        formData[key] !== ""
      ) {
        form.append(key, formData[key]);
      }
    });

    try {
      const response = await updateUserProfile(form);
      setApiResponse({
        success: true,
        message: "Profile updated successfully",
      });
      console.log("Profile updated successfully:", response);
      navigate("/savedProfile");
    } catch (error) {
      const errorMessage = error?.response?.data?.errors
        ? Object.values(error.response.data.errors).flat().join(", ")
        : "Error updating profile"; // Fallback error message

      setApiResponse({
        success: false,
        message: errorMessage,
      });

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: errorMessage,
        confirmButtonText: "OK",
      });

      // alert(errorMessage); // Show error in an alert
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };


  const getPackageDescription = (packageId) => {
    const packageInfo = pricelist.basicMeetingsPackage.packages.find(
      (pkg) => pkg.id === packageId
    );
    return packageInfo ? packageInfo.title : "";
  };

  const getPlanDescription = (category, subcategory) => {
    const categoryMapping = {
      A: "basicMeetingsPackage",
      B: "sponsorship",
      C: "exhibitingOptions",
      D: "brandingOptions",
      E: "communicationOptions",
      F: "extraItems",
    };

    const actualCategory = categoryMapping[category];
    const categoryData = pricelist[actualCategory];

    if (categoryData && categoryData.options) {
      const subcategoryDetails = categoryData.options[category][subcategory];
      if (subcategoryDetails) {
        return subcategoryDetails.title;
      }
    }

    return "Plan Description Placeholder";
  };

  const addOnCategories = ["B", "C", "D", "E"];
  const fPlanCategory = ["F"];

  const allAddOns = addOnCategories.reduce((acc, category) => {
    return acc.concat(
      plans?.main?.[category] || [],
      plans?.other?.[category] || []
    );
  }, []);

  const fPlans = fPlanCategory.reduce((acc, category) => {
    return acc.concat(plans[category] || []);
  }, []);

  const columns = 2;
  const itemsPerColumn = Math.ceil(allAddOns.length / columns);

  const addOnColumns = Array.from({ length: columns }, (_, i) =>
    allAddOns.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn)
  );

  return (
    <div className="flex justify-center font-poppins">
      <div className="container 3xl:w-[70%] px-4 xl:px-20 pb-40 pt-10">
        <BuildFullProfile />

        <div className="py-12">
          <div className="relative font-EBGaramond text-center ">
            <h2 className="text-base lg:text-2xl xl:text-3xl 2xl:text-4xl font-normal py-2 uppercase">
              {JSON.parse(localStorage.getItem("userData")).role} DASHBOARD
            </h2>{" "}
            <p className="text-textblue font-poppins text-sm md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl pb-2">
              {formData.company || "Company Name"}
            </p>
            <div className="absolute bottom-0 left-[47%] w-4 md:w-8 lg:w-12 xl:w-16 h-[0.20rem] bg-[#1189CC] rounded-[20px]"></div>
          </div>
        </div>
        <div className="text-right">
          <button
            type="submit"
            onClick={handleSave}
            className="py-3 px-16  rounded-md bg-textblue text-white mb-4 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="w-full md:w-[30%] flex flex-col justify-between gap-4">
            <div className="w-full h-auto border-[1px] border-iconborder/25 rounded-2xl p-4 flex flex-col items-center">
              <div className="relative flex justify-center w-[90%] mx-auto py-4">
                {!isSecondaryParticipant &&
                  <RiDeleteBinLine onClick={handleDeleteProfilePhoto} className="absolute -top-2 cursor-pointer" />
                }
                {/* Person Image */}
                <img
                  src={previewImages.profile_image || companyprofile}
                  alt="Company Profile"
                  className="w-full md:h-60 lg:h-80 xl:h-96 "
                  onClick={() => !isSecondaryParticipant && handleImageClick(fileInputRef0)}
                />
                {!isSecondaryParticipant &&
                  <img
                    src={editprofile}
                    alt="Edit Profile"
                    className="absolute bottom-0 right-0 lg:scale-90 xl:scale-100 md:-right-5 lg:right-0 bg-white rounded-full cursor-pointer"
                    onClick={() => !isSecondaryParticipant && handleImageClick(fileInputRef0)}
                  />
                }
                {!isSecondaryParticipant &&
                  <input
                    type="file"
                    ref={fileInputRef0}
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "profile_image")}
                  />
                }
              </div>
              <div>
                <div onClick={() => console.log(formData)} className="text-lg lg:text-xl 2xl:text-2xl font-semibold  ">
                  {main?.main_business_name || "First Name"}{" "}
                </div>
                <div className="text-sm lg:text-base 2xl:text-lg text-black/50">
                  {main?.main_business_designation}
                  {/* isSecondaryParticipant
                    ? formData.main_business_designation || "Designation"
                    : formData.main_business_designation || "Designation"} */}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[70%] flex flex-col gap-4 justify-between">
            <div className="rounded-2xl h-full border-[1px] border-iconborder/25 p-4">
              <div className="relative font-EBGaramond mb-2">
                <h2 className="uppercase text-base lg:text-lg xl:text-xl 2xl:text-2xl font-normal py-1 md:py-2">
                  My Package
                </h2>
                <div className="absolute bottom-0 w-8 md:w-8 lg:w-12 xl:w-16 h-[0.20rem] bg-[#1189CC] rounded-[20px]"></div>
              </div>
              <div className="w-full flex flex-col gap-2">
                {plans?.main?.A?.map((subscription) => (
                  <div
                    className="flex gap-2 items-center"
                    key={subscription.id}
                  >
                    <img src={bluecheck} alt="Check" />
                    <div>
                      {getPackageDescription(subscription.subscription_name)}
                    </div>
                  </div>
                ))}
                {plans?.other?.A?.map((subscription) => (
                  <div
                    className="flex gap-2 items-center"
                    key={subscription.id}
                  >
                    <img src={bluecheck} alt="Check" />
                    <div>
                      {getPackageDescription(subscription.subscription_name)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl border-[1px] border-iconborder/25 h-full">
              <div className="flex justify-between">
                <div className="relative font-EBGaramond text-center mb-8">
                  <h2 className="text-left text-base lg:text-xl 2xl:text-2xl uppercase py-1">
                    My add-ons
                  </h2>
                  <div className="absolute bottom-0 w-8 md:w-8 lg:w-12 xl:w-16 h-[0.20rem] bg-[#1189CC] rounded-[20px]"></div>
                </div>
                <div>
                  <button className="rounded-full px-4 py-2 text-white bg-textblue text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                    <Link to="/pricelist">Buy add-ons</Link>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {addOnColumns.map((column, colIndex) => (
                  <div key={colIndex} className="flex flex-col gap-4">
                    {column.map((subscription) => (
                      <div
                        className="flex items-start gap-2"
                        key={subscription.id}
                      >
                        <div>
                          <img src={bluecheck} alt="Check" />
                        </div>
                        <div>
                          <div>
                            {subscription.subscription_name}. &nbsp;
                            {getPlanDescription(
                              subscription.subscription_category,
                              subscription.subscription_name
                            )}
                          </div>
                          <div>
                            Complete the requirements to fulfill your order.{" "}
                            {/* <span
                              className="text-blue-500 cursor-pointer"
                              onClick={() =>
                                navigate(`/fulfill-order/${subscription.id}`)
                              }
                            >
                              Click Here
                            </span> */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {fPlans.length > 0 && (
          <div className="bg-white p-8 mt-4 rounded-3xl border-[1px] border-iconborder/25 my-4">
            <div className="relative font-EBGaramond text-center mb-8">
              <h2 className="text-left text-base lg:text-xl 2xl:text-2xl uppercase py-1">
                My Extra Items
              </h2>
              <div className="absolute bottom-0 w-8 md:w-8 lg:w-12 xl:w-16 h-[0.20rem] bg-[#1189CC] rounded-[20px]"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {fPlans.map((subscription) => (
                <div className="flex items-start gap-2" key={subscription.id}>
                  <div>
                    <img src={bluecheck} alt="Check" />
                  </div>
                  <div>
                    <div>
                      {subscription.subscription_name}.{" "}
                      {getPlanDescription(
                        subscription.subscription_category,
                        subscription.subscription_name
                      )}
                    </div>
                    {/* <div>
                      Complete the requirements to fulfill your order.{" "}
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() =>
                          navigate(`/fulfill-order/${subscription.id}`)
                        }
                      >
                        Click Here
                      </span>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-2xl bg-white border-[1px] border-iconborder/25 mt-4 p-4 pb-8">
          <div className="relative font-EBGaramond mb-4">
            <h2 className="uppercase text-base lg:text-lg xl:text-xl 2xl:text-2xl font-normal py-1 md:py-2">
              About the Company
            </h2>
            <div className="absolute bottom-0 w-8 md:w-8 lg:w-12 xl:w-16 h-[0.20rem] bg-[#1189CC] rounded-[20px]"></div>
          </div>
          <div className="w-full text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
            <div onClick={() => console.log(formData)} className="">Company Description</div>
            <div className="w-full">
              <textarea
                name="company_description"
                // placeholder="company_description"
                id="company_description"
                rows="3"
                className="p-4 w-full bg-communicationbg outline-none rounded-xl text-black"
                value={formData?.company_description}
                onChange={(e) => handleInputChange(e, "company_description")}
              />
              {/* <p className="text-footerblue text-right">
                {charCount} characters remaining
              </p> */}
            </div>
          </div>
          <div className="w-full text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
            <div className="p-4 "
              onClick={console.log()}
            >Enter Company Video Youtube link</div>
            <div className="w-full">
              <textarea
                name="company_video"
                id="company_video"
                rows="3"
                className="w-full p-4 bg-communicationbg outline-none rounded-xl text-black"
                value={formData.company_video}
                onChange={(e) => handleInputChange(e, "company_video")}
              // disabled={!isSecondaryParticipant}
              />
            </div>
          </div>
          <div className="w-full text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
            <div className="p-4 "
              onClick={console.log()}
            >Enter Company Brochure Title</div>
            <div className="w-full">
              <input
                name="company_brochure_name"
                id="company_brochure_name"
                rows="3"
                className="w-full p-4 bg-communicationbg outline-none rounded-xl text-black"
                value={formData.company_brochure_name}
                onChange={(e) => handleInputChange(e, "company_brochure_name")}
              // disabled={!isSecondaryParticipant}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 justify-between py-8">
            <div className="w-full flex flex-col justify-between ">
              <div className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                Upload Company Logo
              </div>
              <div
                className={` h-full rounded-xl bg-communicationbg w-full flex flex-col items-center justify-center mx-auto text-center ${previewImages ? "py-0" : "py-4"
                  }`}
              >
                <RiDeleteBinLine onClick={handleDeleteCompanyLogo} className="my-1 -top-2 cursor-pointer" />
                {previewImages.company_logo ? (
                  <div className="relative w-full h-0 pb-[62.5%] overflow-hidden rounded-2xl xl:rounded-3xl">
                    <img
                      src={previewImages.company_logo}
                      alt="Company logo"
                      onClick={() => handleImageClick(fileInputRef1)}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    // className="cursor-pointer"
                    />
                    <input
                      type="file"
                      ref={fileInputRef1}
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "company_logo")}
                    // disabled={!isSecondaryParticipant}
                    />
                  </div>
                ) : (
                  <>
                    <div className="relative w-full h-0 pb-[62.5%] overflow-hidden rounded-2xl xl:rounded-3xl">
                      <img
                        src={upload}
                        alt="Company logo"
                        onClick={() => handleImageClick(fileInputRef1)}
                        className=" w-12 mx-auto "
                      // className="cursor-pointer"
                      />
                      <input
                        type="file"
                        ref={fileInputRef1}
                        className="hidden"
                        onChange={(e) => handleFileChange(e, "company_logo")}
                      // disabled={!isSecondaryParticipant}
                      />
                      <div className="text-footerblue/70 text-base lg:text-xl 2xl:text-2xl">
                        Upload Logo Here
                      </div>
                      <div className="text-footerblue/20 text-base lg:text-xl 2xl:text-2xl">
                        (jpg, png, max 1 MB, ratio 16:9)
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col justify-between ">
              <div className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                Company Brochure (Cover Image)
              </div>
              <div
                className={` h-full rounded-xl bg-communicationbg w-full flex flex-col items-center justify-center mx-auto text-center ${previewImages ? "py-0" : "py-4"
                  }`}
              >
                <RiDeleteBinLine onClick={handleDeleteCompanyBrochureCoverImage} className="my-1 -top-2 cursor-pointer" />
                {previewImages?.company_brochure_cover_img ? (
                  <div className="relative w-full h-0 pb-[62.5%] overflow-hidden rounded-2xl xl:rounded-3xl">
                    <img
                      src={previewImages?.company_brochure_cover_img}
                      alt="Upload"
                      onClick={() => handleImageClick(fileInputRef2)}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                    <input
                      type="file"
                      ref={fileInputRef2}
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "company_brochure_cover_img")}
                    // disabled={!isSecondaryParticipant}
                    />
                  </div>
                ) : (
                  <>
                    <div className="relative w-full h-0 pb-[62.5%] overflow-hidden rounded-2xl xl:rounded-3xl ">
                      <img
                        src={upload}
                        alt="Upload"
                        onClick={() => handleImageClick(fileInputRef2)}
                        className="cursor-pointer w-12 mx-auto pb-2"
                      />
                      <input
                        type="file"
                        ref={fileInputRef2}
                        className="hidden"
                        onChange={(e) =>
                          handleFileChange(e, "company_brochure_cover_img")
                        }
                      // disabled={!isSecondaryParticipant}
                      />
                      <div className="text-footerblue/70 text-sm lg:text-lg 2xl:text-2xl">
                        Upload Company Brochure cover image Here
                      </div>
                      <div className="text-footerblue/20 text-sm lg:text-lg 2xl:text-2xl pb-4">
                        (jpg, png, gif. 1 MB)
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col justify-between ">
              <div className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                Company Brochure (Document)
              </div>
              <div
                className={` h-full rounded-xl bg-communicationbg w-full flex flex-col items-center justify-center mx-auto text-center ${previewImages ? "py-0" : "py-4"
                  }`}              >
                <RiDeleteBinLine onClick={handleDeleteCompanyBrochure} className="my-1 -top-2 cursor-pointer" />
                {previewImages?.company_brochure ? (
                  <div className="relative w-full h-0 pb-[62.5%] overflow-hidden rounded-2xl xl:rounded-3xl">
                    {/* <img
                      src={previewImages?.company_brochure}
                      alt="Upload"
                      onClick={() => handleImageClick(fileInputRef3)}
                      className="cursor-pointer"
                    /> */}
                    {previewImages?.company_brochure ? (
                      <img
                        src={pdf}
                        alt="Presentation File Preview"
                        className="w-[80%] h-[80%] absolute right-[10%] top-0 xl:top-4 2xl:top-4 mx-auto"
                        onClick={() => handleImageClick(fileInputRef3)}
                      />
                    ) : (
                      <img
                        src={uploadDocument}
                        alt="Presentation File Preview"
                        className="w-[60%] h-auto mx-auto"
                        onClick={() => handleImageClick(fileInputRef3)}
                      />
                    )}
                    <input
                      type="file"
                      ref={fileInputRef3}
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "company_brochure")}
                    // disabled={!isSecondaryParticipant}
                    />
                    <div className="absolute w-full bottom-1 text-footerblue/80 text-sm text-center ">
                      {brochureName ? brochureName : ""}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="relative w-full h-0 pb-[65.5%] overflow-hidden rounded-2xl xl:rounded-3xl">
                      <img
                        src={uploadDocument}
                        alt="Upload"
                        onClick={() => handleImageClick(fileInputRef3)}
                        className="cursor-pointer w-12 mx-auto"
                      />
                      <input
                        type="file"
                        ref={fileInputRef3}
                        className="hidden"
                        onChange={(e) =>
                          handleFileChange(e, "company_brochure")
                        }
                      // disabled={!isSecondaryParticipant}
                      />
                      <div className="text-footerblue/70 text-sm lg:text-lg 2xl:text-2xl">
                        Upload Company Brochure Here
                      </div>
                      <div className="text-footerblue/20 text-sm lg:text-lg 2xl:text-2xl">
                        (Pdf, doc, docx, ppt only. 25 MB)
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 border-[1px] border-iconborder/25 rounded-3xl w-full my-4">
          <div className="relative font-EBGaramond text-center mb-4">
            <h2 className="text-left text-base lg:text-xl 2xl:text-2xl py-1 font-EBGaramond uppercase">
              {isSecondaryParticipant
                ? "Second Business Participant"
                : "Main Business Participant"}
            </h2>
            <div className="absolute bottom-0 w-4 md:w-8 lg:w-12 xl:w-16 h-[0.20rem] bg-[#1189CC] rounded-[20px]"></div>
          </div>
          <div className="flex flex-col lg:flex-row md:gap-8">
            <div className="w-full font-poppins flex flex-col gap-4">
              {["Name", "Designation"].map((field, index) => (
                <div
                  className="w-full text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
                  key={index}
                >
                  <div className="w-full font-poppins flex flex-col gap-4">
                    <div className="font-poppins">{field}</div>
                    <div className="flex justify-between items-center bg-communicationbg rounded-xl">
                      <input
                        type="text"
                        // placeholder={index === 0 ? "main business participant's name" : "main business participant's designation"}
                        value={
                          index === 0
                            ? formData.main_business_name
                            : formData.main_business_designation
                        }
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            index === 0
                              ? "main_business_name"
                              : "main_business_designation"
                          )
                        }
                        className="outline-none bg-communicationbg rounded-xl p-4 w-full text-black"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="font-poppins flex flex-col gap-4">
                <div className="font-poppins">
                  Main Business Activities (select multiple)
                </div>
                <SearchableDropdown
                  options={businessActivity}
                  isMulti
                  value={
                    Array.isArray(formData.main_business_activities)
                      ? formData.main_business_activities.map((activity) => ({
                        label: activity,
                        value: activity,
                      }))
                      : []
                  }
                  onChange={(selected) =>
                    handleSelectChange(selected, "main_business_activities")
                  }
                  placeholder="Select Business Activities"
                />
              </div>
              <div className="font-poppins flex flex-col gap-4">
                <div className="font-poppins">
                  Product/Services (select multiple)
                </div>
                <SearchableDropdown
                  options={products}
                  isMulti
                  value={formData.main_business_products.map((product) => ({
                    label: product,
                    value: product,
                  }))}
                  onChange={(selected) =>
                    handleSelectChange(selected, "main_business_products")
                  }
                  placeholder="Select Product/Services"
                />
              </div>
            </div>
            {isSecondaryParticipant &&
              <div className="w-full lg:w-[35%] rounded-xl bg-communicationbg flex justify-center mb-4 lg:pb-0 p-8 lg:p-0">
                <div className="flex flex-col items-center justify-center text-center mx-auto w-[70%] relative h-auto">
                  <RiDeleteBinLine
                    onClick={handleDeleteMainBusinessProfilePhoto}
                    className="absolute -top-2" />
                  {previewImages.main_business_image ? (
                    <>
                      <img
                        src={previewImages.main_business_image}
                        alt="Upload"
                        onClick={() => handleImageClick(fileInputRef4)}
                        className="cursor-pointer w-full "
                      />
                      <input
                        type="file"
                        ref={fileInputRef4}
                        className="hidden"
                        onChange={(e) =>
                          handleFileChange(e, "main_business_image")
                        }
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src={keyupload}
                        alt="Upload"
                        onClick={() => handleImageClick(fileInputRef4)}
                        className="cursor-pointer w-24 h-24 my-4"
                      />
                      <input
                        type="file"
                        ref={fileInputRef4}
                        className="hidden"
                        onChange={(e) =>
                          handleFileChange(e, "main_business_image")
                        }
                      />
                      <div className="text-footerblue/70">
                        Upload Participant’s Image Here
                      </div>
                    </>
                  )}
                </div>
              </div>
            }
          </div>
        </div>
        <div className="text-right">
          <button
            type="submit"
            onClick={handleSave}
            className="py-3 px-16  rounded-md bg-textblue text-white"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
        {apiResponse && (
          <div
            className={`mt-4 p-4 border-t-2 ${apiResponse.success
              ? "border-green-200 text-green-700"
              : "border-red-200 text-red-700"
              }`}
          >
            {apiResponse.message}
          </div>
        )}
        <BuildFullProfile />
      </div>
    </div >
  );
};

export default UpdateProfile;
