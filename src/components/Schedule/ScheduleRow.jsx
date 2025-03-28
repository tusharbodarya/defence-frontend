import React from 'react';

const ScheduleRow = ({ time, activity, location, speaker, attend, className, isParallel, index, columnWidths }) => {
    const rowBackgroundColor = index % 2 === 0 ? 'bg-primeinputbg' : 'bg-schedulerowbg';

    return (
        <div className={`py-2 px-4 ${className} ${rowBackgroundColor} flex`}>
            {/* Time column */}
            <div className={`text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl p-1 font-medium ${columnWidths.time}`}>
                {time}
            </div>
            {/* Activity column */}
            <div className={`text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl p-1 ${columnWidths.activity}`}>
                {activity}
            </div>
            {/* Additional columns for parallel program */}
            {isParallel ? (
                <>
                    <div className={`text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl p-1 ${columnWidths.speaker}`}>
                        {speaker}
                    </div>
                    <div className={`text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl p-1 ${columnWidths.location}`}>
                        {location}
                    </div>
                    <div className={`text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl p-1 ${columnWidths.attend}`}>
                        {attend}
                    </div>
                </>
            ) : (
                <div className={`text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl p-1 ${columnWidths.location}`}>
                    {location}
                </div>
            )}
        </div>
    );
};

export default ScheduleRow;
