import React, { useEffect, useState } from 'react';
import Presentation from './Presentation';
import { fetchUserProfile, getPresentation } from '../../apiEndpoints';

const DownloadPresentation = () => {
    const [presentations, setPresentations] = useState([]);

    // Function to fetch presentations from the backend
    const fetchPresentation = async () => {
        try {
            const response = await getPresentation();
            console.log(response, "response..........................");

            // Filter presentations to only include those with a valid presentation file
            if ((response.data)) {
                const filteredPresentations = response.data.filter(presentation =>
                    presentation.presentation_file && presentation.presentation_file.trim() !== ''
                );

                setPresentations(filteredPresentations);
            } else {
                console.error('Response is not an array:', response);
                setPresentations([]); // Set to empty array if response is not valid
            }
        } catch (error) {
            console.error('Error fetching presentations:', error);
            setPresentations([]); // Optionally reset to empty array on error
        }
    };
    const [formData, setFormData] = useState({
        company: "",
        companyDescription: "",
    });
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
                    } = response.data || {};
                    const loggedInUser = response.data.profile.user_id;
                    const isMainParticipantLoggedIn =
                        loggedInUser === main_profile?.user_id;
                    // setMain(main_profile);
                    setFormData((prevData) => ({
                        ...prevData,
                        company: company?.name || prevData.company.name || "",
                        companyDescription: company?.company_description || prevData.company.company_description || "",
                    }));
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        // console.log(presentation, "..........................s");
        fetchPresentation();  // Fetch presentations when the component mounts
    }, []);

    return (
        <section className='flex justify-center py-14'>
            <div className="container 3xl:w-[70%] p-4 lg:px-8 ">
                <div className="relative heading flex flex-col items-center justify-center mb-20 ">
                    <div className='flex flex-col items-center mb-2 px-2 sm:px-8 lg:px-28 xl:px-32 2xl:px-48'>
                        <h2 className='font-EBGaramond uppercase xl:py-2 text-xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center'>Download Presentations</h2>
                        <p className='text-center text-sm md:text-base lg:text-lg xl:text-xl'>
                            Participating companies have made their presentations available for download by other participants and visitors as shown below. These are available for downloading.
                        </p>
                    </div>
                    <div className="absolute bottom-0 left-[50%] right-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[5%] h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC] "></div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 '>
                    {presentations.length > 0 ? (
                        presentations.map((presentation) => (
                            <Presentation
                                key={presentation.id}  // Ensure unique keys for each element in the list
                                companyName={presentation?.company?.name || ""}  // Assuming you want to display the speaker's name as the company name
                                fileName={presentation?.presentation_name}  // Assuming you want to display the speaker's name as the company name
                                disc={formData.companyDescription}  // You can replace this with any relevant field you want to show
                                // Add more props as needed from the presentation data
                                img={presentation?.presentation_cover_image ? `${process.env.REACT_APP_BASE_URI}/storage/${presentation?.presentation_cover_image}` : "img"} // Pass the file URL if needed
                                hrefURL={`${process.env.REACT_APP_BASE_URI}/storage/${presentation.presentation_file}`}
                            />
                        ))
                    ) : (
                        <p className="text-center text-lg">No presentations available at this time.</p>
                    )}

                    {/* <Presentation
                        key={presentations[0]?.id}  // Ensure unique keys for each element in the list
                        companyName={formData.company}  // Assuming you want to display the speaker's name as the company name
                        disc={"this is company description testing second participant and for all.this is company description testing second participant and for all.this is company description testing second participant and for all.this is company description testing second participant and for all."}  // You can replace this with any relevant field you want to show
                        // Add more props as needed from the presentation data
                        img={presentations[0]?.presentation_file} // Pass the file URL if needed
                        hrefURL={`${process.env.REACT_APP_BASE_URI}/storage/${presentations[0].presentation_file}`}
                    />
                    <Presentation
                        key={presentations[0].id}  // Ensure unique keys for each element in the list
                        companyName={formData.company}  // Assuming you want to display the speaker's name as the company name
                        disc={"this is company description testing second participant and for all.this is company description testing second participant and for all.this is company description testing second participant and for all.this is company description testing second participant and for all.this is company description testing second participant and for all.this is company description testing second participant and for all.this is company description testing second participant and for all."}  // You can replace this with any relevant field you want to show
                        // Add more props as needed from the presentation data
                        img={presentations[0].presentation_file} // Pass the file URL if needed
                        hrefURL={`${process.env.REACT_APP_BASE_URI}/storage/${presentations[0].presentation_file}`}
                    />
                    <Presentation
                        key={presentations[0].id}  // Ensure unique keys for each element in the list
                        companyName={formData.company}  // Assuming you want to display the speaker's name as the company name
                        disc={"this is company description testing second participant and for all.this is company description testing second participant and for all.this is company description testing second participant and for all.this is company description testing second participant and for all.this is company description testing second participant and for all.this is company description "}  // You can replace this with any relevant field you want to show
                        // Add more props as needed from the presentation data
                        img={presentations[0].presentation_file} // Pass the file URL if needed
                        hrefURL={`${process.env.REACT_APP_BASE_URI}/storage/${presentations[0].presentation_file}`}
                    /> */}
                </div>
            </div>
        </section>
    );
}

export default DownloadPresentation;
