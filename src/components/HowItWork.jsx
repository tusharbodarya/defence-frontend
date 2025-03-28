import React from 'react'
import string from '../constants/string'
import Hiwcomponent from './Hiwcomponent'
import hiw1 from '../assets/how it work img/Rectangle1.png'
import hiw2 from '../assets/how it work img/Rectangle2.png'
import hiw3 from "../assets/how it work img/Rectangle3.png"
import hiw4 from '../assets/how it work img/Rectangle4.png'

const HowItWork = () => {
    return (
        <section className='flex justify-center min-h-screen py-14'>
            <div className="container 3xl:w-[70%] px-8 md:px-2 py-20 xl:px-20">
                <div className="relative heading flex justify-center items-center text-center mb-4 ">
                    <h2 className='font-EBGaramond uppercase lg:py-2 text-lg sm:text-lg  md:text-3xl lg:text-4xl xl:text-5xl font-normal'>{string.howitworktitle}</h2>
                    <div className="absolute bottom-0 left-[47.5%] right-[47.5%] w-[5%] h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC] "></div>
                </div>
                <div className="flex flex-col justify-center  gap-16 xl:gap-28  px-0 py-4  lg:px-20">
                    <Hiwcomponent title={string.hiwpoint1} body={string.hiwcontent1} image={hiw1} />
                    <Hiwcomponent index={"even"} title={string.hiwpoint2} body={string.hiwcontent2} image={hiw2} />
                    <Hiwcomponent title={string.hiwpoint3} body={string.hiwcontent3} image={hiw3} />
                    <Hiwcomponent index={"even"} title={string.hiwpoint4} body={string.hiwcontent4} image={hiw4} />
                </div>
            </div>
        </section>
    )
}

export default HowItWork