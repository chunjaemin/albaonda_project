import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import {
  generateCalendarDates,
  getCurrentYear,
  getCurrentMonth
} from '../js/scheduleDate.js';
import {dummyTeamSchedule1, dummyTeamSchedule2} from '../js/dummyTeamData.js';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useCurrentTeamIdStore } from '../js/store.js'
import '../App.css';

export default function TeamMonthSchedule() {
  const [currentYear, setCurrentYear] = useState(getCurrentYear());
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const { teamId } = useCurrentTeamIdStore();

  let teamSchedule;
  if (teamId === 'team001') {
    teamSchedule = dummyTeamSchedule1;
  } else if (teamId === 'team002') {
    teamSchedule = dummyTeamSchedule2;
  }

  const colorPalette = [
    'bg-rose-100',
    'bg-amber-100',
    'bg-lime-100',
    'bg-sky-100',
    'bg-pink-100',
    'bg-purple-100',
    'bg-indigo-100',
    'bg-emerald-100',
    'bg-orange-100',
    'bg-cyan-100',
    'bg-violet-100',
  ];

  const nameColorMap = useMemo(() => {
    const countMap = {};

    teamSchedule.entries.forEach((entry) => {
      const name = entry.name;
      const start = parseTime(entry.startTime);
      const end = parseTime(entry.endTime);
      const duration = end - start;
      countMap[name] = (countMap[name] || 0) + duration;
    });

    const sortedNames = Object.entries(countMap)
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => name);

    const map = {};
    sortedNames.forEach((name, index) => {
      map[name] = colorPalette[index % colorPalette.length];
    });

    return map;
  }, [teamSchedule.entries]);

  function parseTime(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours + minutes / 60;
  }

  const dates = useMemo(() => {
    const rawDates = generateCalendarDates(currentYear, currentMonth);
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();

    return rawDates.map((item, index) => {
      let dateYear = currentYear;
      let dateMonth = currentMonth;

      if (!item.isCurrentMonth) {
        if (index < firstDayOfMonth) {
          dateMonth = currentMonth === 1 ? 12 : currentMonth - 1;
          dateYear = currentMonth === 1 ? currentYear - 1 : currentYear;
        } else {
          dateMonth = currentMonth === 12 ? 1 : currentMonth + 1;
          dateYear = currentMonth === 12 ? currentYear + 1 : currentYear;
        }
      }

      const fullDate = `${dateYear}-${String(dateMonth).padStart(2, '0')}-${String(item.day).padStart(2, '0')}`;

      return {
        ...item,
        fullDate,
      };
    });
  }, [currentYear, currentMonth]);

  const getWorkByDate = (dateString) => {
    return teamSchedule.entries.filter((entry) => entry.date === dateString);
  };

  return (
    <div className='relative w-full pl-4 pr-4'>
      <div className='w-full aspect-[10/1] flex justify-between items-center border-b border-gray-300 pt-3 pb-3'>
        <ChevronLeftIcon className='h-6 w-6 cursor-pointer'
          onClick={() => {
            if (currentMonth === 1) {
              setCurrentYear((prev) => prev - 1);
              setCurrentMonth(12);
            } else {
              setCurrentMonth((prev) => prev - 1);
            }
          }}
        />
        <div>{currentYear}년 {currentMonth}월</div>
        <ChevronRightIcon className='h-6 w-6 cursor-pointer'
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

      <div className="w-full flex justify-between items-center text-sm font-medium mt-2 mb-2">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="w-1/7 text-center">
            {day}
          </div>
        ))}
      </div>

      {dates.map((_, index) => {
        if (index % 7 === 0) {
          return (
            <div key={index} className="flex">
              {dates.slice(index, index + 7).map(({ day, isCurrentMonth, fullDate }) => {
                const works = getWorkByDate(fullDate);
                const maxVisible = 2;
                const hiddenCount = works.length > maxVisible ? works.length - maxVisible : 0;

                return (
                  <div
                    key={fullDate}
                    className="relative w-1/7 aspect-[1/1] border border-gray-200 p-1 text-xs overflow-hidden"
                  >
                    <div className={`${isCurrentMonth ? 'text-black' : 'text-gray-400'}`}>{day}</div>
                    <div className="flex flex-col gap-[2px] max-h-[90%] overflow-hidden">
                      {works.slice(0, maxVisible).map(({ name }, idx) => (
                        <div
                          key={idx}
                          className={`rounded-full ${nameColorMap[name] || 'bg-gray-200'} text-gray-800 text-[0.6rem] text-center truncate px-1 py-[2px]`}
                        >
                          {name}
                        </div>
                      ))}
                      {hiddenCount > 0 && (
                        <div className="text-[0.6rem] text-gray-500 text-center mt-[1px]">+ {hiddenCount} more</div>
                      )}
                    </div>
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
