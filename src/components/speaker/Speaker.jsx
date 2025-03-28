import React, { useEffect, useState } from 'react'
import SpeakerCard from './SpeakerCard'
import { getSpeaker } from '../../apiEndpoints'

const Speaker = () => {
    const [speakers, setSpeakers] = useState([]);
    const fetchSpeakers = async () => {
        try {
            const response = await getSpeaker();
            console.log(response.data);
            if (response?.data) {
                setSpeakers(response.data)
            } else {
                console.error('no speakers found.')
            }
        } catch (error) {
            console.error('error fetching speakers:', error);
        }
    }
    useEffect(() => {
        fetchSpeakers();
        console.log(speakers);
    }, [])
    return (
        <section className='flex justify-center py-14'>
            <div className="container 3xl:w-[70%] p-4 ">
                <div className="relative heading flex flex-col items-center justify-center mb-4 ">
                    <h2 className='font-EBGaramond uppercase xl:py-2 text-xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold' >speakers</h2>
                    <div className="absolute bottom-0 left-[47.5%] right-[47.5%] w-[5%] h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC] "></div>
                </div>
                <div className='text-center text-sm md:text-base lg:text-lg xl:text-xl mb-8'>Here are the profiles of speakers who will deliver Central Talks, Presentations and conduct workshops during DEFENCE PARTNERSHIP DAYS.</div>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12 xl:gap-16'>
                    {speakers.length > 0 ? (
                        speakers.map((speakers, index) => (
                            <SpeakerCard key={index} title={speakers?.title} name={speakers?.name} designation={speakers?.designation} profile={speakers?.profile} img={speakers?.image ? `${process.env.REACT_APP_BASE_URI}/storage/${speakers?.image}` : null} />
                        ))
                    ) : (
                        <p>No speakers found</p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Speaker
