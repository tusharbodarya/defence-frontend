import React from 'react'
import string from '../../constants/string'

const CopyRight = () => {
    return (
        <section className='flex flex-col items-center justify-center py-14 mb-8 2xl:mb-16'>
            <div className="container 3xl:w-[70%] px-8 xl:px-20">
                <div className="relative heading flex justify-center items-center text-center mb-12">
                    <h2 className='font-EBGaramond uppercase lg:py-2 text-lg sm:text-lg md:text-3xl lg:text-4xl xl:text-5xl font-normal'>{string.copyright.title}</h2>
                    <div className="absolute bottom-0 left-[47.5%] right-[47.5%] w-[5%] h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC] "></div>
                </div>
                <div className='text-center text-sm sm:text-base md:text-lg lg:text-xl '>{string.copyright.link} <a href="#" className='text-footerblue underline'>{string.copyright.weblink}</a></div>
                <div className='py-4 space-y-8'>
                    <div className='text-base sm:text-lg md:text-xl lg:text-2xl text-justify'>
                        {string.copyright.discription}
                    </div>
                    <div className='space-y-4'>
                        <div className='text-sm sm:text-base md:text-lg lg:text-xl'>
                            <div className='font-semibold text-base sm:text-lg md:text-xl lg:text-2xl'>{string.copyright.question1}</div>
                            <div>{string.copyright.answer1}</div>
                        </div>
                        <div className='text-sm sm:text-base md:text-lg lg:text-xl'>
                            <div className='font-semibold text-base sm:text-lg md:text-xl lg:text-2xl'>{string.copyright.question2}</div>
                            <div>{string.copyright.answer2}</div>
                            <div className='pl-4'>
                                <div>{string.copyright.following}</div>
                                <ul className='list-disc pl-6'>
                                    {string.copyright.followingArray.map((i) => (
                                        <li>{i}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className='text-sm sm:text-base md:text-lg lg:text-xl'>
                            <div className='font-semibold text-base sm:text-lg md:text-xl lg:text-2xl'>{string.copyright.question3}</div>
                            <div>{string.copyright.answer3}</div>
                        </div>
                    </div>
                    <div>
                        <div className='font-semibold text-base sm:text-lg md:text-xl lg:text-2xl'>{string.copyright.copyrightSoftwareTitle}</div>
                        <div className='text-sm sm:text-base md:text-lg lg:text-xl'>{string.copyright.copyrightSoftwareDisc}</div>
                    </div>
                    <div>
                        <div className='font-semibold text-base sm:text-lg md:text-xl lg:text-2xl'>{string.copyright.followingInformation}</div>
                        <ul className='list-disc pl-6'>
                            {string.copyright.followingInformationArray.map((i) => (
                                <li className='text-sm sm:text-base md:text-lg lg:text-xl'>{i}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CopyRight