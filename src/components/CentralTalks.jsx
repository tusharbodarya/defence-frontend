import React from 'react'
import centralimg from "../assets/centraltalks.png"
import string from '../constants/string'
import { Link } from 'react-router-dom'

const topics = [
    { dot: "DPP 2020", dash: "- DG Acquisition, MoD" },
    { dot: 'Tech Development Fund', dash: '- DTDF, DRDO' },
    { dot: "Defence India Startup Challenge", dash: "- iDEX-DIO" },
    { dot: "Make 1 (Government funded)", dash: '- DDP ' },
    { dot: 'Make 2 (Industry funded)', dash: "- DDP " },
    { dot: "DRDO ToT Policy and Procedures", dash: '- DIITM, DRDO ' },
    { dot: 'Partnering with DRDO', dash: "- DIITF, DRDO " },
    { dot: 'DGQA Incentive Schemes   ', dash: '- DGQA' },
    { dot: 'Policy for indigenisation of components and spares   ', dash: '- Dte of Plg & Coord, DDP' },
    { dot: "Indigenisation Items on GeM Portal", dash: "- GeM" },
    { dot: 'Scheme for Promotion of MSMEs in Defence   ', dash: '- EP Cell, DDG Exports, DDP' },
    { dot: "Test Facilities for Private Sector   ", dash: '- DMS, DRDO' },
    { dot: 'Facilitating Exports by Private Sector ', dash: "- DDG Exports/ Promotion Cell, DDP" },
    { dot: 'Outsourcing & Vendor Development       Guidelines for DPSUs and New Defence Companies   ', dash: "- Dte of Plg & Coord, DDP" },
    { dot: 'Eligibility Criteria for Indian Private Firms as Production Agency   ', dash: "- Dte of Plg & Coord, DDP" },
    { dot: "Indian Navy's Indigenisation Plan 2015-2030  ", dash: '- Dte of Indigenisation, Naval HQ' },
    { dot: 'Scheme for self certification of Defence Public Sector & Private Vendors 2019 ', dash: '- DGQA' },
    { dot: 'Third Party Inspection   ', dash: '- DGQA' },
    { dot: "Industrial Licensing Policy in Defence Sector", dash: '- D(DIP), DDP' }
]

const CentralTalks = () => {
    return (
        <section className='flex justify-center py-14'>
            <div className="container 3xl:w-[70%] p-4 ">
                <div className="relative heading flex justify-center mb-4">
                    <h2 className='font-EBGaramond uppercase xl:py-2 text-xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold' >{string.centraltitle}</h2>
                    <div className="absolute bottom-0 left-[47.5%] right-[47.5%] w-[5%] h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC] "></div>
                </div>
                <div className="p-4 flex justify-center flex-col gap-8">
                    <div className="image flex justify-center lg:px-8">
                        <img src={centralimg} alt="CENTRALTALKSIMG" />
                    </div>
                    <div>
                        {topics.map((index) => (
                            <div key={index} className=' flex  xl:py-1 pl-8 lg:pl-24 xl:pl-40  ' >
                                <div className="dot w-[50%] lg:pr-20 xl:pr-40 text-sm md:text-base lg:text-lg xl:text-xl">
                                    <ul className='list-disc'>
                                        <li>{index.dot}</li>
                                    </ul>
                                </div>
                                <div className="dash w-[50%] text-sm md:text-base lg:text-lg xl:text-xl">
                                    {index.dash}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='bg-textblue mx-12 rounded-xl text-white'>
                    <div className=' py-2 w-[80%] lg:w-[60%] mx-auto text-sm md:text-base lg:text-lg xl:text-xl text-center'>{string.centralbluebg1} <Link to="/schedule"><button className='underline font-semibold'>{string.centralbluebtn}</button></Link>{string.centralbluebg2} </div>
                </div>

            </div>
        </section>
    )
}

export default CentralTalks