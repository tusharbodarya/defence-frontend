import React from 'react'
import string from '../constants/string'
import PartiCompo from './PartiCompo'

const Participants = () => {
    return (
        <section className='flex justify-center min-h-screen py-14'>
            <div className="container 3xl:w-[70%] px-8 xl:px-20">
                <div className="relative heading flex justify-center items-center text-center mb-12 ">
                    <h2 className='font-EBGaramond uppercase lg:py-2 sm:text-xl md:text-2xl lg:text-3xl font-normal' >{string.Participantstitle}</h2>
                    <div className="absolute bottom-0 left-[47.5%] right-[47.5%] w-[5%] h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC] "></div>

                </div>
                <div className="content flex flex-col gap-4 text-base lg:text-xl xl:text-2xl mb-20 px-4 text-justify lg:text-pretty">
                    <div>{ }</div>
                    <ul>

                    </ul>
                    <div>{ }</div>
                </div>
                <PartiCompo />
            </div>
        </section>
    )
}

export default Participants