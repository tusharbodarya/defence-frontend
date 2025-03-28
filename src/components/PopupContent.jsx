import React, { useEffect, useRef } from 'react'
import string from '../constants/string';

const PopupContent = ({ onClose, content }) => {
    const popupRef = useRef(null);
    const handleclickoutside = (e) => {
        if (popupRef.current && !popupRef.current.contains(e.target)) {
            onClose();
        }
    }
    useEffect(() => {
        document.body.style.overflow = "hidden";
        if (popupRef.current) {
            popupRef.current.focus();
        }
        document.addEventListener('mousedown', handleclickoutside);
        return () => {
            document.body.style.overflow = "auto";
            document.removeEventListener('mousedown', handleclickoutside);
        };
    }, []);
    return (
        <>
            <div className='fixed top-[0%] bottom-0 z-20 flex justify-center items-center backdrop-opacity-100 bg-black/25 backdrop-blur-lg w-full ' >
                <div ref={popupRef} className=' bg-white  rounded-3xl p-4 sm:p-8 md:p-10 w-5/6 md:w-2/3 lg:w-1/2  h-fit'>
                    <div >
                        <h3 className='text-green-600  font-poppins text-base lg:text-xl xl:text-2xl font-semibold'>{content}</h3>
                    </div>
                    {content === string.startup_pop && (
                        <div className="content font-poppins text-sm lg:text-lg xl:text-xl">
                            <div>{string.startup_content1}</div>
                            {/* <div>{string.startup_content2}</div>
                            <ul className='list-disc pl-5'>
                                {string.startup_array.map((index) => (
                                    <li className='marker:text-listcolor'>{index}</li>
                                ))}
                            </ul> */}
                        </div>
                    )}
                    {content === string.investors_pop && (
                        <div className="content font-poppins text-sm lg:text-lg xl:text-xl">
                            <div>{string.investors_content}</div>
                        </div>
                    )}
                    {content === string.Company_List_pop && (
                        <div className="content font-poppins text-sm lg:text-lg xl:text-xl">
                            <div>{string.Company_List_content}</div>
                        </div>
                    )}
                    {content === string.associate_pop && (
                        <div className="content font-poppins text-sm lg:text-lg xl:text-xl">
                            <div>{string.associate_content}</div>
                        </div>
                    )}
                    {content === string.sponsor_pop && (
                        <div className="content font-poppins text-sm lg:text-lg xl:text-xl">
                            <div>{string.sponsor_content}</div>
                        </div>
                    )}
                    {content === string.casual_pop && (
                        <div className="content font-poppins text-sm lg:text-lg xl:text-xl">
                            <div>{string.casual_content}</div>
                            <ul className='list-disc pl-6'>
                                {string.casual_array.map((index)=>(
                                    <li className='marker:text-listcolor'>{index}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {content === string.primecontractor_pop && (
                        <div className="content font-poppins text-sm lg:text-lg xl:text-xl">
                            <div>{string.primecontractor_content1}</div>
                            <div>{string.primecontractor_content2}</div>
                            <ul className="list-disc pl-6">
                                {string.primecontractor_array.map((index)=>(
                                    <li className='marker:text-listcolor'>{index}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {content === string.manufacturer_pop && (
                        <div className="content font-poppins text-sm lg:text-lg xl:text-xl">
                            <div>{string.manufacturer_content1}</div>
                            <div>{string.manufacturer_content2}</div>
                        </div>
                    )}
                    {content === string.keygovt_pop && (
                        <div className="content font-poppins text-sm lg:text-lg xl:text-xl">
                            <div>{string.keygovt_content1}</div>
                            <div>{string.keygovt_content2}</div>
                            <ul className="list-disc pl-6">
                                {string.ketgovt_array.map((index)=>(
                                    <li className='marker:text-listcolor'>{index}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

        </>
    )
}

export default PopupContent 