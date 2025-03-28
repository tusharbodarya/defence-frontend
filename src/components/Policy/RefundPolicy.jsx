import React from 'react'
import string from '../../constants/string'

const RefundPolicy = () => {
    return (
        <section className='flex flex-col items-center justify-center py-14 mb-8 2xl:mb-16'>
            <div className="container 3xl:w-[70%] px-8 xl:px-20 space-y-8">
                <div className='text-base sm:text-lg md:text-xl lg:text-2xl text-center'>{string.refundPolicy.subtitle}</div>
                <div className="relative heading flex justify-center items-center text-center mb-12">
                    <h2 className='font-EBGaramond  lg:py-2 text-lg sm:text-lg md:text-2xl lg:text-3xl xl:text-5xl font-normal'>{string.refundPolicy.title}</h2>
                </div>
                <div className='text-base sm:text-lg md:text-xl lg:text-2xl '>{string.refundPolicy.disc1}</div>
                <div className='text-base sm:text-lg md:text-xl lg:text-2xl '>{string.refundPolicy.disc2}</div>
            </div>
        </section>
    )
}

export default RefundPolicy