import React from 'react'
import string from '../constants/string'
import exhibition1 from "../assets/exhibition stands/Venue Layout 1 1.png"
import exhibition2 from "../assets/exhibition stands/Venue Layout 2 1.png"
import exhibition3 from "../assets/exhibition stands/Venue Layout 3 1.png"

const Exhibition = () => {
    return (
        <section className='flex justify-center min-h-screen py-14'>
            <div className="container 3xl:w-[70%] px-8 xl:px-20">
                <div className="relative heading flex justify-center items-center text-center mb-12 ">
                    {/* <h2 className='font-EBGaramond uppercase lg:py-2 text-base lg:text-xl xl:text-2xl font-normal' >{string.exhibitiontitle}</h2> */}
                    <h2 className='font-EBGaramond uppercase lg:py-2 text-lg sm:text-lg  md:text-3xl lg:text-4xl xl:text-5xl font-normal'>{string.exhibitiontitle}</h2>
                    <div className="absolute bottom-0 left-[47.5%] right-[47.5%] w-[5%] h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC] "></div>
                </div>
                <div className="content font-light flex flex-col gap-4 text-base lg:text-xl xl:text-2xl mb-20 px-4 text-justify lg:text-pretty">
                    <div className="">{string.exhibitionheading}</div>
                    <div className='font-light'>
                        <span className='font-normal'>{string.exregi}</span>
                        {string.exregicontent}
                    </div>
                    < div className='font-light'>
                        <span className='font-normal'>{string.exin}</span>
                        {string.exincontent}
                    </div>
                    <div className='font-light'>
                        <span className='font-normal'>{string.exmee}</span>
                        <ul className='pl-4 xl:pl-6'>
                            {string.exmee_array.map((index) => (
                                <li className='list-disc'>{index}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='flex flex-col font-light'>
                        <span className='font-normal'>{string.expre}</span>
                        {string.exprecontent}
                    </div>
                    <div className='font-light'>
                        <span className='font-normal'>{string.exref}</span>
                        <ul className='pl-4 xl:pl-6'>
                            {string.exrefcontent.map((index) => (
                                <li className="list-disc">{index}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='flex flex-col font-light'>
                        <span className='font-normal'>{string.exexe}</span>
                        {string.exexecontent}
                    </div>
                </div>
                <div className="images px-4 flex flex-col gap-4 mb-20">
                    <div className="caption text-textblue text-sm lg:text-xl xl:text-2xl text-justify lg:text-pretty">{string.exblueline}</div>
                    <div className="img">
                        <img src={exhibition1} alt="" />
                    </div>
                    <div className="img">
                        <img src={exhibition2} alt="" />
                    </div>
                    <div className="img">
                        <img src={exhibition3} alt="" />
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Exhibition