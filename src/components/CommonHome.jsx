import React from 'react'
import Swal from 'sweetalert2';

const CommonHome = ({ title, img, blue, text, btn }) => {
    const handlePriceList = () => {
        // navigate('/pricelist?scrollTo=sponsor')
        Swal.fire({
            title: "The event is over",
            text: "",
            icon: "info",
            confirmButtonText: "OK",
            showCancelButton: false, // Disable the cancel button
            showDenyButton: false, // Disable the deny button
            customClass: {
                confirmButton: "swal-confirm-button", // Optional: Apply custom styles if needed
            },
        });
    }
    return (
        <div>
            <div className="relative font-EBGaramond flex justify-start my-8 ">
                <h2 className='uppercase text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold pb-[0.35rem]'>{title}</h2>
                <div className="absolute bottom-0 w-8 md:w-10 lg:w-12 xl:w-16 h-[0.17rem] bg-[#1189CC] rounded-[20px]"></div>
            </div>
            <div className='flex flex-col md:flex-row md:gap-4 lg:gap-8 xl:gap-12'>
                <div className="image w-full md:w-[45%] xl:w-[50%]">
                    <img src={img} alt="" className='w-full' />
                </div>
                <div className='w-full md:w-[55%] xl:w-[50%] flex flex-col justify-between items-start'>
                    <div className='text-textblue text-base md:text-[1rem] md:leading-4 lg:text-xl xl:text-2xl'>{blue}</div>
                    <div className='text-sm md:text-[0.9rem] md:leading-4 lg:text-lg xl:text-[1.20rem] 2xl:text-[1.25rem] xl:leading-6 2xl:leading-8 text-justify font-light pb-2'>{text}</div>
                    <div>
                        <button className='bg-gradient-to-r from-textblue to-footerblue p-1 px-2 xl:py-3 xl:px-5 rounded-full text-white text-sm md:text-base lg:text-lg xl:text-xl '>
                            {/* <Link to="/register" >{btn}</Link> */}
                            <button onClick={handlePriceList} >{btn}</button>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommonHome