import React, { useEffect, useRef } from 'react'
import string from '../../../constants/string'
import { FaArrowLeft } from 'react-icons/fa'
import upload from '../../../assets/upload.png'

const NewsLetterPromo = ({ onClick, onClose }) => {
    const fileInputRef1 = useRef(null);
    const handleImageClick = (fileInputRef) => {
        fileInputRef.current.click();
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // Handle the file upload logic here
        console.log('Uploaded file:', file);
    };
    const payRef = useRef(null);
    const handleClickOutside = (e) => {
        if (payRef.current && !payRef.current.contains(e.target)) {
            onClose();
        }
    };
    useEffect(() => {
        // lockscroll 
        document.body.style.overflow = "hidden";
        document.addEventListener("mousedown", handleClickOutside);
        return () => {

            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-opacity-100 bg-black/25 backdrop-blur-lg">
            <div ref={payRef} className="container 3xl:w-[70%] w-[85%] font-poppins md:2/3 lg:w-[65%]">
                <div className='rounded-xl bg-white p-2 md:p-3 '>
                    <div className='flex justify-end'>
                        <button className='md:py-1 px-3 border-[1px] text-sm md:text-base xl:text-lg 2xl:text-xl text-textblue border-textblue rounded-full'>{string.newsskip}</button>
                    </div>
                    <div className='px-3 md:flex md:flex-col md:gap-4'>
                        <div>
                            <button onClick={onClose} className="flex items-center gap-2 font-semibold text-xl rounded-full bg-footerblue text-white p-1 px-2 pr-3">
                                <FaArrowLeft /> Back
                            </button>
                        </div>
                        <div>
                            <h2 className='font-semibold text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl'>{string.newsletterpopup}</h2>
                            <div className='text-xs md:text-sm xl:text-base 2xl:text-lg text-iconborder font-normal'>{string.newsletterpopupdisc}</div>
                        </div>
                        <div>
                            <div className=' text-sm md:text-base xl:text-lg 2xl:text-xl'>{string.newsletterupload}</div>
                            <div className='bg-communicationbg flex flex-col justify-center items-center md:p-10'>
                                <img
                                    src={upload}
                                    alt=""
                                    onClick={() => handleImageClick(fileInputRef1)}
                                    className='cursor-pointer'
                                />
                                <input
                                    type="file"
                                    ref={fileInputRef1}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                <div className='text-footerblue/70 text-sm md:text-base xl:text-lg 2xl:text-xl'>{string.newsletteruploadblue}</div>
                                <div className='text-footerblue/20 text-sm md:text-base xl:text-lg 2xl:text-xl'>{string.newsletteruploadbluesize}</div>
                            </div>
                        </div>
                        <div>
                            {string.newsletterinputlabel.map((i) => (
                                <div>
                                    <div className='text-sm md:text-base xl:text-lg 2xl:text-xl'>{i}</div>
                                    <textarea name="" id="" className='w-full'></textarea>
                                    <div className='text-textblue text-right text-sm md:text-base xl:text-lg 2xl:text-xl'>{i === "Text" ? string.newsletterinputdisc1 : ""}</div>
                                    <div className='text-textblue text-right text-sm md:text-base xl:text-lg 2xl:text-xl'>{i === "Article (if hosting required on IMR website. (optional))" ? string.newsletterinputdisc2 : ""}</div>
                                </div>
                            ))}
                        </div>
                        <div className='flex '>
                            {string.newsletterimageupload.map((item, index) => (
                                <div className='w-[50%] flex flex-col'>
                                    <div className='text-left text-sm md:text-base xl:text-lg 2xl:text-xl'>{item.title}</div>
                                    <div className='flex flex-col justify-center items-center md:p-8 bg-communicationbg'>
                                        <img
                                            src={upload}
                                            alt=""
                                            onClick={() => handleImageClick(fileInputRef1)}
                                            className='cursor-pointer'
                                        />
                                        <input
                                            type="file"
                                            ref={fileInputRef1}
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />
                                        <div className='text-footerblue/70 text-sm md:text-base xl:text-lg 2xl:text-xl'>{item.disc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='pb-8'>
                            <button onClick={onClick} className='bg-textblue text-white py-2 text-center w-full rounded-lg text-sm md:text-base xl:text-lg 2xl:text-xl'>{string.newsletterbtn}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsLetterPromo