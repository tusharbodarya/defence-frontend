import React from 'react'
import string from '../constants/string'

const points = [
    { dot: "Exclusive opportunity to meet with the Procurement / Purchase / Offsets Heads from 25+ Global OEMs." },
    { dot: "Facilitation of one to one meetings with the participating Procurement / Purchase / Offsets Heads using CII's Online Meeting Centre  " },
    { dot: 'Possibility to establish exclusive single source supply relationships with Global OEMs.  ' },
    { dot: 'Gain understanding on the requirements and eligibility criteria of Global OEMs to enhance global competitiveness  ' },
    { dot: "Promotion of the participation of Indian SMEs in global supply chains by connecting them with Global OEMs.  " },
    { dot: " Platform to demonstrate your prowess and suitability for sourcing relationships with Global OEMs  " },
    { dot: 'Unique insights on the vendor registration processes and other procedures required to supply to Global OEMs' }
]

const Objective = () => {
    return (
        <section className='flex justify-center min-h-screen py-14'>
            <div className="container 3xl:w-[70%] p-4 ">
                <div className="relative heading flex justify-center items-center text-center mb-4 px-[3rem] md:px-[15rem] lg:px-[21rem] xl:px-[33rem]">
                    <h2 className='font-EBGaramond uppercase lg:py-2 text-xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-normal' >{string.objtitle}</h2>
                    <div className="absolute bottom-0 left-[47.5%] right-[47.5%] w-[5%] h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC] "></div>

                </div>
                <div className="flex justify-center  gap-8  px-8 py-4 md:px-4">
                    <div className='flex  flex-col gap-y-1 '>
                        {points.map((index) => (
                            <div key={index} className='   xl:py-1 ' >
                                <div className=" text-sm md:text-base lg:text-lg xl:text-xl">
                                    <ul className='list-disc'>
                                        <li>{index.dot}</li>
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>

    )
}

export default Objective