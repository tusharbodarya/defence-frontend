import React from 'react'

const Hiwcomponent = ({ index, title, body, image }) => {
  return (
    <div className={index ? "flex md:flex-row-reverse gap-4 lg:gap-6 flex-col" : "flex md:flex-row flex-col gap-4 lg:gap-6"}>
      <div className="content w-full md:w-[50%] flex flex-col justify-start gap-6 ">
        <div className="heading w-full ">
          <h3 className='w-full text-sm text-white font-semibold font-EBGaramond md:text-base lg:text-lg xl:text-2xl bg-textblue rounded-xl py-2 xl:py-4 px-2 lg:px-4'>{title}</h3>
        </div>
        <div className="lg:leading-7 text-justify text-sm md:text-base lg:text-[1.125rem] xl:text-xl ">{body}</div>
      </div>
      <div className="image w-full md:w-[50%]">
        <img src={image} alt="image" className='md:w-full' />
      </div>
    </div>
  )
}

export default Hiwcomponent