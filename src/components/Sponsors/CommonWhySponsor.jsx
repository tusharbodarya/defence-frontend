import React from 'react'

const CommonWhySponsor = ({ title, disc, array, img }) => {
    return (
        <div className='flex flex-col-reverse lg:flex-row lg:gap-12 '>
            <div className='w-full lg:w-[55%] flex flex-col justify-between py-2'>
                <div className='text-lg md:text-xl lg:text-xl xl:text-3xl font-semibold font-EBGaramond uppercase'>{title}</div>
                <div className='text-xs md:text-base xl:text-lg 2xl:text-xl text-justify'>{disc}</div>
                <div className='pl-6 md:pl-4'>
                    <ul className='list-disc space-y-2'>
                        {array.map((i, index) => (
                            <li key={index} className='text-xs md:text-base xl:text-lg 2xl:text-xl'>{i}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='w-full lg:w-[45%] flex justify-center'>
                <img src={img} alt="" />
            </div>
        </div>
    )
}

export default CommonWhySponsor