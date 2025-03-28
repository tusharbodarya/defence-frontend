import React from 'react'

const PartiCompo = () => {
    return (
        <div>
            <div className="relative heading flex justify-center items-center text-center mb-12 ">
                <div></div>
                <h2 className='font-EBGaramond uppercase lg:py-2 sm:text-xl md:text-2xl lg:text-3xl font-normal' >{ }government & service officer</h2>
            </div>
            <div className="maincontent flex">
                <div className="relative text">
                    <div>
                        <h3>{ }</h3>
                        <div className="absolute bottom-0 left-[47.5%] right-[47.5%] w-[5%] h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC] "></div>

                    </div>
                    <div className="para">{ }</div>
                </div>
                <div className="img"></div>
                <div className="texts">{ }</div>
                <div className="flex gap-4">
                    <button className='bg-textblue text-base lg:text-xl xl:text-2xl rounded-3xl text-white font-normal my-4 p-2'>Register</button>
                    <button className=' text-base lg:text-xl xl:text-2xl rounded-3xl text-footerblue font-normal my-4 p-2'>View Profiles</button>

                </div>
            </div>
        </div>
    )
}

export default PartiCompo