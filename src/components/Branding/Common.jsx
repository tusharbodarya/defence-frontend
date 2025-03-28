import React, { useEffect, useState } from 'react'
import Payment from '../Payment';
import Success from '../Success';
import string from '../../constants/string';
import CommonPopup from '../Communication/CommunicationPopup/CommonPopup';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Common = ({ number, title, tick, disc, btn1, btn2, img, value1, value2, category, subcategory, subcategory1, subcategory2 }) => {


    const navigate = useNavigate();

    const handlePayment = (e) => {
        e.preventDefault();
        navigate("/branding/brandPayment", { state: { subcategory, subcategory1, subcategory2, category, value1, value2 } });
        console.log(subcategory);
        console.log(subcategory1);
        console.log(subcategory2);
    }
    const handlePaymentSubcategory1 = (e) => {
        e.preventDefault();
        navigate("/branding/brandPayment", { state: { subcategory1, category, value1, value2 } });
        console.log(subcategory1);
    }
    const handlePaymentSubcategory2 = (e) => {
        e.preventDefault();
        navigate("/branding/brandPayment", { state: { subcategory2, category, value1, value2 } });
        console.log(subcategory2);
    }
    const handlePriceList = (e) => {
        e.preventDefault();
        // navigate("/pricelist?scrollTo=branding");
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
            <div className={`flex gap-4 lg:gap-8 flex-col  ${number == 2 ? 'md:flex-row-reverse' : 'md:flex-row'} 
        ${number == 4 ? 'md:flex-row-reverse' : 'md:flex-row'}
        ${number == 6 ? 'md:flex-row-reverse' : 'md:flex-row'}
        `}>
                <div className='w-full md:w-[50%] lg:pr-8 flex flex-col justify-between'>
                    <div className='font-EBGaramond flex items-center py-1 lg:py-2 gap-2'>
                        <div className='text-footerblue/15 uppercase text-xl md:text-2xl lg:text-3xl xl:text-5xl'>{number}</div>
                        <div className='uppercase text-base md:text-lg lg:text-xl xl:text-2xl'>{title}</div>
                    </div>
                    <div className='flex gap-2'>
                        <div className='w-[4%] pt-1'><img src={tick} alt="" /></div>
                        <div className='w-[96%] font-poppins text-sm md:text-[1rem] md:leading-5 lg:leading-7 xl:text-xl 2xl:text-2xl text-justify'>
                            {disc.map((item, index) => (
                                <div key={index}>{item}</div>
                            ))}
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <button onClick={handlePriceList} className='bg-gradient-to-r from-textblue to-footerblue text-white py-1 lg:py-2 px-6 rounded-full text-base lg:text-lg xl:text-xl 2xl:text-2xl'>{btn1}</button>
                        {btn2 && (
                            <button onClick={handlePriceList} className='bg-gradient-to-r from-textblue to-footerblue text-white py-1 lg:py-2 px-6 rounded-full text-base lg:text-lg xl:text-xl 2xl:text-2xl'>{btn2}</button>
                        )}
                    </div>
                </div>
                <div className='w-full md:w-[50%]'>
                    <img src={img} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Common