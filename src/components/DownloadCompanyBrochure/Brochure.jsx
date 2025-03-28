import React from 'react';
import { Link } from 'react-router-dom';

const Brochure = ({ img, companyName, href, disc, btn }) => {
    return (
        <div className='space-y-2 h-full flex flex-col '>
            <div className='h-72 xl:h-72 w-60 max-w-full mx-auto overflow-hidden'>
                <a href={href} target='_blank' rel="noopener noreferrer" className='w-full '>
                    {img !== null ? (
                        <img src={img} alt="brochure" className='h-full w-full mx-auto rounded-2xl' />
                    ) : (
                        <div className='w-full h-full bg-iconborder/25 rounded-2xl'></div>
                    )}
                </a>
            </div>
            <div className='text-center'>
                <button className='text-textblue border border-textblue  text-sm md:text-base lg:text-lg xl:text-xl p-2 rounded-lg'>
                    <Link to={href} target="_blank" download>
                        {btn}
                    </Link>
                </button>
            </div>
            <div className='text-iconborder text-xs lg:text-sm text-center '>{companyName}</div>
            {/* Updated to make the disc scrollable */}
            <div className='text-sm md:text-base lg:text-lg xl:text-xl text-center h-min max-h-14 overflow-y-auto'>
                {disc}
            </div>
        </div>
    );
}

export default Brochure;
