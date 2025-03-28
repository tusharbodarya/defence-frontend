import React from 'react'
import manekshowCenter from './../../assets/manekshowCenter.png'
import blueTick from './../../assets/blueTickMarkVenue.png'
import venue from './venue'
import location1 from './../../assets/location1.png'
import location2 from './../../assets/location2.png'
import location3 from './../../assets/location3.png'
import location4 from './../../assets/location4.png'
import location5 from './../../assets/location5.png'
import location6 from './../../assets/location6.png'
import mainManekshow from './../../assets/mainManeshshaw.png'
import itc from './../../assets/ITC.png'
import leela from './../../assets/Leela.png'
import taj from './../../assets/Taj.png'
import jaypee from './../../assets/Jaypee.png'
import hyatt from './../../assets/Hyatt.png'
import pullman from './../../assets/Pullman.png'
import novotel from './../../assets/Novotel.png'
import ibis from './../../assets/ibis.png'
import reseate from './../../assets/Roseat.png'
import holiday from './../../assets/holiday.png'

const Venue = () => {
    return (
        <section className='flex flex-col items-center justify-center py-14'>
            <div className="container 3xl:w-[70%] p-4 ">
                <div className="relative heading mb-4 grid grid-cols-5 items-center gap-4 lg:gap-8 xl:gap-12">
                    <div className='col-span-5 md:col-span-3 flex flex-col justify-between  text-sm sm:text-base md:text-base xl:text-lg h-full'>
                        <div>Venue</div>
                        <h2 className='font-EBGaramond uppercase xl:py-2 text-xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold' >Manekshaw Centre</h2>
                        <div className='text-justify'>The Manekshaw Centre is a modern multi-utility state-of-the-art building constructed in 2010. Built at a cost of $14.5 million and spread over 25 acres,  the Centre was inaugurated by Mrs Pratibha Patil, Hon'ble President of India on 21st October 2010.</div>
                        <div className='text-justify'>Built in the memory of Field Marshal SHFJ Manekshaw, it is situated on the left side of the main road (NH8) from International Airport-Dhaula Kuan (Approx. distance from Airport-9 kms; from Hotel ITC Maurya 5 kms).</div>
                        <div className='text-justify'>The Convention Centre is designed to hold conferences, seminars, exhibitions, stage performances, investiture ceremonies and banquets.</div>
                    </div>
                    <div className='col-span-5 md:col-span-2 lg:h-full border border-[#11498D]/50 rounded-3xl overflow-hidden'>
                        <img src={manekshowCenter} alt="" className='w-full' />
                        <div className='text-[#11498D] text-center  text-sm sm:text-base md:text-base xl:text-lg py-2 lg:py-4'>The Manekshaw Centre</div>
                    </div>
                </div>
                <div className='pt-4'>
                    <div className='text-[#1A74E2]  text-sm sm:text-base md:text-lg xl:text-xl pb-4'>The event will be held in the following locations at the Manekshaw Centre.</div>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-2 lg:gap-4 '>
                        {venue.locations.map((item, index) => (
                            <div key={index} className='flex items-start gap-2'>
                                <div className='py-1 flex items-center justify-center'>
                                    <img src={blueTick} alt="" className='size-6' />
                                </div>
                                <div className='text-sm sm:text-base md:text-base xl:text-lg '>
                                    <div className=''>{item.name}</div>
                                    <div className='text-black/50 text-[0.9rem]'>{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8 xl:gap-12 py-12'>
                    <div className=' lg:h-full border border-[#11498D]/50 rounded-3xl overflow-hidden'>
                        <img src={location1} alt="" className='w-full' />
                        <div className='text-white text-center bg-gradient-to-r from-footerblue to-textblue  text-sm sm:text-base md:text-base xl:text-lg py-2 lg:py-4'> Main Gate Manekshaw Centre</div>
                    </div>
                    <div className=' lg:h-full border border-[#11498D]/50 rounded-3xl overflow-hidden'>
                        <img src={location2} alt="" className='w-full' />
                        <div className='text-white text-center bg-gradient-to-r from-footerblue to-textblue text-sm sm:text-base md:text-base xl:text-lg py-2 lg:py-4'> Entrance to Foyer</div>
                    </div>
                    <div className=' lg:h-full border border-[#11498D]/50 rounded-3xl overflow-hidden'>
                        <img src={location3} alt="" className='w-full' />
                        <div className='text-white text-center bg-gradient-to-r from-footerblue to-textblue text-sm sm:text-base md:text-base xl:text-lg py-2 lg:py-4'> Foyer</div>
                    </div>
                    <div className=' lg:h-full border border-[#11498D]/50 rounded-3xl overflow-hidden'>
                        <img src={location4} alt="" className='w-full' />
                        <div className='text-white text-center bg-gradient-to-r from-footerblue to-textblue text-sm sm:text-base md:text-base xl:text-lg py-2 lg:py-4'> Reception Area for Meeting Tables</div>
                    </div>
                    <div className=' lg:h-full border border-[#11498D]/50 rounded-3xl overflow-hidden'>
                        <img src={location5} alt="" className='w-full' />
                        <div className='text-white text-center bg-gradient-to-r from-footerblue to-textblue text-sm sm:text-base md:text-base xl:text-lg py-2 h-full lg:py-4'> Exhibition Hall 2 (Lower)</div>
                    </div>
                    <div className=' lg:h-full border border-[#11498D]/50 rounded-3xl overflow-hidden'>
                        <img src={location6} alt="" className='w-full' />
                        <div className='text-white text-center bg-gradient-to-r from-footerblue to-textblue text-sm sm:text-base md:text-base xl:text-lg h-full py-2 lg:py-4'>Exhibition Hall 1 (Upper)</div>
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <img src={mainManekshow} alt="" className='w-full' />
            </div>
            <div className="container 3xl:w-[70%] p-4 py-20">
                <div className='text-center relative mb-8'>
                    <h2 className='font-EBGaramond uppercase xl:py-2 text-xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold' > HOTEL IN THE VICINITY OF </h2>
                    <h2 className='font-EBGaramond uppercase xl:py-2 text-xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1A74E2]' > MANEKSHAW CENTRE</h2>
                    <div className='text-black/50  text-sm sm:text-base md:text-lg xl:text-xl pb-4'>IMR recommends the following quality hotels located near the venue, within a radius of 5 kms:</div>
                    <div className="absolute bottom-0 left-[50%] right-[50%] transform -translate-x-1/2 -translate-y-1/2 w-8 md:w-10 lg:w-12 xl:w-16 h-[0.17rem] bg-[#1189CC] rounded-[20px]"></div>
                </div>
                <div className='grid grid-cols-2 justify-between gap-4 lg:gap-8 xl:gap-12'>
                    <div className='flex gap-4'>
                        <div>
                            <img src={itc} alt="" />
                        </div>
                        <div className='text-lg sm:text-lg md:text-xl xl:text-2xl'>
                            <div className='font-semibold'>ITC Maurya, a Luxury Collection Hotel, New Delhi</div>
                            <div className='text-black/50 text-sm sm:text-base md:text-base xl:text-lg'>3.5 km from Manekshaw Centre</div>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div>
                            <img src={leela} alt="" />
                        </div>
                        <div className='text-lg sm:text-lg md:text-xl xl:text-2xl'>
                            <div className='font-semibold'>The Leela Palace New Delhi</div>
                            <div className='text-black/50 text-sm sm:text-base md:text-base xl:text-lg'>4.5 km from Manekshaw Centre</div>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div>
                            <img src={taj} alt="" />
                        </div>
                        <div className='text-lg sm:text-lg md:text-xl xl:text-2xl'>
                            <div className='font-semibold'>Taj Palace</div>
                            <div className='text-black/50 text-sm sm:text-base md:text-base xl:text-lg'>3 km from Manekshaw Centre</div>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div>
                            <img src={jaypee} alt="" />
                        </div>
                        <div className='text-lg sm:text-lg md:text-xl xl:text-2xl'>
                            <div className='font-semibold'>Jaypee Vasant Continental</div>
                            <div className='text-black/50 text-sm sm:text-base md:text-base xl:text-lg'>3.5 km from Manekshaw Centre</div>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div>
                            <img src={hyatt} alt="" />
                        </div>
                        <div className='text-lg sm:text-lg md:text-xl xl:text-2xl'>
                            <div className='font-semibold'>Hyatt Regency Delhi</div>
                            <div className='text-black/50 text-sm sm:text-base md:text-base xl:text-lg'>4.5 km from Air Force Auditorium</div>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div>
                            <img src={pullman} alt="" />
                        </div>
                        <div className='text-lg sm:text-lg md:text-xl xl:text-2xl'>
                            <div className='font-semibold'>Pullman New Delhi Aerocity</div>
                            <div className='text-black/50 text-sm sm:text-base md:text-base xl:text-lg'>3.5 km from Manekshaw Centre</div>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div>
                            <img src={novotel} alt="" />
                        </div>
                        <div className='text-lg sm:text-lg md:text-xl xl:text-2xl'>
                            <div className='font-semibold'>Hotel Novotel New Delhi Aerocity</div>
                            <div className='text-black/50 text-sm sm:text-base md:text-base xl:text-lg'>4.0 km from Manekshaw Centre</div>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div>
                            <img src={ibis} alt="" />
                        </div>
                        <div className='text-lg sm:text-lg md:text-xl xl:text-2xl'>
                            <div className='font-semibold'>ibis New Delhi Aerocity - An Accor Brand</div>
                            <div className='text-black/50 text-sm sm:text-base md:text-base xl:text-lg'>4.5 Km from Manekshaw Centre</div>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div>
                            <img src={reseate} alt="" />
                        </div>
                        <div className='text-lg sm:text-lg md:text-xl xl:text-2xl'>
                            <div className='font-semibold'>Roseate House New Delhi</div>
                            <div className='text-black/50 text-sm sm:text-base md:text-base xl:text-lg'>5 Km from Manekshaw Centre</div>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div>
                            <img src={holiday} alt="" />
                        </div>
                        <div className='text-lg sm:text-lg md:text-xl xl:text-2xl'>
                            <div className='font-semibold'>Holiday Inn New Delhi International Airport</div>
                            <div className='text-black/50 text-sm sm:text-base md:text-base xl:text-lg'>4.5 Km from Manekshaw Centre</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Venue
