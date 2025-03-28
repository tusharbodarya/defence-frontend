import React from 'react';
import ScheduleRow from './ScheduleRow';

const CommonScheduleTable = ({ title, data = [], isParallel = false }) => {
    // Define consistent widths for columns
    const columnWidths = isParallel
        ? {
            time: 'w-[10%]',
            activity: 'w-[39%]',
            speaker: 'w-[17%]',
            location: 'w-[17%]',
            attend: 'w-[17%]'
        }
        : {
            time: 'w-[10%]',
            activity: 'w-[65%]',
            location: 'w-[25%]'
        };

    // Determine headers based on `isParallel`
    const headers = isParallel
        ? ['time', 'activity', 'speaker', 'location', 'attend']
        : ['time', 'activity', 'location'];

    return (
        <div className="bg-white shadow-md rounded-lg space-y-3">
            <div className="text-red bg-bgred text-center font-semibold text-lg p-2">{title}</div>
            <div className="divide-y divide-gray-200">
                {/* Render headers */}
                <div className="py-2 px-4 bg-footerblue text-sm text-white flex gap-3 font-bold">
                    {headers.map((header) => (
                        <div key={header} className={`uppercase text-center ${columnWidths[header]}`}>
                            {header.replace('_', '/')}
                        </div>
                    ))}
                </div>
                {/* Render rows */}
                {data.map((item, index) => (
                    <ScheduleRow
                        key={index}
                        index={index}
                        {...item}
                        className="flex gap-3"
                        isParallel={isParallel}
                        columnWidths={columnWidths} // Pass columnWidths to ScheduleRow
                    />
                ))}
            </div>
        </div>
    );
};

export default CommonScheduleTable;
