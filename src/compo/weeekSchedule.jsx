import { useState, useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { getWeekDates, getCurrentStartOfWeek } from '../js/scheduleDate.js';
import dummySchedule from '../js/dummyData1.js';

export default function WeekSchedule({ isModify }) {
  const [currentDate, setCurrentDate] = useState(getCurrentStartOfWeek());
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const dates = getWeekDates(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());

  const colorPalette = [
    'bg-rose-100', 'bg-amber-100', 'bg-lime-100', 'bg-sky-100',
    'bg-pink-100', 'bg-purple-100', 'bg-indigo-100', 'bg-emerald-100',
    'bg-orange-100', 'bg-cyan-100', 'bg-violet-100'
  ];

  const nameColorMap = useMemo(() => {
    const countMap = {};
    dummySchedule.entries.forEach((entry) => {
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
  }, []);

  function parseTime(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours + minutes / 60;
  }

  const borderColor = 'border-gray-400';

  const hours = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    return `${String(hour).padStart(2, '0')}:${minute}`;
  });

  const findEntryForCell = (dateObj, hour) => {
    const dateStr = `${dateObj.year}-${String(dateObj.month).padStart(2, '0')}-${String(dateObj.day).padStart(2, '0')}`;
    return dummySchedule.entries.find((entry) => {
      if (entry.date !== dateStr) return false;
      const [entryStartHour, entryStartMin] = entry.startTime.split(':').map(Number);
      const [entryEndHour, entryEndMin] = entry.endTime.split(':').map(Number);
      const [cellHour, cellMin] = hour.split(':').map(Number);
      const cellTotal = cellHour * 60 + cellMin;
      const startTotal = entryStartHour * 60 + entryStartMin;
      const endTotal = entryEndHour * 60 + entryEndMin;
      return cellTotal >= startTotal && cellTotal < endTotal;
    });
  };

  return (
    <div className="p-4 mb-4">
      <div className={`w-full aspect-[10/1] flex justify-between items-center border-b ${borderColor} pt-3 pb-3`}>
        <ChevronLeftIcon
          className='h-[100%] aspect-[1/1] cursor-pointer'
          onClick={() => {
            setCurrentDate((prev) => {
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
            setCurrentDate((prev) => {
              const newDate = new Date(prev);
              newDate.setDate(newDate.getDate() + 7);
              return newDate;
            });
          }}
        />
      </div>

      <div className="grid grid-cols-8 text-center">
        <div className={`border-b py-2 font-bold ${borderColor}`}><br />시간</div>
        {days.map((day, i) => (
          <div key={day} className={`border-b py-2 ${borderColor}`}>
            <div className="font-bold">{day}</div>
            <div className="text-sm text-gray-500">{dates[i].day}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-8">
        {(() => {
          const prevEntries = {};
          return hours.map((hour, rowIndex) => (
            <div key={`row-${rowIndex}`} className="contents">
              <div className={`text-[11px] flex items-center justify-center border-b border-l border-r ${borderColor}`}>
                {rowIndex % 2 === 0 ? `${parseInt(hour.split(':')[0])}:00` : ''}
              </div>
              {dates.map((dateObj, colIndex) => {
                const dateStr = `${dateObj.year}-${String(dateObj.month).padStart(2, '0')}-${String(dateObj.day).padStart(2, '0')}`;
                const entry = findEntryForCell(dateObj, hour);

                const prevKey = `${dateStr}-${entry?.name}`;
                const alreadyShown = prevEntries[prevKey]?.lastHour !== undefined;
                const showText = entry && !alreadyShown;
                const isMerged = entry && alreadyShown;

                if (entry) {
                  prevEntries[prevKey] = { lastHour: hour };
                }

                const bgColor = entry ? nameColorMap[entry.name] || 'bg-orange-300' : '';

                return (
                  <div
                    key={`cell-${rowIndex}-${colIndex}`}
                    className={`
                      relative aspect-[2/1] flex items-center justify-center text-[11px]
                      border-b ${borderColor} border-r ${borderColor}
                      ${entry ? `${bgColor} font-semibold text-gray-700 border-b-0 border-t-0` : ''}
                    `}
                  >
                    {showText ? entry.name : null}
                  </div>
                );
              })}
            </div>
          ));
        })()}
      </div>
    </div>
  );
}
