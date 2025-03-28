import React, { useEffect, useState } from 'react'
import Payment from '../Payment';
import Success from '../Success';
import CommonPopup from './CommunicationPopup/CommonPopup';
import string from '../../constants/string';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const StandeeBanner = ({ img, title, tick, disc, btn, index }) => {
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
            <div className={`bg-footerblue flex  flex-col-reverse md:flex-row justify-end text-right rounded-[1.9rem] 2xl:rounded-[2.2rem] my-4 2xl:my-12 ${index === 1 ? 'my-8 md:gap-2' : 'p-4 md:p-8 md:gap-4'}`}>
                <div className={` ${index === 1 ? 'w-[70%] mx-auto md:w-[32%] lg:w-[35%] my-6 lg:m-0' : 'lg:relative w-[70%] mx-auto md:w-[30%] lg:w-[40%] xl:w-[35%]'}`}>

                    {index === 2 ?
                        (<img src={img} alt="" className='lg:px-4 xl:px-0 lg:absolute lg:-left-[14%] lg:-top-[14%] xl:-top-[21%] lg:-bottom-[10%]' />) :
                        (<img src={img} alt="" className={`  ${index === 1 ? 'lg:w-full xl:w-full mx-auto lg:px-0 md:pl-2' : 'w-full px-8 md:px-0 xl:px-4 lg:absolute lg:-top-[12%] xl:-top-[18%] 2xl:-top-[32%] lg:-bottom-[10%]'}`} />)
                    }
                </div>
                <div className={`flex items-start flex-col ${index === 1 ? 'w-full md:w-[68%] lg:w-[65%] py-4 pt-6 px-4 pr-6 lg:p-6' : 'w-full md:w-[70%] lg:w-[60%] xl:w-[65%]'}`}>
                    <div className='lg:py-2 w-full md:inline text-left'>
                        <div className={`bg-white uppercase rounded-xl py-1 lg:py-4   font-EBGaramond text-lg lg:text-xl xl:text-2xl md:inline-block ${index === 1 ? 'px-3 lg:px-4' : 'px-3 md:px-6'}`}>{title}</div>
                    </div>
                    <div className={`flex gap-2 lg:py-2  ${index === 1 ? "lg:px-4 pr-4 lg:pr-8 " : "pr-4"}`}>
                        <div className='w-[6%] xl:w-[4%] pt-1'><img src={tick} alt="" className='w-full' /></div>
                        <div className='flex w-[94%] flex-col items-start lg:gap-3'>
                            <div className='flex flex-col lg:gap-2'>{disc.map((i) => (
                                <div className='text-justify text-base lg:text-lg xl:text-xl 2xl:text-2xl text-white'>{i}</div>
                            ))}</div>
                            <div className='lg:py-2 my-2'><button onClick={handlePriceList} className='bg-white rounded-full px-4 py-1 lg:py-2 text-footerblue'>{btn}</button></div>
                        </div>
                    </div>
                </div>
            </div>
            {stepStendee === 1 && (
                <Payment onClick={handleNextStep} onClose={() => setStepStendee(0)} />
            )}
            {stepStendee === 2 && (
                <Success onClick={handleNextStep} onClose={() => setStepStendee(1)} />
            )}
            {(stepStendee === 3 && index === 0) && (
                <CommonPopup onClick={handleclose} title={string.standeepop} disc={string.standeedisc} uploadtitle={string.commonpopuploadtitle} uploaddisc={string.standeeupload} uploadsize={string.standeesize} btn={string.standeebtn} onClose={() => setStepStendee(2)} />
            )}
            {(stepStendee === 3 && index === 1) && (
                <CommonPopup onClick={handleclose} title={string.insidefrontpop} disc={string.standeedisc} uploadtitle={string.commonpopuploadtitle} uploaddisc={string.standeeupload} uploadsize={string.insidefrontsize} btn={string.standeebtn} onClose={() => setStepStendee(2)} />
            )}
            {(stepStendee === 3 && index === 2) && (
                <CommonPopup onClick={handleclose} title={string.backcoverpop} disc={string.standeedisc} uploadtitle={string.commonpopuploadtitle} uploaddisc={string.standeeupload} uploadsize={string.backcoversize} btn={string.standeebtn} onClose={() => setStepStendee(2)} />
            )}
        </div>
    )
}

export default StandeeBanner