import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import {getWeekDates, getCurrentStartOfWeek} from '../js/scheduleDate.js';

export default function WeekSchedule() {
    const [currentDate, setCurrentDate] = useState(getCurrentStartOfWeek()); // 현재 날짜

    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const dates = getWeekDates(currentDate.year, currentDate.month, currentDate.day);
    const hours = Array.from({ length: 25 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

    // 공통 border 색상 변수
    const borderColor = 'border-gray-400';

    return (
        <div className="p-4 mb-4">
            {/* 날짜 컨트롤 바 */}
            <div className={`w-full aspect-[10/1] flex justify-between items-center border-b ${borderColor} pt-3 pb-3`}>
                <ChevronLeftIcon className='h-[100%] aspect-[1/1]'
                    onClick={() => {

                    }}
                ></ChevronLeftIcon>
                <div>{dates[0].month}월 {dates[0].day}일 - {dates[6].month}월 {dates[6].day}일, {dates[0].year}년</div>
                <ChevronRightIcon className='h-[100%] aspect-[1/1]'
                    onClick={() => {

                    }}
                ></ChevronRightIcon>
            </div>
            {/* 날짜 컨트롤 바 끝*/}

            {/* 상단 요일 + 날짜 헤더 */}
            <div className="grid grid-cols-8 text-center">
                <div className={`border-b py-2 font-bold ${borderColor}`}><br></br>시간</div>
                {days.map((day, i) => (
                    <div key={day} className={`border-b py-2 ${borderColor}`}>
                        <div className="font-bold">{day}</div>
                        <div className="text-sm text-gray-500">{dates[i].day}</div>
                    </div>
                ))}
            </div>

            {/* 시간표 본문 */}
            <div className="grid grid-cols-8">
                {hours.map((hour, rowIndex) => (
                    <>
                        <div key={`time-${rowIndex}`} className={`text-sm flex items-center justify-center border-b border-l border-r ${borderColor}`}>
                            {hour}
                        </div>
                        {days.map((_, colIndex) => (
                            <div
                                key={`cell-${rowIndex}-${colIndex}`}
                                className="relative aspect-[1/1]"
                            >
                                <div className={`w-full h-[50%] border-r border-b ${borderColor}`}></div>
                                <div className={`w-full h-[50%] border-r border-b ${borderColor}`}></div>
                            </div>
                        ))}
                    </>
                ))}
            </div>
        </div>
    );
}