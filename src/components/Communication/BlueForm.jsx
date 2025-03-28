import React from 'react'

const BlueForm = ({ title, disc, img, formtitle, inputs, btn }) => {
    return (
        <div className='flex justify-center bg-footerblue text-white w-full mb-8 xl:mb-12'>
            <div className="container 3xl:w-[70%] px-6 xl:px-20 pt-16 md:flex">
                <div className='w-full md:w-[50%] pr-8 flex flex-col gap-2'>
                    <div className='text-lg lg:text-xl xl:text-3xl 2xl:text-4xl font-EBGaramond uppercase'>{title}</div>
                    <div className='font-poppins text-base lg:text-lg 2xl:text-xl'>{disc}</div>
                    {img ? (
                        <div className='pt-12 lg:pt-20 xl:pt-24 2xl:pt-12'><img src={img} alt="" className='w-[80%]' /></div>
                    ) : (
                        <div className=' w-[50%] h-[170px] lg:h-[250px] xl:h-[300px]'></div>
                    )}
                </div>
                <div className='w-full my-4 md:mt-0 md:w-[50%] md:relative'>
                    <form action="" className='md:absolute md:top-0 md:w-full  bg-white text-black rounded-3xl py-4 px-6'>
                        <div className="relative py-2 lg:my-4 text-left font-EBGaramond">
                            <div className="absolute top-0 my-2 w-8 md:w-10 lg:w-12 xl:w-16 h-[0.17rem] bg-[#1189CC] rounded-[20px]"></div>
                            <h2 className='font-poppins py-4 text-base lg:text-lg 2xl:text-xl pb-[0.35rem]'>{formtitle}</h2>
                        </div>
                        <div className='px-4 py-4 lg:py-8 flex flex-col gap-6 lg:gap-8 xl:gap-10'>
                            {
                                inputs.map((i) => (
                                    <div className=''>
                                        <input type="text" placeholder={i} className='text-base lg:text-lg 2xl:text-xl w-full outline-none' />
                                    </div>
                                ))
                            }
                        </div>
                        <div>
                            <button className='bg-textblue text-white w-full py-2 text-center rounded-full'>{btn}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BlueForm