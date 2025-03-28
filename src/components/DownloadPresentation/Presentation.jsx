import React from 'react'
import downlaod from './../../assets/presentationDownload.png'
import uploaded from './../../assets/pdfIcon.png'
import { Link } from 'react-router-dom'

const Presentation = ({ hrefURL, img, companyName, fileName, disc, href }) => {
    return (
        <div className='space-y-2 '>
            <div className='relative h-48 lg:h-40 w-72 lg:w-60 mx-auto rounded-2xl overflow-hidden flex justify-center items-center '>
                {img !== "img" ? (
                    <a href={hrefURL} target='_blank' className='w-full'>
                        <img src={img} alt="brochure" className='z-20 w-full' />
                    </a>
                ) : (
                    // <div className='w-full h-full bg-iconborder/25'></div>
                    <img src={uploaded} alt="brochure" className=' w-full h-full ' />
                )}
                <a
                    // downlaod
                    className="flex justify-between items-center rounded-full backdrop-blur-xl bg-black/10 backdrop-opacity-100 p-4 absolute top-1/2 right-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 -z-10"
                >
                    <img src={downlaod} alt="" className='w-full' />
                </a>
            </div>
            <div className='text-center text-iconborder text-xs lg:text-sm '>{fileName}</div>
            <div className='text-center text-iconborder text-xs lg:text-sm '>{companyName}</div>
            <div className='text-center'>
                <button className='text-textblue border border-textblue  text-sm md:text-base lg:text-lg xl:text-xl p-2 rounded-lg'>
                    <Link to={hrefURL} target="_blank" download>
                        Download
                    </Link>
                </button>
            </div>
            <div className='text-sm md:text-base lg:text-lg xl:text-xl text-center  h-min max-h-14 overflow-y-auto'>
                {disc}
            </div>
        </div>
    )
}

export default Presentation
