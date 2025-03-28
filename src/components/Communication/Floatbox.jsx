import React from 'react'

const Floatbox = ({ title, img, point }) => {
    return (
        <div>
            <div className='text-lg md:text-xl lg:text-xl xl:text-3xl 2xl:text-4xl font-EBGaramond uppercase font-semibold'>{title}</div>
            <div>
                <div>
                    <div className='md:ml-4 lg:ml-6 md:float-end w-full md:w-[50%]'>
                        <img src={img} alt="" className='w-full' />
                    </div>
                    {point.map((i) => (
                        <div className='text-justify text-base lg:text-lg xl:text-xl 2xl:text-2xl py-2 xl:py-4'>{i}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Floatbox