import React from 'react'
import string from '../../constants/string'

const PrivacyPolicy = () => {
    return (
        <section className='flex flex-col items-center justify-center py-14 mb-8 2xl:mb-16'>
            <div className="container 3xl:w-[70%] px-8 xl:px-20">
                <div className="relative heading flex justify-center items-center text-center mb-12">
                    <h2 className='font-EBGaramond uppercase lg:py-2 text-lg sm:text-lg md:text-3xl lg:text-4xl xl:text-5xl font-normal'>{string.privacyPolicy.title}</h2>
                    <div className="absolute bottom-0 left-[47.5%] right-[47.5%] w-[5%] h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC] "></div>
                </div>
                <div className='text-center text-base sm:text-lg md:text-xl lg:text-2xl '>{string.privacyPolicy.subtitle} </div>
                <div className='text-base sm:text-lg md:text-xl lg:text-2xl space-y-4 py-4'>
                    <div>{string.privacyPolicy.discription}</div>
                    <div>{string.privacyPolicy.discription2}</div>
                </div>
                <div className='py-4 text-base sm:text-lg md:text-xl lg:text-2xl space-y-8'>
                    <div className=''>
                        <div className='font-semibold'>{string.privacyPolicy.scope}</div>
                        <div>{string.privacyPolicy.scopeDisc1}</div>
                        <div>{string.privacyPolicy.scopeDisc2}</div>
                    </div>
                    <div className='space-y-2'>
                        <div className='font-semibold'>{string.privacyPolicy.collectionPI}</div>
                        <div>{string.privacyPolicy.collectionPIDisc1}</div>
                        <div>{string.privacyPolicy.collectionPIDisc2}</div>
                        <div>{string.privacyPolicy.collectionPIDisc3}</div>
                    </div>
                    <div className='space-y-2'>
                        <div className='font-semibold'>{string.privacyPolicy.purpose}</div>
                        <div>{string.privacyPolicy.purposeDisc1}</div>
                        <ul className=''>
                            {string.privacyPolicy.purposeDisc1Array.map((i) => (
                                <li>{i}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='space-y-2'>
                        <div className='font-semibold'>{string.privacyPolicy.rightPI}</div>
                        <div>{string.privacyPolicy.rightPIDisc1}</div>
                    </div>
                    <div className='space-y-2'>
                        <div className='font-semibold'>{string.privacyPolicy.sharing}</div>
                        <div>{string.privacyPolicy.sharingDisc1}</div>
                        <div>{string.privacyPolicy.sharingDisc2}</div>
                        <div>{string.privacyPolicy.sharingDisc3}</div>
                        <div>{string.privacyPolicy.sharingDisc4}</div>
                        <div>{string.privacyPolicy.sharingDisc5}</div>
                    </div>
                    <div className='space-y-2'>
                        <div className='font-semibold'>{string.privacyPolicy.security}</div>
                        <div>{string.privacyPolicy.securityDisc1}</div>
                        <div>{string.privacyPolicy.securityDisc2}</div>
                    </div>
                    <div className='space-y-2'>
                        <div className='font-semibold'>{string.privacyPolicy.retention}</div>
                        <div>{string.privacyPolicy.retentionDisc1}</div>
                    </div>
                    <div className='space-y-2'>
                        <div className='font-semibold'>{string.privacyPolicy.cookies}</div>
                        <div>{string.privacyPolicy.cookiesDisc1}</div>
                        <ul>
                            {string.privacyPolicy.cookiesDisc1Array.map((i) => (
                                <li>{i}</li>
                            ))}
                        </ul>
                        <div>{string.privacyPolicy.cookiesDisc2}</div>
                        <div>{string.privacyPolicy.cookiesDisc3}</div>
                        <div>{string.privacyPolicy.cookiesDisc4}</div>
                        <div>{string.privacyPolicy.cookiesDisc5}</div>
                    </div>
                    <div className='space-y-2'>
                        <div className='font-semibold'>{string.privacyPolicy.cross}</div>
                        <div>{string.privacyPolicy.crossDisc1}</div>
                        <div>{string.privacyPolicy.crossDisc2}</div>
                    </div>
                    <div className='space-y-2'>
                        <div className='font-semibold'>{string.privacyPolicy.shield}</div>
                        <div>{string.privacyPolicy.shieldDisc1}</div>
                        <div>{string.privacyPolicy.shieldDisc2}</div>
                    </div>
                    <div className='space-y-2'>
                        <div className='font-semibold'>{string.privacyPolicy.prospective}</div>
                        <div>{string.privacyPolicy.prospectiveDisc1}</div>
                        <div>{string.privacyPolicy.prospectiveDisc2}</div>
                        <div>{string.privacyPolicy.prospectiveDisc3}</div>
                        <div>{string.privacyPolicy.prospectiveDisc4}</div>
                        <div>{string.privacyPolicy.prospectiveDisc5}</div>
                        <div>{string.privacyPolicy.prospectiveDisc6}</div>
                    </div>
                    <div className='space-y-2'>
                        <div className='font-semibold'>{string.privacyPolicy.contractual}</div>
                        <div>{string.privacyPolicy.contractualDisc1}</div>
                    </div>
                    <div className='space-y-2'>
                        <div className='font-semibold'>{string.privacyPolicy.website}</div>
                        <div>{string.privacyPolicy.websiteDisc1}</div>
                    </div>
                    <div className='space-y-2'>
                        <div className='font-semibold'>{string.privacyPolicy.contactInfo}</div>
                        <div>{string.privacyPolicy.contactInfoDisc}</div>
                    </div>
                    <div>
                        <ul>
                            {string.privacyPolicy.contact.map((i) => (
                                <li>{i}</li>
                            ))}
                        </ul>
                    </div>
                    <div>{string.privacyPolicy.contactLine}</div>
                    <div>{string.privacyPolicy.date}</div>
                </div>
            </div>
        </section>
    )
}

export default PrivacyPolicy