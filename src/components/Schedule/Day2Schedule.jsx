import React, { useEffect, useRef, useState } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import CommonScheduleTable from './CommonScheduleTable'
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Day2Schedule = ({ closeModal, dataDay2 }) => {
    const [programMain, setProgramMain] = useState([]);
    const [program1Schedules, setProgram1Schedules] = useState([]);
    const [program2Schedules, setProgram2Schedules] = useState([]);
    useEffect(() => {
        if (!dataDay2) {
            // If dataDay2 is undefined or null, reset the schedules to empty arrays
            setProgramMain([]);
            setProgram1Schedules([]);
            setProgram2Schedules([]);
            return;
        }

        // Separate the schedules based on program value if dataDay2 is available
        const programMain = dataDay2.filter(item => item.program === 'Main Programme');
        const program1 = dataDay2.filter(item => item.program === 'PARALLEL PROGRAM 1');
        const program2 = dataDay2.filter(item => item.program === 'PARALLEL PROGRAM 2');

        setProgramMain(programMain);
        setProgram1Schedules(program1);
        setProgram2Schedules(program2);

        console.log('Program 1 Schedules:', program1);
        console.log('Program 2 Schedules:', program2);
        console.log('Program Main Schedules:', programMain);
    }, [dataDay2]);
    return (
        <div className='rounded-xl space-y-2 lg:space-y-4 p-4 lg:p-8'>
            <div>
                <button onClick={closeModal} className="flex items-center gap-2 font-semibold text-xl rounded-full bg-footerblue text-white p-1 px-2 pr-3">
                    <FaArrowLeft size={20} /> Back
                </button>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='px-4 font-bold text-lg lg:text-xl xl:text-2xl 2xl:text-3xl'>Schedule of Day 2 (29 NOVEMBER 2024)</div>
                <div className='flex flex-col gap-12'>
                    <CommonScheduleTable title="Main Programme - 28 NOVEMBER 2024" data={programMain} />
                    <CommonScheduleTable title="PARALLEL PROGRAM 1 (28 NOVEMBER 2024) - PRESENTATIONS AND WORKSHOPS IN ASHOKA HALL" data={program1Schedules} isParallel />
                    <CommonScheduleTable title="PARALLEL PROGRAM 2 (28 NOVEMBER 2024) - PRESENTATIONS AND WORKSHOPS IN SHAMSHER HALL" data={program2Schedules} isParallel />
                </div>
            </div>
        </div>
    )
}

export default Day2Schedule
