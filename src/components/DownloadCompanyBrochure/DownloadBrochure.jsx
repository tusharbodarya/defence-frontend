import React, { useEffect, useState } from 'react';
import Brochure from './Brochure';
import { getCompanies } from '../../apiEndpoints';

const DownloadBrochure = () => {
    const [companies, setCompanies] = useState([]);

    // Function to fetch companies from the backend
    const fetchCompanies = async () => {
        try {
            const response = await getCompanies();
            console.log(response.data);
            // Filter presentations to only include those with a valid presentation file
            if ((response.data)) {
                const filteredBrochures = response.data.filter(brochure =>
                    brochure.company_brochure && brochure.company_brochure.trim() !== ''
                );

                setCompanies(filteredBrochures);
            } else {
                console.error('Response is not an array:', response);
                setCompanies([]); // Set to empty array if response is not valid
            }

            // if (response?.data) {
            //     setCompanies(response?.data);  // Save fetched data to the state
            // } else {
            //     console.error('No companies found.');
            // }
        } catch (error) {
            console.error('Error fetching companies:', error);
            setCompanies([]);
        }
    };

    useEffect(() => {
        fetchCompanies();  // Fetch companies when the component mounts
        console.log(companies);
    }, []);

    return (
        <section className='flex justify-center py-14'>
            <div className="container 3xl:w-[70%] p-4 lg:px-16">
                <div className="relative heading flex flex-col items-center justify-center mb-20">
                    <div className='flex flex-col items-center mb-2 px-2 sm:px-8 lg:px-28 xl:px-32 2xl:px-48'>
                        <h2 className='font-EBGaramond uppercase xl:py-2 text-xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center'>Download Company Brochures</h2>
                        <p className='text-center text-sm md:text-base lg:text-lg xl:text-xl'>
                            Participating companies have made their brochures and literature available for download by other participants and visitors as shown below. These are available for downloading.
                        </p>
                    </div>
                    <div className="absolute bottom-0 left-[50%] right-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[5%] h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC] "></div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 xl:gap-12 2xl:gap-16 px-8 '>
                    {companies.length > 0 ? (
                        companies.map((company, index) => (
                            <Brochure
                                key={index}
                                img={
                                    company?.company_brochure_cover_img
                                        ? `${process.env.REACT_APP_BASE_URI}/storage/${company?.company_brochure_cover_img}`
                                        : null
                                }
                                href={`${process.env.REACT_APP_BASE_URI}/storage/${company?.company_brochure}`}
                                companyName={company?.name}
                                disc={company?.company_brochure_name ? company?.company_brochure_name : ''}
                                btn={"Download"}
                            />
                        ))
                    ) : (
                        <p>No companies found</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default DownloadBrochure;