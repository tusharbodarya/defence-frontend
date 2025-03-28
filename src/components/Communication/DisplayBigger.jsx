import React, { useEffect, useState } from 'react'
import Payment from '../Payment';
import Success from '../Success';
import CommonPopup from './CommunicationPopup/CommonPopup';
import string from '../../constants/string';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const DisplayBigger = ({ title, tick, whitetick, disc, btn, greentext, greentick, img, index }) => {
    const [stepStendee, setStepStendee] = useState(0);
    const navigate = useNavigate();
    const handleNextStep = (e) => {
        e.preventDefault();
        setStepStendee(stepStendee + 1);
        console.log(stepStendee);
    }
    const handleclose = (e) => {
        e.preventDefault();
        setStepStendee(0);
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
        if (stepStendee === 0) {
            document.body.style.overflow = 'auto';  // Ensure overflow is reset when step is 0
        } else {
            document.body.style.overflow = 'hidden';  // Lock scroll when a popup is open
        }
    }, [stepStendee]);
    return (
        <div>
            <div className={`${index === 1 ? "bg-footerblue py-8 md:py-10 px-4 md:px-8 rounded-3xl mb-10" : 'py-20'}`}>
                <div className={`uppercase rounded-xl py-4 px-2 md:px-6  font-EBGaramond text-lg lg:text-xl xl:text-2xl mb-4 ${index === 1 ? 'bg-white' : "bg-footerblue text-white"}`}>{title}</div>
                <div className={`gap-4 flex flex-col-reverse ${index === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                    <div className={`w-full lg:w-[50%] flex gap-2 md:gap-4 ${index === 1 ? 'px-1' : 'px-4'}`}>
                        <div className='w-[6%] md:w-[4%] lg:w-[8%] xl:w-[4%]  pt-1'>
                            {index === 1 ?
                                (<img src={whitetick} alt='' className='w-full' />) :
                                (<img src={tick} alt="" className='w-full' />)}
                        </div>
                        <div className={`w-[96%] flex flex-col items-start gap-3 ${index === 1 ? 'text-white' : ''}`}>
                            <div className=''>
                                <div className='hidden md:block pl-4 float-end lg:hidden md:w-[40%]'>
                                    <img src={img} alt="" />
                                </div>
                                {disc.map((i) => (
                                    <div className='text-justify text-base lg:text-lg xl:text-xl 2xl:text-2xl'>{i}</div>
                                ))}
                            </div>
                            <div className='py-2'><button onClick={handlePriceList} className={`rounded-full px-4 py-2 ${index === 1 ? 'bg-white text-footerblue' : 'bg-gradient-to-r from-textblue to-footerblue text-white'}`}>{btn}</button></div>
                            {/* {index === 1 ? (
                                <></>
                            ) : (
                                <div className='bg-greendisplaybigger rounded-lg flex items-center justify-center gap-3 py-1 px-4 text-white'>
                                    <img src={greentick} alt="" className='scale-75' />
                                    <p>{greentext}</p>
                                </div>
                            )} */}
                        </div>
                    </div>
                    <div className='w-[80%] mx-auto md:hidden lg:block md:w-[50%]'>
                        <img src={img} alt="" />
                    </div>
                </div>
            </div>
            {/* {stepStendee === 1 && (
                <Payment onClick={handleNextStep} onClose={() => setStepStendee(0)} />
            )}
            {stepStendee === 2 && (
                <Success onClick={handleNextStep} onClose={() => setStepStendee(1)} />
            )}
            {stepStendee === 3 && (
                <CommonPopup onClick={handleclose} title={string.largebannerpop} disc={string.standeedisc} uploadtitle={string.commonpopuploadtitle} uploaddisc={string.standeeupload} uploadsize={string.largebannerpopsize} btn={string.standeebtn} onClose={() => setStepStendee(2)} />
            )} */}
        </div>
    )
}

export default DisplayBigger