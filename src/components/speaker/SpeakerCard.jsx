import React from 'react'

const SpeakerCard = ({ title, img, name, designation, company, profile }) => {
    return (
        <div className='border border-iconborder/50 rounded-3xl p-4 flex items-center flex-col '>
            {/* <div className='w-full font-semibold text-sm md:text-base lg:text-lg'>{title}</div> */}
            <div className='py-2'>
                <img src={img} alt="speaker's photo" className='w-auto h-60' />
            </div>
            <div className='space-y-2'>
                <div className='text-black/75'>Name: <span className='text-black'>{title} {" "} {name} </span></div>
                <div className='text-black/75'>Designation: <span className='text-black'>{designation} </span></div>
                {/* <div className='text-black/75'>Company: <span className='text-black'>{company} </span></div> */}
                <div className='text-sm lg:text-base'>{profile}</div>
            </div>
        </div>
    )
}

export default SpeakerCard
