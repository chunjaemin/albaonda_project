import { useState, useMemo } from 'react'
import { generateCalendarDates, getCurrentYear, getCurrentMonth } from '../js/scheduleDate.js'
import '../App.css';

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function MonthSchedule() {

    const [currentYear, setCurrentYear] = useState(getCurrentYear());
    const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());

    const dates = useMemo(
        () => generateCalendarDates(currentYear, currentMonth),
        [currentYear, currentMonth]
    );

    return (
        <div className='relative w-full pl-4 pr-4'> 

            {/* 날짜 컨트롤 바 */}
            <div className='w-full aspect-[10/1] flex justify-between items-center border-b border-gray-300 pt-3 pb-3'>
                <ChevronLeftIcon className='h-[100%] aspect-[1/1]'
                    onClick={() => {
                        if (currentMonth === 1) {
                            setCurrentYear((prev) => prev - 1);
                            setCurrentMonth(12);
                        } else {
                            setCurrentMonth((prev) => prev - 1);
                        }
                    }}
                ></ChevronLeftIcon>
                <div>{currentMonth}월 {currentYear}</div>
                <ChevronRightIcon className='h-[100%] aspect-[1/1]'
                    onClick={() => {
                        if (currentMonth === 12) {
                            setCurrentYear((prev) => prev + 1);
                            setCurrentMonth(1);
                        } else {
                            setCurrentMonth((prev) => prev + 1);
                        }
                    }}
                ></ChevronRightIcon>
            </div>
            {/* 날짜 컨트롤 바 끝*/}

            {/* 시간표 요일칸 */}
            <div className="w-full flex justify-between items-center">
                {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
                    <div
                        key={day}
                        className={`w-1/7 flex justify-center items-center mt-2 mb-2`}
                    >
                        {day}
                    </div>
                ))}
            </div>
            {/* 시간표 요일칸 끝*/}

            {/* 날짜 셀 */}
            {
                dates.map((date, index) => {
                    if (index % 7 === 0) {
                        return (
                            <div key={index} className="flex">
                                {dates.slice(index, index + 7).map(({ day, isCurrentMonth }) => (
                                    <div key={day} className="relative w-1/7 aspect-[1/1] border-r border-b border-gray-200 pl-4 pr-4">
                                        <div className={`absolute top-[2%] left-[4%] ${isCurrentMonth ? 'text-black' : 'text-gray-400'}`}>
                                            {day}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    }
                    return null;
                })
            }
            {/* 날짜 셀 끝 */}
        </div>
    );
}