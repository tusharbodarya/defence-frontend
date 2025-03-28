import React, { useEffect, useRef, useState } from 'react'
import string from '../../constants/string'
import { Link } from 'react-router-dom'
import Day1Schedule from './Day1Schedule';
import Day2Schedule from './Day2Schedule';
import schedule1 from './../../assets/scheduleCentralTalk.png'
import schedule2 from './../../assets/schedulePresentations.png'
import schedule3 from './../../assets/scheduleWorkshops.png'
import { getSchedule } from '../../apiEndpoints';

const Schedule = () => {
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [day1Schedules, setDay1Schedules] = useState([]);
  const [day2Schedules, setDay2Schedules] = useState([]);
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const { day1Schedules, day2Schedules } = await getSchedule();
        setDay1Schedules(day1Schedules);
        setDay2Schedules(day2Schedules);
      } catch (error) {
        console.error('Failed to fetch schedules:', error);
      }
    };

    fetchSchedule();
  }, []);

  const openModal1 = () => {
    setIsModalOpen1(true);
  };
  const openModal2 = () => {
    setIsModalOpen2(true);
  };

  const closeModal = () => {
    setIsModalOpen1(false);
    setIsModalOpen2(false);
  };

  const scheduleRef = useRef();
  useEffect(() => {
    const handleClickOutside = (e) => {
      e.preventDefault();
      if (scheduleRef.current && !scheduleRef.current.contains(e.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [scheduleRef]);
  return (
    <section className='flex justify-center min-h-screen py-14'>
      <div className="container 3xl:w-[70%] py-20 px-12 md:px-0 xl:px-20">
        <div className="relative heading flex justify-center items-center text-center mb-8 ">
          <h2 className='font-EBGaramond uppercase lg:py-2 text-lg sm:text-lg  md:text-3xl lg:text-4xl xl:text-5xl font-normal'>{string.scheduletitle}</h2>
          <div className="absolute bottom-0 left-[47.5%] right-[47.5%] w-[5%] h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC] "></div>
        </div>
        <div className="flex flex-col md:flex-row justify-center mb-20 w-full gap-4 xl:gap-8  px-0 py-4 ">
          <div className='flex justify-center flex-col gap-4 w-full '>
            <div className='bg-[#f0f7ff] py-2 md:py-4 xl:py-6 px-4 md:px-8 xl:px-12'>
              <h3 className='text-center text-base md:text-lg lg:text-2xl xl:text-3xl flex justify-between' onClick={() => console.log(day1Schedules)}> Day 1 ( 28 Nov 2024 )
                <button className='underline text-schedulered' onClick={openModal1}>
                  See Schedule
                </button>
              </h3>
            </div>
            <div className='bg-[#f0f7ff] py-2 md:py-4 xl:py-6 px-4 md:px-8 xl:px-12'>
              <h3 className='text-center text-base md:text-lg lg:text-2xl xl:text-3xl flex justify-between' onClick={() => console.log(day2Schedules)}> Day 2 ( 29 Nov 2024 )
                <button className='text-schedulered underline' onClick={openModal2}>
                  See Schedule
                </button>
              </h3>
            </div>
          </div>
        </div>
        <div className="schedulesection">
          <div className="heading py-4">
            <h3 className='font-semibold text-lg md:text-xl lg:text-2xl xl:text-3xl'>Central Talks, Presentations and Workshops</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8 py-2">
            <div className='flex flex-col gap-2'>
              <div className='pb-2'>
                <img src={schedule1} alt="" className='w-full' />
              </div>
              <div className="font-semibold content text-base md:text-lg lg:text-xl xl:text-2xl">Central Talks</div>
              <p className='text-sm md:text-base lg:text-[1.125rem] xl:text-xl text-black/50 text-justify'>At the begining of both days, and thereafter during Parallel Sessions, central talks are planned  for the benefit of all. For details please go to Central Talks.</p>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='pb-2'>
                <img src={schedule2} alt="" className='w-full' />
              </div>
              <div className="font-semibold content text-base md:text-lg lg:text-xl xl:text-2xl">Presentations</div>
              <p className='text-sm md:text-base lg:text-[1.125rem] xl:text-xl text-black/50 text-justify'>Presentations will be made by Subject Matter Experts during the Parallel Sessions. These experts  are from the Ministry of Defence and its Departments, DRDO, Armed Forces and Corporate world. For details please go to Flash Presentations.</p>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='pb-2'>
                <img src={schedule3} alt="" className='w-full' />
              </div>
              <div className="font-semibold content text-base md:text-lg lg:text-xl xl:text-2xl">Workshops</div>
              <p className='text-sm md:text-base lg:text-[1.125rem] xl:text-xl text-black/50 text-justify'>Workshops will be conducted by Subject Matter Experts during the Parallel Sessions. These experts  are from the Ministry of Defence and its Departments, DRDO, Armed Forces and Corporate world.  For details please go to Workshops.</p>
            </div>
          </div>
        </div>
        {isModalOpen1 && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div ref={scheduleRef} className="bg-white md:p-4 rounded-lg shadow-lg w-[90%] h-[90vh] overflow-y-auto relative">
              <Day2Schedule dataDay2={day1Schedules} closeModal={closeModal} />
            </div>
          </div>
        )}
        {isModalOpen2 && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div ref={scheduleRef} className="bg-white md:p-4 rounded-lg shadow-lg w-[90%] h-[90vh] overflow-y-auto relative">
              <Day2Schedule dataDay2={day2Schedules} closeModal={closeModal} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Schedule