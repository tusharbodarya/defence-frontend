import React, { useEffect, useRef } from 'react'
import thanks from './../assets/thanks.png'
import { useNavigate } from 'react-router-dom';
import cross from './../assets/cross.png'

const NewsLetterThanks = () => {
    const sucRef = useRef(null);
    const topRef = useRef(null);
    const navigate = useNavigate();
    const handleclickoutside = (e) => {
        if (sucRef.current && !sucRef.current.contains(e.target)) {
            // onClose();
        }
    };
    useEffect(() => {
        // lock scroll
        document.body.style.overflow = "hidden";
        if (topRef.current) {
            topRef.current.focus();
        }
        document.addEventListener("mousedown", handleclickoutside);
        return () => {
            // unlock scroll
            document.body.style.overflow = "auto";
            document.removeEventListener("mousedown", handleclickoutside);
        };
    }, []);
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-opacity-100 bg-black/25 backdrop-blur-lg">
            <div ref={topRef} className="container 3xl:w-[70%] w-[80%] md:w-1/2 ">
                <div ref={sucRef} className="bg-white rounded-3xl flex flex-col">
                    <div className='flex justify-end pt-8 pr-8'>
                        <button onClick={() => navigate(-1)}>
                            <img src={cross} alt="" className='scale-50 lg:scale-75' />
                        </button>
                    </div>
                    <div className=" flex flex-col p-8 ">
                        <div className="w-full sm:w-4/5 mx-auto mb-8">
                            <div className="flex flex-col justify-center items-center gap-4">
                                <div className='flex items-center justify-center '>
                                    <img src={thanks} alt="" className='w-[80%]' />
                                </div>
                                <div className="font-semibold flex flex-col items-center justify-center gap-2 text-xl lg:text-2xl xl:text-3xl">
                                    <div>Thank you for your</div>
                                    <div className='text-textblue text-center'>Newsletter Subscription!</div>
                                </div>
                                <div className="text-lg lg:text-xl text-wrap text-center">
                                    Please check the entered email to verify your subscription.
                                </div>
                                <div className="text-lg lg:text-xl text-wrap text-center">
                                    From now on we will inform you regularly with our newsletters. All newsletters sent out every week will be available here.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsLetterThanks
