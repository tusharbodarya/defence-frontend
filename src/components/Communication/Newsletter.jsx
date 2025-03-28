import React, { useEffect, useState } from 'react'
import Payment from '../Payment';
import Success from '../Success';
import NewsLetterPromo from './CommunicationPopup/NewsLetterPromo';
import CommonPopup from './CommunicationPopup/CommonPopup';
import string from '../../constants/string';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Newsletter = ({ title, tick, disc, btn, img, index }) => {
    const [step, setStep] = useState(0);
    const navigate = useNavigate();
    const handleNextPopup = (e) => {
        e.preventDefault();
        setStep(step + 1);
        console.log(step);
    };
    const handleclose = (e) => {
        e.preventDefault();
        setStep(0);
        document.body.style.overflow = 'auto';  // Reset overflow when closing the popup
    }
    const handlePriceList = (e) => {
        e.preventDefault();
        // navigate("/pricelist?scrollTo=communication");
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

    useEffect(() => {
        if (step === 0) {
            document.body.style.overflow = 'auto';  // Ensure overflow is reset when step is 0
        } else {
            document.body.style.overflow = 'hidden';  // Lock scroll when a popup is open
        }
    }, [step]);
    return (
        <div>
            <div className={`flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-16 pb-12 ${index === 1 ? 'pt-24' : ''}`}>
                <div className={`flex items-center ${index === 1 ? "w-full md:w-[60%]" : 'w-full md:w-[70%]'}`}>
                    <div className='flex flex-col gap-2'>
                        <div className='py-4'>
                            <div className='bg-footerblue text-white uppercase rounded-xl py-4 pl-6 pr-12 font-EBGaramond text-lg lg:text-xl xl:text-2xl 2xl:text-3xl md:inline-block'>
                                {title}
                            </div>
                        </div>
                        <div className='flex gap-2 px-2 md:px-0'>
                            <div className='w-[6%] xl:w-[4%] pt-1'><img src={tick} alt="" className='w-full' /></div>
                            <div className='w-[94%]'>
                                <div className='text-justify pb-4  flex flex-col gap-2'>{
                                    disc.map((i) => (
                                        <div className='text-justify text-base lg:text-lg xl:text-xl 2xl:text-2xl'>{i}</div>
                                    ))
                                }</div>
                                <div><button onClick={handlePriceList} className='bg-gradient-to-r from-textblue to-footerblue text-white py-2 px-6 rounded-full text-base lg:text-lg xl:text-xl 2xl:text-2xl'>{btn}</button></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`flex justify-center items-center ${index === 1 ? "w-[70%] mx-auto md:w-[40%]" : "w-[70%] mx-auto md:w-[30%]"}`}><img src={img} alt="" className={`${index === 1 ? "w-full" : ''}`} /></div>
            </div>
            {step === 1 && (
                <Payment onClick={handleNextPopup} onClose={() => setStep(0)} />
            )}
            {step === 2 && (
                <Success onClick={handleNextPopup} onClose={() => setStep(1)} />
            )}
            {(step === 3 && index === 0) && (
                <NewsLetterPromo onClick={handleclose} onClose={() => setStep(2)} />
            )}
            {(step === 3 && index === 2) && (
                <CommonPopup onClick={handleclose} title={string.fullpage} disc={string.standeedisc} uploadtitle={string.commonpopuploadtitle} uploaddisc={string.standeeupload} uploadsize={string.fullpagesize} btn={string.standeebtn} onClose={() => setStep(2)} />
            )}
            {(step === 3 && index === 1) && (
                <CommonPopup onClick={handleclose} title={string.halfpagetitle} disc={string.standeedisc} uploadtitle={string.commonpopuploadtitle} uploaddisc={string.standeeupload} uploadsize={string.halfpagesize} btn={string.standeebtn} onClose={() => setStep(2)} />
            )}
            {(step === 3 && index === 3) && (
                <CommonPopup onClick={handleclose} title={string.insidebackpop} disc={string.standeedisc} uploadtitle={string.commonpopuploadtitle} uploaddisc={string.standeeupload} uploadsize={string.insidebacksize} btn={string.standeebtn} onClose={() => setStep(2)} />
            )}
        </div>
    )
}

export default Newsletter