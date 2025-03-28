import React from 'react'
import string from '../../constants/string'
import brand1 from '../../assets/brand1.png'
import brand2 from '../../assets/brand2.png'
import brand3 from '../../assets/brand3.png'
import brand4 from '../../assets/brand4.png'
import brand5 from '../../assets/brand5.png'
import brand6 from '../../assets/brand6.png'
import Common from './Common'
import tick from '../../assets/tick.png'

const BrandOption = () => {
    const imgs = [brand1, brand2, brand3, brand4, brand5, brand6];
    return (
        <div className='flex flex-col justify-center items-center  bg-lightblue'>
            <div className="container 3xl:w-[70%] px-4 xl:px-20 py-20">
                <div className='pb-20'>
                    <div className="relative my-4 md:my-8 lg:my-12 xl:my-16 text-center font-EBGaramond">
                        <h2 className='uppercase text-xl md:text-2xl lg:text-2xl xl:text-4xl font-bold pb-[0.35rem]'>{string.branding}</h2>
                        <div className="absolute bottom-0 left-1/2 -translate-x-[50%] w-8 md:w-10 lg:w-12 xl:w-16 h-[0.17rem] bg-[#1189CC] rounded-[20px]"></div>
                    </div>
                    <div className='space-y-8'>
                        <Common number={"01"} title={string.regiSponsor} tick={tick} disc={string.regiSponsorDisc} btn1={string.bookSponsorship} btn2={""}
                            img={brand1} value1={string.regiSponsorPrice} value2={""} category={"D"} subcategory={"D1"} />
                        <Common number={"02"} title={string.lanyardSponsor} tick={tick} disc={string.lanyardSponsorDisc} btn1={string.bookSponsorship} btn2={""}
                            img={brand2} value1={string.lanyardSponsorPrice} value2={""} category={"D"} subcategory={"D2"} />
                        <Common number={"03"} title={string.delegateSponsor} tick={tick} disc={string.delegateSponsorDisc} btn1={string.bookSponsorship} btn2={""}
                            img={brand3} value1={string.delegateSponsorPrice} value2={""} category={"D"} subcategory={"D3"} />
                        <Common number={"04"} title={string.nameSponsor} tick={tick} disc={string.nameSponsorDisc} btn1={string.bookSponsorship} btn2={""}
                            img={brand4} value1={string.nameSponsorPrice} value2={""} category={"D"} subcategory={"D4"} />
                        <Common number={"05"} title={string.lunchSponsor} tick={tick} disc={string.lunchSponsorDisc} btn1={string.bookDay1} btn2={string.bookDay2}
                            img={brand5} value1={string.lunchSponsorPrice1} value2={string.lunchSponsorPrice2} category={"D"} subcategory1={"D5a"} subcategory2={"D5b"} />
                        <Common number={"06"} title={string.refreshmentSponsor} tick={tick} disc={string.refreshmentSponsorDisc} btn1={string.bookDay1} btn2={string.bookDay2}
                            img={brand6} value1={string.refreshmentSponsorPrice1} value2={string.refreshmentSponsorPrice2} category={"D"} subcategory1={"D6a"} subcategory2={"D5b"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrandOption