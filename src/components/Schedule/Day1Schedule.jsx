import React, { useEffect, useRef, useState } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import CommonScheduleTable from './CommonScheduleTable'
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Day1Schedule = ({ closeModal, dataDay1 = [] }) => {
    const [programMain, setProgramMain] = useState([]);
    const [program1Schedules, setProgram1Schedules] = useState([]);
    const [program2Schedules, setProgram2Schedules] = useState([]);

    useEffect(() => {
        if (!Array.isArray(dataDay1)) return; // Exit if dataDay1 is not a valid array

        const programMainData = Array.isArray(dataDay1) ? dataDay1.filter(item => item.program === 'Main Programme') : [];
        const program1Schedules = Array.isArray(dataDay1) ? dataDay1.filter(item => item.program === 'PARALLEL PROGRAM 1') : [];
        const program2Schedules = Array.isArray(dataDay1) ? dataDay1.filter(item => item.program === 'PARALLEL PROGRAM 2') : [];

        setProgramMain(programMainData);
        setProgram1Schedules(program1Schedules);
        setProgram2Schedules(program2Schedules);
    }, [dataDay1]); // Only run when dataDay1 changes

    return (
        <div className='rounded-xl space-y-2 lg:space-y-4 p-4 lg:p-8'>
            <div>
                <button onClick={closeModal} className="flex items-center gap-2 font-semibold text-xl rounded-full bg-footerblue text-white p-1 px-2 pr-3">
                    <FaArrowLeft size={20} /> Back
                </button>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='px-4 font-bold text-lg lg:text-xl xl:text-2xl 2xl:text-3xl' onClick={() => console.log(programMain)}>Schedule of Day 1 (28 NOVEMBER 2024)</div>
                <div className='flex flex-col gap-12'>
                    <CommonScheduleTable title="Main Programme - 28 NOVEMBER 2024" data={programMain} />
                    <CommonScheduleTable title="PARALLEL PROGRAM 1 (28 NOVEMBER 2024) - PRESENTATIONS AND WORKSHOPS IN ZORAWAR HALL" data={program1Schedules} isParallel />
                    <CommonScheduleTable title="PARALLEL PROGRAM 2 (28 NOVEMBER 2024) - PRESENTATIONS AND WORKSHOPS IN SHAMSHER HALL" data={program2Schedules} isParallel />
                </div>
            </div>
        </div>
    );
};

export default Day1Schedule
