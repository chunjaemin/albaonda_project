import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { getWeekDates } from '../js/scheduleDate.js';
import { getUserColor } from '../js/colorUtils';

export default function teemWeekSchedule({
    isEditing,
    selectedUser,
    scheduleData,
    setScheduleData,
    currentWeekStart,
    setCurrentWeekStart
}) {
    // ✅ 안전 검사 먼저 수행
    const isValidWeekStart = currentWeekStart &&
        typeof currentWeekStart === 'object' &&
        'year' in currentWeekStart &&
        'month' in currentWeekStart &&
        'day' in currentWeekStart;

    const [dates, setDates] = useState([]);
    const [openDetailBlock, setOpenDetailBlock] = useState(null);


    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const hours = Array.from({ length: 48 }, (_, i) => {
        const hour = String(Math.floor(i / 2)).padStart(2, '0');
        const minute = i % 2 === 0 ? '00' : '30';
        return `${hour}:${minute}`;
    });

    useEffect(() => {
        if (isValidWeekStart) {
            const { year, month, day } = currentWeekStart;
            setDates(getWeekDates(year, month, day));
        }
    }, [currentWeekStart]);




    if (!isValidWeekStart) {
        return <div className="p-4">날짜 정보를 불러오는 중입니다...</div>;
    }

    const handlePrevWeek = () => {
        const date = new Date(currentWeekStart.year, currentWeekStart.month - 1, currentWeekStart.day);
        date.setDate(date.getDate() - 7);
        setCurrentWeekStart({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
        });
    };

    const handleNextWeek = () => {
        const date = new Date(currentWeekStart.year, currentWeekStart.month - 1, currentWeekStart.day);
        date.setDate(date.getDate() + 7);
        setCurrentWeekStart({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
        });
    };

    const weekKey = `${currentWeekStart.year}-${String(currentWeekStart.month).padStart(2, '0')}-${String(currentWeekStart.day).padStart(2, '0')}`;

    const handleBlockClick = (row, col) => {
        const key = `${row}-${col}`;
        if (isEditing && selectedUser) {
            setScheduleData(prev => {
                const weekData = { ...prev[weekKey] } || {};
                const userSet = new Set(weekData[selectedUser] || []);
                const newSet = new Set(userSet);
                if (newSet.has(key)) newSet.delete(key);
                else newSet.add(key);
                return {
                    ...prev,
                    [weekKey]: {
                        ...weekData,
                        [selectedUser]: newSet
                    }
                };
            });
        } else {
            setOpenDetailBlock(prev => (prev === key ? null : key));
        }
    };

    const currentWeekUsers = scheduleData[weekKey] || {};

    return (
        <div className="p-4 mb-4">
            <div className="w-full aspect-[10/1] flex justify-between items-center border-b border-gray-400 pt-3 pb-3">
                <ChevronLeftIcon className="h-[100%] aspect-[1/1] cursor-pointer" onClick={handlePrevWeek} />
                <div>
                    {dates[0]?.month}월 {dates[0]?.day}일 - {dates[6]?.month}월 {dates[6]?.day}일, {dates[0]?.year}년
                </div>
                <ChevronRightIcon className="h-[100%] aspect-[1/1] cursor-pointer" onClick={handleNextWeek} />
            </div>

            <div className="grid grid-cols-8 text-center">
                <div className="border-b py-2 font-bold border-gray-400"><br />시간</div>
                {days.map((day, i) => (
                    <div key={day} className="border-b py-2 border-gray-400">
                        <div className="font-bold">{day}</div>
                        <div className="text-sm text-gray-500">{dates[i]?.day}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-8">
                {Array.from({ length: 48 }, (_, rowIndex) => (
                    <React.Fragment key={`row-${rowIndex}`}>
                        <div className="text-xs flex items-center justify-center border-b border-l border-r border-gray-400 h-8">
                            {rowIndex % 2 === 0 ? hours[rowIndex] : ''}
                        </div>
                        {days.map((_, colIndex) => {
                            const blockKey = `${rowIndex}-${colIndex}`;
                            const isEditable = isEditing && selectedUser;
                            const isSelectedUserActive = isEditable && scheduleData[weekKey]?.[selectedUser]?.has(blockKey);
                            const blockUsers = Object.entries(currentWeekUsers)
                                .filter(([_, blocks]) => blocks?.has?.(blockKey))
                                .map(([user]) => user);
                            const visibleUsers = blockUsers.slice(0, 2);
                            const hasMore = blockUsers.length > 2;
                            const isDetailOpen = openDetailBlock === blockKey;

                            return (
                                <div
                                    key={blockKey}
                                    className={`relative h-8 border border-gray-300 transition duration-100 ${isEditable ? 'hover:border-blue-400 hover:cursor-pointer' : ''
                                        }`}
                                    onClick={() => handleBlockClick(rowIndex, colIndex)}
                                    style={{
                                        backgroundColor: isSelectedUserActive
                                            ? getUserColor(selectedUser)
                                            : 'transparent',
                                    }}
                                >
                                    {!isEditing && blockUsers.length > 0 && (
                                        <div className="absolute left-1 top-1 flex gap-[2px] items-center">
                                            {visibleUsers.map(user => (
                                                <div
                                                    key={user}
                                                    className="w-4 h-4 text-[10px] rounded-full text-white flex items-center justify-center"
                                                    style={{ backgroundColor: getUserColor(user) }}
                                                    title={user}
                                                >
                                                    {user[0]}
                                                </div>
                                            ))}
                                            {hasMore && <span className="text-[10px]">...</span>}
                                        </div>
                                    )}

                                    {!isEditing && isDetailOpen && blockUsers.length > 2 && (
                                        <div className="absolute top-full left-0 mt-1 p-4 bg-white border rounded-lg shadow-lg z-50 min-w-[160px]">
                                            {[...blockUsers].sort((a, b) => a.localeCompare(b)).map(user => (
                                                <div key={user} className="flex items-center gap-1 whitespace-nowrap">
                                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getUserColor(user) }}></div>
                                                    {user}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}