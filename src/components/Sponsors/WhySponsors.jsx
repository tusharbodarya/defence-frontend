import React, { useRef } from 'react'
// import sponsor from '../../constants/sponsor'
import sponsor from '../../constants/sponsor'
import association from '../../assets/association.png'
import corporate from '../../assets/corporatesponsor.png'
import CommonWhySponsor from './CommonWhySponsor'
import CommonFollowing from './CommonFollowing'

const WhySponsors = () => {

    const corporateRef = useRef(null);
    const associationRef = useRef(null);

    const handleScroll = (ref) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className='flex flex-col justify-center items-center  bg-lightblue'>
            <div className="container 3xl:w-[70%] px-4 xl:px-20 py-20 font-poppins">
                <div className='pb-20'>
                    <div className="relative my-4 md:my-8 lg:my-12 xl:my-16 text-center font-EBGaramond">
                        <h2 className='uppercase text-xl md:text-2xl lg:text-2xl xl:text-4xl font-bold pb-[0.35rem]'>{sponsor.whysponsor}</h2>
                        <div className="absolute bottom-0 left-1/2 -translate-x-[50%] w-8 md:w-10 lg:w-12 xl:w-16 h-[0.17rem] bg-[#1189CC] rounded-[20px]"></div>
                    </div>
                    <div className='text-footerblue text-xs md:text-sm xl:text-base 2xl:text-lg'>{sponsor.whysponsorblue}</div>
                    <div className='flex py-8'>
                        {sponsor.whysponsorarray.map((item, index) => (
                            <div className='w-[50%] p-4 relative text-center md:text-left'>
                                <div className='absolute top-0 text-footerblue/10 text-lg md:text-xl lg:text-3xl xl:text-4xl 2xl:text-5xl'>{item.number}</div>
                                <div className='font-normal text-sm md:text-base xl:text-lg 2xl:text-xl'>{item.title}</div>
                                <div className='text-xs md:text-sm xl:text-base 2xl:text-lg text-iconborder'>{item.disc}</div>
                                <div className='py-6'>
                                    <button
                                        onClick={() => handleScroll(index === 0 ? corporateRef : associationRef)}
                                        className='text-xs md:text-sm xl:text-base 2xl:text-lg bg-textblue rounded-full text-white py-1 px-4'>
                                        {item.btn}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='py-12' ref={corporateRef}>
                        <CommonWhySponsor title={sponsor.corporatesponsor} disc={sponsor.corporatedisc} array={sponsor.corporatediscarray} img={corporate} />
                    </div>
                    <div className=''>
                        <div className='text-base md:text-lg lg:text-lg xl:text-xl py-4 font-semibold'>{sponsor.spofollo}</div>
                        <CommonFollowing title={sponsor.platinum} index={1} array={sponsor.platinumarray} btn={sponsor.bookbtn} price={50000000} category={"B"} child_category={"B1"} subcategory={"Corporate Sponsorship"} />
                        <CommonFollowing title={sponsor.gold} index={2} array={sponsor.goldarray} btn={sponsor.bookbtn} price={40000000} category={"B"} child_category={"B2"} subcategory={"Corporate Sponsorship"} />
                        <CommonFollowing title={sponsor.silver} index={3} array={sponsor.silverarray} btn={sponsor.bookbtn} price={30000000} category={"B"} child_category={"B3"} subcategory={"Corporate Sponsorship"} />
                    </div>
                    <div className='py-12' ref={associationRef}>
                        <CommonWhySponsor title={sponsor.assosponsor} disc={sponsor.assodisc} array={sponsor.assodiscarray} img={association} />
                    </div>
                    <div className=''>
                        <div className='text-base md:text-lg lg:text-lg xl:text-xl py-4 font-semibold'>{sponsor.spofollo}</div>
                        <CommonFollowing title={sponsor.strategic} value={1} array={sponsor.strategicarray} btn={sponsor.bookbtn} price={120000000} category={"B"} child_category={"B4"} subcategory={"Association Sponsorship"} />
                        <CommonFollowing title={sponsor.innovation} value={2} array={sponsor.innovationarray} btn={sponsor.bookbtn} price={85000000} category={"B"} child_category={"B5"} subcategory={"Association Sponsorship"} />
                        <CommonFollowing title={sponsor.technology} value={3} array={sponsor.technologyarray} btn={sponsor.bookbtn} price={65000000} category={"B"} child_category={"B6"} subcategory={"Association Sponsorship"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhySponsors