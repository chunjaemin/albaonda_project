import { useState, useMemo } from 'react';
import {
  generateCalendarDates,
  getCurrentYear,
  getCurrentMonth,
} from '../js/scheduleDate.js';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { getUserColor } from '../js/colorUtils';
import '../App.css';

export default function teemMonthSchedule({ isEditing, scheduleData }) {
  const [currentYear, setCurrentYear] = useState(getCurrentYear());
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());

  const dates = useMemo(
    () => generateCalendarDates(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  const getWeekKeyForDate = (year, month, day) => {
    const date = new Date(year, month - 1, day);
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    return `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-${String(start.getDate()).padStart(2, '0')}`;
  };

  const getUserInitialsForDate = (year, month, day) => {
    const initials = [];
    const weekKey = getWeekKeyForDate(year, month, day);
    const weekData = scheduleData[weekKey];

    if (!weekData) return [];

    for (const user in weekData) {
      const blockSet = weekData[user];
      if (!(blockSet instanceof Set)) continue;

      const hasSchedule = Array.from(blockSet).some(block => {
        const [row, col] = block.split('-').map(Number);
        const blockDate = new Date(weekKey);
        blockDate.setDate(blockDate.getDate() + col);
        return blockDate.getDate() === day && blockDate.getMonth() + 1 === month;
      });

      if (hasSchedule) {
        initials.push(user);
      }
    }

    return initials;
  };

  return (
    <div className="relative w-full pl-4 pr-4">
      {/* 날짜 컨트롤 바 */}
      <div className="w-full aspect-[10/1] flex justify-between items-center border-b border-gray-300 pt-3 pb-3">
        <ChevronLeftIcon
          className="h-[100%] aspect-[1/1] cursor-pointer"
          onClick={() => {
            if (currentMonth === 1) {
              setCurrentYear((prev) => prev - 1);
              setCurrentMonth(12);
            } else {
              setCurrentMonth((prev) => prev - 1);
            }
          }}
        />
        <div>
          {currentMonth}월 {currentYear}
        </div>
        <ChevronRightIcon
          className="h-[100%] aspect-[1/1] cursor-pointer"
          onClick={() => {
            if (currentMonth === 12) {
              setCurrentYear((prev) => prev + 1);
              setCurrentMonth(1);
            } else {
              setCurrentMonth((prev) => prev + 1);
            }
          }}
        />
      </div>

      {/* 요일 표시 */}
      <div className="w-full flex justify-between items-center">
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div
            key={day}
            className="w-1/7 flex justify-center items-center mt-2 mb-2 font-semibold"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 셀 */}
      {dates.map((date, index) => {
        if (index % 7 === 0) {
          return (
            <div key={index} className="flex">
              {dates.slice(index, index + 7).map(({ day, isCurrentMonth }) => {
                const initials = getUserInitialsForDate(currentYear, currentMonth, day);

                return (
                  <div
                    key={`${currentYear}-${currentMonth}-${day}`}
                    className="relative w-1/7 aspect-[1/1] border-r border-b border-gray-200 px-2 py-2"
                  >
                    <div className={`absolute top-[4%] left-[6%] text-sm ${isCurrentMonth ? 'text-black' : 'text-gray-400'}`}>
                      {day}
                    </div>

                    {/* 사용자 이니셜 동그라미 */}
                    {!isEditing && initials.length > 0 && (
                      <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                        {initials.map((user, i) => (
                          <div
                            key={i}
                            className="w-5 h-5 text-xs rounded-full text-white flex items-center justify-center"
                            style={{ backgroundColor: getUserColor(user) }}
                            title={user}
                          >
                            {user[0]}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}