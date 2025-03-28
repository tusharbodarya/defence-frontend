import React, { useEffect, useState, useMemo, useContext } from "react";
import Search from "./Search";
import { getUserListByRole } from "../../apiEndpoints";
import CommonProfile from "./CommonProfile";
import blankProfile from "./../../assets/companyLogoDummy.jpg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import Swal from "sweetalert2";

const PrimeContractor = ({ title, roles, disc, btn, img }) => {
  const [participants, setParticipants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All profiles");

  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        const response = await getUserListByRole(roles);
        if (response.success) {
          // Filter to include only profiles where member_id is 1
          const filteredData = response.data.filter(
            (participant) => participant.user?.member_id === "1"
          );
          setParticipants(filteredData);
        } else {
          console.error("Failed to fetch officers:", response.message);
        }
      } catch (error) {
        console.error("Error fetching officers:", error);
      }
    };
    fetchOfficers();
  }, [roles]);

  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);

  const handleBuyAdditionalPack = () => {
    if (!authToken) {
      Swal.fire({
        title: "Access Restricted",
        text: "Additional Meeting Pack can be purchased by A1 Business Participant or A2 Second Business Participant only. Please register. login and try again",
        icon: "warning",
        showDenyButton: true,
        showCloseButton: true,
        confirmButtonText: "Login",
        denyButtonText: "Register",
        customClass: {
          confirmButton: "swal-confirm-button",
          denyButton: "swal-deny-button",
          closeButton: "swal-close-button",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        } else if (result.isDenied) {
          navigate("/register");
        }
      });
    } else {
      navigate("/pricelist")
    }
  };
  const handleRequestMeetingClick = () => {
    Swal.fire({
      title: "The event is over",
      text: "",
      icon: "info",
      confirmButtonText: "OK",
      showCancelButton: false, // Disable the cancel button
      showDenyButton: false, // Disable the deny button
      customClass: {
        confirmButton: "swal-confirm-button", // Optional: Apply custom styles if needed
      },
    });
  };
  // Memoized filtered participants based on search term and selected filter
  const filteredParticipants = useMemo(() => {
    return participants.filter((participant) => {
      // Combine relevant fields into a searchable string
      const searchableFields = `${participant.user?.company || ""} ${participant.user?.first_name || ""}
       ${participant.user?.last_name || ""} ${participant.company?.name || ""} 
       ${participant.main_business_activities || ""} ${participant.main_business_products || ""}
       ${participant.company_description || ""}`.toLowerCase();

      // Match based on selected filter
      switch (selectedFilter) {
        case "By Company":
          return (
            participant.user?.company
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            participant.company?.name
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
        case "By Business Activity":
          return participant.main_business_activities
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());
        case "By Product/Services":
          return participant.main_business_products
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());
        case "By Keyword":
          return searchableFields.includes(searchTerm.toLowerCase());
        default: // "All profiles"
          return searchableFields.includes(searchTerm.toLowerCase());
      }
    });
  }, [participants, searchTerm, selectedFilter]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handlePricelist = () => {
    navigate("/pricelist")
  }

  return (
    <div className="flex justify-center py-14">
      <div className="container 3xl:w-[70%] px-4 lg:px-0 xl:px-16">
        <div>
          <div className="relative heading flex justify-center mb-4">
            <h2 className="font-EBGaramond text-center uppercase xl:py-2 text-xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
              {title}
            </h2>
            <div className="absolute bottom-0 left-[50%] translate-x-[-50%] w-[5%] h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC]"></div>
          </div>
          <div className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-center ">
            {disc}
          </div>
          <div className="flex justify-center py-8">
            {/* <button className="bg-textblue rounded-full text-white py-2 px-4 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
              {btn}
            </button> */}
            {!authToken ? (
              <button onClick={handleRequestMeetingClick} className="bg-textblue rounded-full text-white py-2 px-4 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                {btn}
              </button>
            ) : (
              <button onClick={handlePricelist} className="bg-textblue rounded-full text-white py-2 px-4 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                {btn}
              </button>
            )}
          </div>
        </div>
        <div className="pt-4 lg:w-[90%] mx-auto lg:space-y-4">
          <Search onSearch={handleSearch} onFilterChange={handleFilterChange} />
        </div>
        <div className="py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredParticipants.map((participant, index) => (
              <CommonProfile
                key={index}
                company_name={participant?.user?.company}
                profile={roles}
                main_participant_name={
                  (participant?.user?.title ? participant?.user?.title : "") +
                  " " +
                  (participant?.user?.first_name ? participant?.user?.first_name : "N/A") +
                  " " +
                  (participant?.user?.last_name ? participant?.user?.last_name : "N/A")
                }
                designation={participant?.main_business_designation}
                // description={participant?.company_description}
                business_activity={participant?.main_business_activities}
                product={participant?.main_business_products}
                mainParticipantName={participant?.main_participant_name}
                img={
                  participant?.company_logo
                    ? `${process.env.REACT_APP_BASE_URI}/storage/${participant.company_logo}`
                    : blankProfile
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimeContractor;
