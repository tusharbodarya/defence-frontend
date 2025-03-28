import React, { useEffect, useState } from 'react'
import string from '../../constants/string'
// import Search from './Search';
import DefencePublicSector from './DefencePublicSector';
// import mediaProfile from '../../assets/mediaProfile.jpg'
import { associateMediaPartner } from '../../apiEndpoints';

const MediaPartnerProfile = () => {

    const [fetchMediaSponsor, setFetchMediaSponsor] = useState([]); // Initialize as an array
    useEffect(() => {
        const fetchMediaPartner = async () => {
            try {
                const response = await associateMediaPartner();
                if (response.success) {
                    setFetchMediaSponsor(response.data); // Assuming there's only one item in the array
                }
            } catch (error) {
                console.error("Error in fetching Media Sponsor");
            }
        };
        fetchMediaPartner();
    }, []);


    return (
        <div className='flex justify-center py-14'>
            <div className='container px-4 lg:px-0 xl:px-20'>
                <div>
                    <div className="relative heading flex justify-center mb-4">
                        <h2 className='font-EBGaramond uppercase xl:py-2 text-xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold' >{string.mediaTitle}</h2>
                        <div className="absolute bottom-0 left-[50%] translate-x-[-50%] w-[5%] h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC] "></div>
                    </div>
                </div>
                <div className='py-12'>
                    {fetchMediaSponsor.length > 0 && (
                        fetchMediaSponsor.map((sponsor, index) => (
                            <div key={index} className='mb-8 p-4 h-full bg-gray-100 rounded-lg shadow-md'>
                                <DefencePublicSector
                                    img={`${process.env.REACT_APP_BASE_URI}/storage/${sponsor.image}`}
                                    description={sponsor.description}
                                    productName={sponsor.product_name}
                                    companyName={sponsor.company_name}
                                    href={sponsor.link}
                                />
                            </div>
                        ))
                    )}
                </div>
                {/* <div className='py-12'>
                    {fetchMediaSponsor.length > 0 ? (
                        fetchMediaSponsor.map((sponsor, index) => (
                            <div key={index} className='mb-8 p-4 bg-gray-100 rounded-lg shadow-md'>
                                <h3 className='text-2xl font-semibold mb-2'>{sponsor.company_name}</h3>
                                <p className='text-lg text-gray-600 mb-4'>{sponsor.description}</p>
                                <img
                                    src={`${process.env.REACT_APP_BASE_URI}/storage/${sponsor.image}`}
                                    alt={sponsor.company_name}
                                    className='mb-4 w-64 h-64 object-cover'
                                />
                                <p><strong>Product Name:</strong> {sponsor.product_name}</p>
                                <p><strong>Link:</strong> <a href={sponsor.link} className='text-blue-500 hover:underline' target="_blank" rel="noopener noreferrer">{sponsor.link}</a></p>
                                <p><strong>Created At:</strong> {new Date(sponsor.created_at).toLocaleDateString()}</p>
                                <p><strong>Updated At:</strong> {new Date(sponsor.updated_at).toLocaleDateString()}</p>
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div> */}

            </div>
        </div>
    )
}

export default MediaPartnerProfile