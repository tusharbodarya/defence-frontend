import roles from "../../utils/roles";
import React, { useState, useRef, useEffect } from "react";
import companyprofile from "../../assets/blankprofile.png";
import editprofile from "../../assets/EditProfile.png";
import ProgressBar from "@ramonak/react-progress-bar";
import {
  fetchUserProfile,
  updateUserProfile,
  updateProfileImage,
  deleteProfile,
} from "../../apiEndpoints";
import Swal from "sweetalert2";
import BuildFullProfile from "./BuildFullProfile";
import { useNavigate } from "react-router-dom";
import upload from "./../../assets/upload.png";
import SearchableDropdown from "./../SearchableDropdown";
import {
  mainBusinessActivities,
  mainBusinessProducts,
} from "./../DropdownOptions";
import { RiDeleteBinLine } from "react-icons/ri";

const UpdateKeyGovtProfile = () => {
  const fileInputRef0 = useRef(null);
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);

  const navigate = useNavigate();

  const [originalData, setOriginalData] = useState({});
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    role: roles.KEY_GOVT_OFFICER,
    main_participant_name: "",
    main_participant_designation: "",
    main_participant_org: "",
    main_participant_service: "",
    // main_participant_image: null,
    substitute_participant_name: "",
    substitute_participant_designation: "",
    substitute_participant_org: "",
    substitute_participant_service: "",
    substitute_participant_image: null,
    branch_name: "",
    branch_service: "",
    main_subjects: [],
    products_services: [],
    profile_image: null,
  });

  const [previewImages, setPreviewImages] = useState({
    profile_image: null,
    // main_participant_image: null,
    substitute_participant_image: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserProfile();
        if (response.success && response.data.profile) {
          const profileData = response.data.profile;
          setOriginalData(profileData);
          setFormData({
            role: roles.KEY_GOVT_OFFICER,
            main_participant_name: profileData.main_participant_name || "",
            main_participant_designation:
              profileData.main_participant_designation || "",
            main_participant_org: profileData.main_participant_org || "",
            main_participant_service:
              profileData.main_participant_service || "",
            // main_participant_image: null,
            substitute_participant_name:
              profileData.substitute_participant_name || "",
            substitute_participant_designation:
              profileData.substitute_participant_designation || "",
            substitute_participant_org:
              profileData.substitute_participant_org || "",
            substitute_participant_service:
              profileData.substitute_participant_service || "",
            substitute_participant_image: null,
            branch_name: profileData.branch_name || "",
            branch_service: profileData.branch_service || "",
            main_subjects: Array.isArray(profileData.main_subjects)
              ? profileData.main_subjects
              : JSON.parse(profileData.main_subjects || []),
            products_services: Array.isArray(profileData.products_services)
              ? profileData.products_services
              : JSON.parse(profileData.products_services || []),
            profile_image: null,
          });

          setPreviewImages({
            // main_participant_image: profileData.main_participant_image
            //   ? `${process.env.REACT_APP_BASE_URI}/storage/${profileData.main_participant_image}`
            //   : null,
            substitute_participant_image:
              profileData.substitute_participant_image
                ? `${process.env.REACT_APP_BASE_URI}/storage/${profileData.substitute_participant_image}`
                : null,
            profile_image: profileData.user.profile_image
              ? `${process.env.REACT_APP_BASE_URI}/storage/${profileData.user.profile_image}`
              : null,
          });
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, []);

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

  const handleImageClick = (fileInputRef) => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event, key) => {
    const file = event.target.files[0];

    if (key === "profile_image") {
      const form = new FormData();
      form.append("image", file);

      try {
        const response = await updateProfileImage(form);
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
          if (response.data && response.data.image) {
            const errorMessages = response.data.image.join(', ');
            Swal.fire({
              icon: "error",
              title: "Image Update Failed",
              text: errorMessages,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Image Update Failed",
              text: response.message || "Failed to update profile image. Please try again.",
            });
          }
        }
      } catch (error) {
        console.error("Error updating profile image:", error);
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: error?.response?.data?.data?.image,
        });
      }
    } else {
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
        // Show success alert after uploading the document
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

  const calculateCompletion = () => {
    const fields = [
      "main_participant_name",
      "main_participant_designation",
      "main_participant_org",
      "main_participant_service",
      "substitute_participant_name",
      "substitute_participant_designation",
      "substitute_participant_org",
      "substitute_participant_service",
      "branch_name",
      "branch_service",
      "main_subjects",
      "products_services",
    ];

    const filledFields = fields.filter(
      (field) => formData[field] && formData[field] !== ""
    );

    return Math.floor((filledFields.length / fields.length) * 100);
  };

  const handleSave = async () => {
    setLoading(true);
    const form = new FormData();
    const role = roles.KEY_GOVT_OFFICER;
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
      navigate("/keyGovtHome");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error updating profile. Please try again.";
      const detailedErrors = error.response?.data?.errors;  // Adjust based on backend response structure

      let fullErrorMessage = errorMessage;
      if (detailedErrors) {
        fullErrorMessage += `: ${Object.values(detailedErrors).join(', ')}`;
      }

      setApiResponse({
        success: false,
        message: fullErrorMessage,
      });

      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: fullErrorMessage,
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex justify-center bg-lightblue/70 font-poppins">
      <div className="container 3xl:w-[70%] px-4 xl:px-20 pb-40 pt-10">
        <div>
          <BuildFullProfile />
        </div>

        <div className="py-12">
          <div className="relative px-[2rem] xl:px-[22rem] font-EBGaramond text-center">
            <h2 className="text-base lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold py-2">
              KEY GOVT & SERVICES OFFICERS DASHBOARD
            </h2>
            <p className="text-textblue font-poppins text-sm md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl pb-2">
              {originalData.user?.first_name +
                " " +
                originalData.user?.last_name || "Officer’s Name"}
            </p>
            <div
              className="absolute bottom-0 left-[47%] w-4 md:w-8 lg:w-12 
            xl:w-16 h-[0.20rem] bg-[#1189CC] rounded-[20px]"
            ></div>
          </div>
        </div>

        <div className="text-right">
          <button
            type="submit"
            onClick={handleSave}
            className="py-3 px-16 rounded-md bg-textblue text-white"
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

        <div className="flex flex-col gap-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-3xl shadow-2xl">
            <div className="relative flex flex-col items-center md:items-end gap-2 justify-center  w-full md:w-[25%] ">
              <RiDeleteBinLine onClick={handleDeleteProfilePhoto} />
              <img
                src={previewImages.profile_image || companyprofile}
                className="w-[40%] mx-auto md:w-52 md:h-60 rounded-xl "
                alt="Main Participant"
                onClick={() => handleImageClick(fileInputRef0)}
              />
              <img
                src={editprofile}
                alt="Edit Profile"
                className="absolute scale-75 md:scale-100 -bottom-8 md:-bottom-4 xl:bottom-1 right-32 md:right-0 xl:right-1 bg-white rounded-full cursor-pointer"
                onClick={() => handleImageClick(fileInputRef0)}
              />
              <input
                type="file"
                ref={fileInputRef0}
                className="hidden"
                onChange={(e) => handleFileChange(e, "profile_image")}
              />
            </div>
            <div className="w-full md:w-[75%] md:pl-6 xl:pl-4">
              <div className="text-sm md:text-base lg:text-xl xl:text-2xl 2xl:text-4xl py-2 font-semibold">
                {originalData?.user?.first_name +
                  " " +
                  originalData?.user?.last_name || "Name"}
              </div>
              <div className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl pb-1">
                {originalData?.main_participant_designation || "Designation"}
              </div>
              <div className="text-xs md:text-sm lg:text-base xl:text-base 2xl:text-lg text-black/50">
                {originalData?.user?.company || "Organization"}
              </div>
              <div className="w-full md:w-[25%]">
                <ProgressBar
                  completed={calculateCompletion()}
                  bgColor="#1A74E2"
                  height="20px"
                  labelAlignment="center"
                  label=""
                  className="mt-2"
                />

                <button
                  onClick={handleSave}
                  className="border-[1px] border-footerblue mt-3 p-2 lg:p-2 text-footerblue rounded-full w-52"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Complete Your Profile"}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 w-full">
            <div className="bg-white p-8 rounded-3xl shadow-2xl w-full">
              <div className="relative font-EBGaramond text-center mb-4">
                <h2 className="text-left text-base lg:text-xl 2xl:text-2xl py-1 font-EBGaramond uppercase">
                  Main Participant
                </h2>
                <div className="absolute bottom-0 w-4 md:w-8 lg:w-12 xl:w-16 h-[0.20rem] bg-[#1189CC] rounded-[20px]"></div>
              </div>
              <div className="flex flex-col lg:flex-row">
                <div className="w-full grid grid-cols-6 grid-rows-4 gap-4 font-poppins ">
                  <div className=" col-span-6 row-span-1 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                    <div className="font-poppins">Name</div>
                    <input
                      type="text"
                      placeholder="Participant Name"
                      value={formData.main_participant_name || ""}
                      onChange={(e) =>
                        handleInputChange(e, "main_participant_name")
                      }
                      className="bg-inputcolor rounded-lg outline-none p-4 w-full text-black"
                    />
                  </div>
                  {/* Image Upload */}
                  {/* <div className="col-span-2 row-span-2 ">
                    <div className="flex flex-col justify-center items-center text-center h-full">
                      <div className=" bg-communicationbg w-full h-full rounded-xl flex flex-col justify-between items-center mx-auto text-center pt-4">
                        <img
                          src={previewImages.main_participant_image || upload}
                          alt="Upload"
                          onClick={() => handleImageClick(fileInputRef1)}
                          className={`cursor-pointer ${upload ? "pt-4 h-40 w-40" : ""
                            }`}
                        />
                        <input
                          type="file"
                          ref={fileInputRef1}
                          className="hidden"
                          onChange={(e) =>
                            handleFileChange(e, "main_participant_image")
                          }
                        />
                        {!previewImages.main_participant_image && (
                          <div className="text-footerblue/70 text-base lg:text-xl 2xl:text-2xl">
                            Upload Participant’s Image Here
                          </div>
                        )}
                      </div>
                    </div>
                  </div> */}
                  <div className=" col-span-6 row-span-1 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                    <div className="font-poppins">Designation</div>
                    <input
                      type="text"
                      placeholder="Designation"
                      value={formData.main_participant_designation || ""}
                      onChange={(e) =>
                        handleInputChange(e, "main_participant_designation")
                      }
                      className="bg-inputcolor rounded-lg outline-none p-4 w-full text-black"
                    />
                  </div>

                  <div className="col-span-6 row-span-1 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                    <div className="font-poppins">Org/ Dep/ Dte/ Branch</div>
                    <input
                      type="text"
                      placeholder="Org/ Dep/ Dte/ Branch"
                      value={formData.main_participant_org || ""}
                      onChange={(e) =>
                        handleInputChange(e, "main_participant_org")
                      }
                      className="bg-inputcolor rounded-lg outline-none p-4 w-full text-black"
                    />
                  </div>
                  <div className="col-span-6 row-span-1 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                    <div className="font-poppins">Service</div>
                    <input
                      type="text"
                      placeholder="Service"
                      value={formData.main_participant_service || ""}
                      onChange={(e) =>
                        handleInputChange(e, "main_participant_service")
                      }
                      className="bg-inputcolor rounded-lg outline-none p-4 w-full text-black"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Substitute Participant Section */}
            <div className="bg-white p-8 rounded-3xl shadow-2xl w-full">
              <div className="relative font-EBGaramond text-center mb-4">
                <h2 className="text-left text-base lg:text-xl 2xl:text-2xl py-1 font-EBGaramond uppercase">
                  Substitute Participant
                </h2>
                <div className="absolute bottom-0 w-4 md:w-8 lg:w-12 xl:w-16 h-[0.20rem] bg-[#1189CC] rounded-[20px]"></div>
              </div>
              <div className="flex flex-col lg:flex-row">
                <div className="w-full grid grid-cols-6 grid-rows-4 gap-4 font-poppins">
                  <div className="col-span-4 row-span-1 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                    <div className="font-poppins">Name</div>
                    <input
                      type="text"
                      placeholder="Rank and Name"
                      value={formData.substitute_participant_name || ""}
                      onChange={(e) =>
                        handleInputChange(e, "substitute_participant_name")
                      }
                      className="outline-none p-4 w-full text-black bg-inputcolor rounded-lg"
                    />
                  </div>
                  {/* Image Upload */}
                  <div className="col-span-2 row-span-2">
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="bg-communicationbg w-full h-full rounded-xl flex flex-col justify-between items-center mx-auto text-center p-4">
                        <img
                          src={
                            previewImages.substitute_participant_image || upload
                          }
                          alt="Upload"
                          onClick={() => handleImageClick(fileInputRef2)}
                          className={`cursor-pointer ${previewImages
                            ? " h-40 lg:h-60 w-40 lg:w-60"
                            : "h-20 w-20"
                            }`}
                        />
                        <input
                          type="file"
                          ref={fileInputRef2}
                          className="hidden"
                          onChange={(e) =>
                            handleFileChange(e, "substitute_participant_image")
                          }
                        />
                        {!previewImages.substitute_participant_image && (
                          <div className="text-footerblue/70 text-base lg:text-xl 2xl:text-2xl">
                            Upload Participant’s Image Here
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 row-span-1 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                    <div className="font-poppins">Designation</div>
                    <input
                      type="text"
                      placeholder="Designation"
                      value={formData.substitute_participant_designation || ""}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          "substitute_participant_designation"
                        )
                      }
                      className="outline-none p-4 w-full text-black bg-inputcolor rounded-lg"
                    />
                  </div>
                  <div className="col-span-6 row-span-1 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                    <div className="font-poppins">Org/ Dep/ Dte/ Branch</div>
                    <input
                      type="text"
                      placeholder="Org/ Dep/ Dte/ Branch"
                      value={formData.substitute_participant_org || ""}
                      onChange={(e) =>
                        handleInputChange(e, "substitute_participant_org")
                      }
                      className="outline-none p-4 w-full text-black bg-inputcolor rounded-lg"
                    />
                  </div>
                  <div className="col-span-6 row-span-1 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                    <div className="font-poppins">Service</div>
                    <input
                      type="text"
                      placeholder="Service"
                      value={formData.substitute_participant_service || ""}
                      onChange={(e) =>
                        handleInputChange(e, "substitute_participant_service")
                      }
                      className="outline-none p-4 w-full text-black bg-inputcolor rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Branch/Dte Section */}
            <div className="bg-white p-8 rounded-3xl shadow-2xl">
              <div className="relative font-EBGaramond text-center mb-8">
                <h2 className="text-left text-base lg:text-xl 2xl:text-2xl uppercase py-1">
                  About Your Branch/Dte
                </h2>
                <div className="absolute bottom-0 w-4 md:w-8 lg:w-12 xl:w-16 h-[0.20rem] bg-[#1189CC] rounded-[20px]"></div>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <div className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                    Branch/ Dte Name
                  </div>
                  <input
                    type="text"
                    value={formData.branch_name || ""}
                    onChange={(e) => handleInputChange(e, "branch_name")}
                    className="bg-inputcolor outline-none w-full text-sm lg:text-lg xl:text-xl rounded-lg p-2 xl:p-4"
                  />
                </div>
                <div>
                  <div className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                    Service/ Dept
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={formData.branch_service || ""}
                    onChange={(e) => handleInputChange(e, "branch_service")}
                    className="outline-none bg-inputcolor rounded-lg text-sm lg:text-lg xl:text-xl p-4 w-full text-black"
                  />
                </div>
              </div>
            </div>

            {/* Main Subjects of Responsibility */}
            <div className="bg-white p-8 rounded-3xl shadow-2xl">
              <div className="relative font-EBGaramond text-center mb-8">
                <h2 className="text-left text-base lg:text-xl 2xl:text-2xl uppercase py-1">
                  MAIN SUBJECTS OF RESPONSIBILITY
                </h2>
                <div className="absolute bottom-0 w-4 md:w-8 lg:w-12 xl:w-16 h-[0.20rem] bg-[#1189CC] rounded-[20px]"></div>
              </div>

              <SearchableDropdown
                options={mainBusinessActivities}
                isMulti
                value={formData.main_subjects.map((product) => ({
                  label: product,
                  value: product,
                }))}
                onChange={(selected) =>
                  handleSelectChange(selected, "main_subjects")
                }
                placeholder="Select multiple Subjects of Responsibility"
              />
            </div>

            {/* List of Products/Services */}
            <div className="bg-white p-8 rounded-3xl shadow-2xl">
              <div className="relative font-EBGaramond text-center mb-8">
                <h2 className="text-left text-base lg:text-xl 2xl:text-2xl uppercase py-1">
                  List of Products/ Services You Are Looking For
                </h2>
                <div className="absolute bottom-0 w-4 md:w-8 lg:w-12 xl:w-16 h-[0.20rem] bg-[#1189CC] rounded-[20px]"></div>
              </div>
              <SearchableDropdown
                options={mainBusinessProducts}
                isMulti
                value={
                  Array.isArray(formData.products_services)
                    ? formData.products_services.map((activity) => ({
                      label: activity,
                      value: activity,
                    }))
                    : []
                }
                onChange={(selected) =>
                  handleSelectChange(selected, "products_services")
                }
                placeholder="Select multiple Products/Services"
              />
            </div>
          </div>

          <div className="text-right">
            <button
              type="submit"
              onClick={handleSave}
              className="py-3 px-16 rounded-md bg-textblue text-white"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
          {apiResponse && (
            <div
              className={`mt-4 p-4 border-t-2 ${apiResponse.success
                ? "border-green-200 text-green-700"
                : "border-red-200 text-red"
                }`}
            >
              {apiResponse.message}
            </div>
          )}

          <div>
            <BuildFullProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateKeyGovtProfile;
