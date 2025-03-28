import React, { useEffect, useRef } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import string from '../../constants/string'
import success from './../../assets/success.png'
import emoji from './../../assets/emoji.png'

const PaymentSuccess = ({
    onClick,
}) => {
    const topRef = useRef(null);

    useEffect(() => {
        // lock scroll  
        document.body.style.overflow = 'hidden';

        return () => {
            // unlock scroll
            document.body.style.overflow = 'auto';
        };
    }, []);
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-opacity-100 bg-black/25 backdrop-blur-lg">
                <div ref={topRef} className="container 3xl:w-[70%] w-[80%] md:w-1/2 ">
                    <div className="bg-white rounded-3xl flex">
                        <div className=" flex flex-col p-8 sm:p-12 ">
                            <div className="w-full sm:w-3/4 mx-auto mb-8">
                                <div className="flex flex-col justify-center items-center gap-4">
                                    <div>
                                        <img src={success} alt="" />
                                    </div>
                                    <div className="font-semibold flex items-center justify-center gap-2 text-xl lg:text-2xl xl:text-3xl">{string.successtitle} <img src={emoji} alt="" /></div>
                                    <div className="text-base lg:text-lg text-wrap text-center">Your purchase was successful. You will now be redirected to the Price List for any additional Purchased. The Add-ons you have purchased will be reflected as Add-ons on your Profile Dashboard page.</div>
                                </div>
                            </div>

                            <div className="text-right flex justify-end">
                                <button onClick={onClick} className=' text-sm md:text-base lg:text-lg xl:text-xl rounded-lg  font-normal py-3 px-4 text-white bg-textblue w-full' type="submit">Continue</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentSuccess
