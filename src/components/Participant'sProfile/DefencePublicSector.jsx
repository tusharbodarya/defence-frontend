import React from 'react'

const DefencePublicSector = ({ href, description, companyName, productName, img }) => {
    return (
        <div className='flex flex-col lg:flex-row gap-6 lg:gap-12'>
            <div className='w-[80%] mx-auto h-auto sm:w-full lg:w-[30%] '>
                <div className='flex flex-col justify-center items-center h-full w-full'>
                    <a href={href} className='w-full' target='_blank'>
                        <img src={img} alt="" className='w-full h-full' />
                    </a>
                </div>
            </div>
            <div className='w-full lg:w-[70%] flex flex-col justify-start py-2 gap-2'>
                {/* <div className='flex flex-col justify-between space-y-2 sm:space-y-0 h-full px-6 md:px-0 text-justify'> */}
                <div className='font-semibold text-[1.4rem] md:text-lg lg:text-[1.87rem] 2xl:text-4xl'>{companyName ? companyName : ``}</div>
                <div className='text-[1.2rem] md:text-base lg:text-xl 2xl:text-2xl text-black/75'>{productName ? productName : ''}</div>
                <div className='text-[1.2rem] md:text-base lg:text-xl 2xl:text-2xl text-black/50'>{description ? description : ""}</div>
                {/* </div> */}
            </div>
        </div>
    )
}

export default DefencePublicSector