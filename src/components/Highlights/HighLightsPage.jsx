import React from 'react'
import highLights from '../../constants/highLights'
import HighProfile from './HighProfile'
import network1 from './../../assets/network1.jpg'
import network2 from './../../assets/network2.jpg'
import network3 from './../../assets/network3.jpg'
import network4 from './../../assets/network4.jpg'
import exhibition1 from './../../assets/exhibition1.jpg'
import exhibition2 from './../../assets/exhibition2.jpg'
import exhibition3 from './../../assets/exhibition3.jpg'
import exhibition4 from './../../assets/exhibition4.jpg'
import exhibition5 from './../../assets/exhibition5.jpg'
import exhibition6 from './../../assets/exhibition6.jpg'
import exhibition7 from './../../assets/exhibition7.jpg'
import exhibition8 from './../../assets/exhibition8.jpg'
import exhibition9 from './../../assets/exhibition9.jpg'
import exhibition10 from './../../assets/exhibition10.jpg'
import exhibition11 from './../../assets/exhibition11.jpg'
import exhibition12 from './../../assets/exhibition12.jpg'
import exhibition13 from './../../assets/exhibition13.jpg'
import exhibition14 from './../../assets/exhibition14.jpg'
import exhibition15 from './../../assets/exhibition15.jpeg'
import exhibition16 from './../../assets/exhibition16.jpeg'
import meeting1 from './../../assets/meeting1.jpg'
import meeting2 from './../../assets/meeting2.jpg'
import meeting3 from './../../assets/meeting3.jpg'
import meeting4 from './../../assets/meeting4.jpg'
import meeting5 from './../../assets/meeting5.jpg'
import meeting6 from './../../assets/meeting6.jpg'
import meeting7 from './../../assets/meeting7.jpg'
import meeting8 from './../../assets/meeting8.jpg'
import youTube from './../../assets/youTube.png'
import youTubeThumbnail1 from './../../assets/youTubeThumbnail1.jpeg'
import youTubeThumbnail2 from './../../assets/youTubeThumbnail2.jpeg'

const HighLightsPage = () => {
    return (
        <section className='flex justify-center py-14 min-h-screen'>
            <div className="container 3xl:w-[70%] p-4 lg:px-16">
                <div className="relative heading flex flex-col items-center justify-center mb-20">
                    <div className='flex flex-col items-center mb-2 px-2 sm:px-8 lg:px-28 xl:px-32 2xl:px-48'>
                        <h2 className='font-EBGaramond uppercase xl:py-2 text-xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center w-full md:w-[80%] lg:w-[70%] mx-auto'>{highLights.highLightTitle}</h2>
                    </div>
                    <div className="absolute bottom-0 left-[50%] right-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[5%] h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC] "></div>
                </div>
                <div className='flex flex-col gap-12'>
                    <div className="flex items-center justify-center gap-6">
                        <a
                            href="https://youtu.be/lh7amgWrqKo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative"
                        >
                            <img src={youTube} alt="YouTube" className='absolute w-16 lg:w-28 h-auto opacity-85 left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2' />
                            <img src={youTubeThumbnail1} alt="YouTube Link" className=" h-auto rounded-3xl" />
                        </a>
                        <a
                            href="https://youtu.be/lh7amgWrqKo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative"
                        >
                            <img src={youTube} alt="YouTube" className='absolute w-16 lg:w-28 h-auto opacity-85 left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2' />
                            <img src={youTubeThumbnail2} alt="YouTube Link" className=" h-auto rounded-3xl" />
                        </a>
                    </div>
                    {/* <iframe
                        width="100%"
                        height="575px"
                        src="https://www.youtube.com/embed/lh7amgWrqKo?si=bOXXDWN-LPOxOoCA"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
                    <div className='grid  px-8 py-4 font-semibold border border-black/25 rounded-3xl'>
                        <p className='text-center text-lg md:text-xl lg:text-2xl xl:text-3xl pb-4'>
                            {highLights.preScheduleMeeting}
                        </p>
                        <div className=' grid gap-4 md:gap-8 lg:gap-12 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-4'>
                            <img src={meeting1} alt="" className='rounded-lg md:rounded-2xl' />
                            <img src={meeting2} alt="" className='rounded-lg md:rounded-2xl' />
                            <img src={meeting3} alt="" className='rounded-lg md:rounded-2xl' />
                            <img src={meeting4} alt="" className='rounded-lg md:rounded-2xl' />
                            <img src={meeting5} alt="" className='rounded-lg md:rounded-2xl' />
                            <img src={meeting6} alt="" className='rounded-lg md:rounded-2xl' />
                            <img src={meeting7} alt="" className='rounded-lg md:rounded-2xl' />
                            <img src={meeting8} alt="" className='rounded-lg md:rounded-2xl' />
                        </div>
                    </div>
                    <div className='grid  px-8 py-4 font-semibold border border-black/25 rounded-3xl'>
                        <p className='text-center text-lg md:text-xl lg:text-2xl xl:text-3xl pb-4'>
                            {highLights.highProfile.title}
                        </p>
                        <div className=' grid gap-4 md:gap-8 lg:gap-12 grid-cols-1 md:grid-cols-2 justify-center items-center pb-4'>
                            {Object.values(highLights.highProfile.profileData).map((item, index) => (
                                <div key={index} className='h-full '>
                                    <img src={item.image} alt="" className='rounded-lg md:rounded-2xl' />
                                    <h3 className='text-base lg:text-lg font-bold pt-2'>{item.name}</h3>
                                    {item.designation && (
                                        <p className='text-sm lg:text-base text-gray-600'>{item.designation}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='grid  px-8 py-4 font-semibold border border-black/25 rounded-3xl'>
                        <p className='text-center text-lg md:text-xl lg:text-2xl xl:text-3xl pb-4'>
                            {highLights.spoExhibitors}
                        </p>
                        <div className='grid gap-4 md:gap-8 lg:gap-12 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-4'>
                            <img src={exhibition1} alt="" className='rounded-lg md:rounded-2xl' />
                            <img src={exhibition2} alt="" className='rounded-lg md:rounded-2xl' />
                            <img src={exhibition3} alt="" className='rounded-lg md:rounded-2xl' />
                            <img src={exhibition4} alt="" className='rounded-lg md:rounded-2xl' />
                            <img src={exhibition5} alt="" className='rounded-lg md:rounded-2xl' />
                            <img src={exhibition6} alt="" className='rounded-lg md:rounded-2xl' />
                            <img src={exhibition7} alt="" className='rounded-lg md:rounded-2xl' />
                            <img src={exhibition8} alt="" className='rounded-lg md:rounded-2xl' />
                            <img src={exhibition9} alt="" className='rounded-lg md:rounded-2xl' />
                            <img src={exhibition10} alt="" className='rounded-lg md:rounded-2xl' />
                            <img src={exhibition11} alt="" className='rounded-lg md:rounded-2xl' />
                            <img src={exhibition12} alt="" className='rounded-lg md:rounded-2xl' />
                            <img src={exhibition13} alt="" className='rounded-lg md:rounded-2xl' />
                            <img src={exhibition14} alt="" className='rounded-lg md:rounded-2xl' />
                            <img src={exhibition15} alt="" className='rounded-lg md:rounded-2xl' />
                            <img src={exhibition16} alt="" className='rounded-lg md:rounded-2xl' />
                        </div>
                    </div>
                    <div className='grid  px-8 py-4 font-semibold border border-black/25 rounded-3xl'>
                        <p className='text-center text-lg md:text-xl lg:text-2xl xl:text-3xl pb-4'>
                            {highLights.endlessNetwork}
                        </p>
                        <div className='grid gap-4 md:gap-8 lg:gap-12 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-4'>
                            <img src={network1} alt="" className='rounded-lg md:rounded-2xl' />
                            <img src={network2} alt="" className='rounded-lg md:rounded-2xl' />
                            <img src={network3} alt="" className='rounded-lg md:rounded-2xl' />
                            <img src={network4} alt="" className='rounded-lg md:rounded-2xl' />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HighLightsPage
