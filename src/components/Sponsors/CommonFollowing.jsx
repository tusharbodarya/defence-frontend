import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CommonFollowing = ({ title, array, btn, index, value, price, category, subcategory, child_category }) => {
    const [step, setStep] = useState(0);
    const handleNext = (e) => {
        e.preventDefault();
        setStep(step + 1);
        console.log(step);
    }
    const handleClose = (e) => {
        e.preventDefault();
        setStep(0);
        document.body.style.overflow = 'auto';  // Reset overflow when closing the popup
    }

    const navigate = useNavigate();
    const handlePayment = (e) => {
        e.preventDefault();
        navigate("/whysponsors/spoPayment", { state: { child_category, subcategory, category, price } });
        console.log(child_category);
    }

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

    useEffect(() => {
        if (step === 0) {
            document.body.style.overflow = 'auto';  // Ensure overflow is reset when step is 0
        } else {
            document.body.style.overflow = 'hidden';  // Lock scroll when a popup is open
        }
    }, [step]);
    return (
        <div>
            <div className='mb-12 border-[1px] border-footerblue/50 rounded-tl-none rounded-xl'>
                <div>
                    <div className='bg-footerblue inline-block text-base px-4 py-2 md:text-lg lg:text-lg xl:text-xl text-white'>{title}</div>
                </div>
                <div className='p-4'>
                    <div className='pb-4 px-4'>
                        <ul className=''>
                            {array.map((i, index) => (
                                <li key={index} className='text-xs md:text-base xl:text-lg 2xl:text-xl'>{i}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='px-4'>
                        <button onClick={handlePriceList} className='text-xs md:text-sm xl:text-base 2xl:text-lg border-[1px] border-textblue hover:bg-textblue rounded-full text-textblue hover:text-white py-1 px-4'>{btn}</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CommonFollowing