import { useState, useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { getWeekDates, getCurrentStartOfWeek } from '../js/scheduleDate.js';
import { dummyTeamSchedule1 } from '../js/dummyTeamData.js';

export default function TeamWeekSchedule() {
    const [currentDate, setCurrentDate] = useState(getCurrentStartOfWeek());
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const dates = getWeekDates(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());

    const colorPalette = [
        'bg-rose-300', 'bg-amber-300', 'bg-lime-300', 'bg-sky-300',
        'bg-pink-300', 'bg-purple-300', 'bg-indigo-300', 'bg-emerald-300',
        'bg-orange-300', 'bg-cyan-300', 'bg-violet-300'
    ];

    const nameColorMap = useMemo(() => {
        const names = [...new Set(dummyTeamSchedule1.entries.map(e => e.name))].sort();
        const map = {};
        names.forEach((name, index) => {
            map[name] = colorPalette[index % colorPalette.length];
        });
        return map;
    }, []);

    const getInitial = (name) => name[0];

    const borderColor = 'border-gray-400';

    const hours = Array.from({ length: 48 }, (_, i) => {
        const hour = Math.floor(i / 2);
        const minute = i % 2 === 0 ? '00' : '30';
        return `${String(hour).padStart(2, '0')}:${minute}`;
    });

    const parseTime = (timeStr) => {
        const [hours, minutes] = timeStr.split(":").map(Number);
        return hours * 60 + minutes;
    };

    const findEntriesForCell = (dateObj, hour) => {
        const dateStr = `${dateObj.year}-${String(dateObj.month).padStart(2, '0')}-${String(dateObj.day).padStart(2, '0')}`;
        const cellMinutes = parseTime(hour);
        return dummyTeamSchedule1.entries
            .filter(entry => {
                if (entry.date !== dateStr) return false;
                const start = parseTime(entry.startTime);
                const end = parseTime(entry.endTime);
                return cellMinutes >= start && cellMinutes < end;
            })
            .sort((a, b) => a.name.localeCompare(b.name));
    };

    return (
        <div className="p-4 mb-4">
            {/* 상단 날짜 표시 및 이동 */}
            <div className={`w-full aspect-[10/1] flex justify-between items-center border-b ${borderColor} pt-3 pb-3`}>
                <ChevronLeftIcon
                    className='h-[100%] aspect-[1/1] cursor-pointer'
                    onClick={() => {
                        setCurrentDate(prev => {
                            const newDate = new Date(prev);
                            newDate.setDate(newDate.getDate() - 7);
                            return newDate;
                        });
                    }}
                />
                <div>{dates[0].month}월 {dates[0].day}일 - {dates[6].month}월 {dates[6].day}일, {dates[0].year}년</div>
                <ChevronRightIcon
                    className='h-[100%] aspect-[1/1] cursor-pointer'
                    onClick={() => {
                        setCurrentDate(prev => {
                            const newDate = new Date(prev);
                            newDate.setDate(newDate.getDate() + 7);
                            return newDate;
                        });
                    }}
                />
            </div>

            {/* 요일 헤더 */}
            <div className="grid grid-cols-8 text-center">
                <div className={`border-b py-2 font-bold ${borderColor}`}><br />시간</div>
                {days.map((day, i) => (
                    <div key={day} className={`border-b py-2 ${borderColor}`}>
                        <div className="font-bold">{day}</div>
                        <div className="text-sm text-gray-500">{dates[i].day}</div>
                    </div>
                ))}
            </div>

            {/* 시간표 셀 */}
            <div className="grid grid-cols-8">
                {hours.map((hour, rowIndex) => (
                    <div key={`row-${rowIndex}`} className="contents">
                        {/* 시간 컬럼 */}
                        <div className={`text-[11px] flex items-center justify-center border-b border-l border-r ${borderColor}`}>
                            {rowIndex % 2 === 0 ? `${parseInt(hour.split(':')[0])}:00` : ''}
                        </div>

                        {/* 요일별 셀 */}
                        {dates.map((dateObj, colIndex) => {
                            const entries = findEntriesForCell(dateObj, hour);
                            return (
                                <div
                                    key={`cell-${rowIndex}-${colIndex}`}
                                    className={`relative aspect-[2/1] border-b ${borderColor} border-r ${borderColor} flex items-center px-1 overflow-x-hidden`}
                                >
                                    {entries.map((entry, i) => {
                                        return <div
                                            key={entry.id}
                                            title={entry.name}
                                            className={`
                                                flex items-center justify-center
                                                ${nameColorMap[entry.name] || 'bg-gray-300'}
                                                text-[10px] text-white font-bold
                                                rounded-full
                                                h-[80%] aspect-square
                                                mr-1
                                            `}
                                            style={{ transform: `translateX(-${i * 50}%)` }}
                                        >
                                            {getInitial(entry.name)}
                                        </div>
                                    })}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
