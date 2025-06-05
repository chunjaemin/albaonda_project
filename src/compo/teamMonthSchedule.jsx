// 전체 코드: teamMonthSchedule.jsx
import { useState, useMemo } from 'react';
import {
  generateCalendarDates,
  getCurrentYear,
  getCurrentMonth,
} from '../js/teamScheduleDate.js';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { getUserColor } from '../js/colorUtils';
import '../App.css';

export default function TeamMonthSchedule({ isEditing, scheduleData }) {
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
        return (
          blockDate.getDate() === day &&
          blockDate.getMonth() + 1 === month &&
          blockDate.getFullYear() === year
        );
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
      <div className="w-full aspect-[10/1] flex justify-between items-center pt-3 pb-3">
        <ChevronLeftIcon
          className="w-6 h-6 cursor-pointer"
          onClick={() => {
            if (currentMonth === 1) {
              setCurrentYear((prev) => prev - 1);
              setCurrentMonth(12);
            } else {
              setCurrentMonth((prev) => prev - 1);
            }
          }}
        />
        <div className='text-lg'>
          {currentMonth}월 {currentYear}
        </div>
        <ChevronRightIcon
          className="w-6 h-6 cursor-pointer"
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
      <div className="w-full flex justify-between items-center text-xs">
        {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
          <div
            key={day}
            className={`w-1/7 flex justify-center items-center ${i % 2 === 0 ? 'bg-green-200' : 'bg-green-100'}`}
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
              {dates.slice(index, index + 7).map(({ day, isCurrentMonth, year, month }) => {
                const initials = getUserInitialsForDate(year, month, day);
                const showTooltip = initials.length > 2;

                return (
                  <div
                    key={`${year}-${month}-${day}`}
                    className="relative w-1/7 aspect-[1/1] border-r border-b border-gray-200 px-2 py-2"
                  >
                    <div className={`absolute top-[4%] left-[6%] text-sm ${isCurrentMonth ? 'text-black' : 'text-gray-400'}`}>
                      {day}
                    </div>

                    {/* 사용자 이니셜 동그라미 */}
                    {!isEditing && initials.length > 0 && (
                      <div className="absolute bottom-2 left-2 flex items-center group">
                        {initials.slice(0, 3).map((user, i) => (
                          <div
                            key={i}
                            className={`w-5 h-5 text-xs rounded-full text-white flex items-center justify-center
                              ${isCurrentMonth ? '' : 'opacity-40'}
                            `}
                            style={{
                              backgroundColor: getUserColor(user),
                              marginLeft: i === 0 ? 0 : '-7px', // ➜ 앞 원과 50% 겹치게
                              zIndex: i, // ➜ 오른쪽 원이 위에 보이게
                            }}
                            title={user}
                          >
                            {user[0]}
                          </div>
                        ))}
                        {initials.length > 3 && (
                          <>
                            <div
                              className="w-5 h-5 text-xs rounded-full bg-gray-300 text-white flex items-center justify-center ml-[-7px]"
                              style={{ zIndex: 10 }}
                            >
                              +{initials.length - 3}
                            </div>
                            <div className="absolute top-full left-0 mt-1 p-3 bg-white rounded shadow-lg z-50 hidden group-hover:block">
                              {initials.sort((a, b) => a.localeCompare(b)).map(name => (
                                <div key={name} className="flex items-center gap-1 text-sm text-black whitespace-nowrap">
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getUserColor(name) }}></div>
                                  {name}
                                </div>
                              ))}
                            </div>
                          </>
                        )}
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
